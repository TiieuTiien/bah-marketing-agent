"""
This is the main entry point for the Book Review Assistant application.
It defines the root agent and its sub-agents to form a multi-agent system.
"""
from google.adk.agents import LlmAgent, LoopAgent, SequentialAgent

# --- Agent Definitions for the Automated Writing Pipeline ---

research_agent = LlmAgent(
    name="research_agent",
    model="gemini-2.0-flash",
    description="Plans the review structure and gathers initial information.",
    instruction="""
    You are a meticulous research strategist. Given a `book_title` and `main_topic`.

    **Your process is in two steps:**
    1.  **Plan & Structure:** First, create a clear plan for the book review. This should be a bulleted outline.
    2.  **Gather & Summarize:** Fill in the outline with concise, relevant information.
    Your output becomes the `research_findings` for the next step.
    """,
    output_key="research_findings"
)

writer_agent = LlmAgent(
    name="writer_agent",
    model="gemini-2.0-flash",
    description="Writes or revises the book review draft.",
    instruction="""
    You are a text-processing engine. Your SOLE function is to generate or refine a book review draft.
    - **Input:** Use `research_findings` for the initial draft, or `critic_feedback` and `current_draft` for revisions.
    - **Output:** Your output MUST BE ONLY the full text of the review draft.
    - **Constraint:** DO NOT include any conversational phrases.
    """,
    output_key="current_draft"
)

critic_agent = LlmAgent(
    name="critic_agent",
    model="gemini-2.0-flash",
    description="Reviews the draft and provides constructive feedback.",
    instruction="""
    You are an automated review-analysis engine.
    - **Input:** Evaluate the `current_draft`.
    - **Output:** Your output MUST BE ONLY a concise, bulleted list of actionable feedback.
    """,
    output_key="critic_feedback"
)

refinement_loop = LoopAgent(
    name="refinement_loop",
    description="Automatically runs a write-and-review cycle.",
    sub_agents=[
        writer_agent,
        critic_agent,
    ],
    max_iterations=3 # The loop runs a fixed number of times for consistent quality.
)

confirmation_agent = LlmAgent(
    name="confirmation_agent",
    model="gemini-2.0-flash",
    description="Presents the final draft to the user for approval.",
    instruction="""
    You are the final step in an automated pipeline.
    Your job is to present the final `current_draft` to the user.

    **Your process:**
    1.  Announce that the automated writing process is complete.
    2.  Present the full text of the `{current_draft}`.
    3.  Proactively ask the user for the next step. For example: "What do you think of this draft? We can refine it further, or if you're happy with it, we can **publish** it."
    """
)

# --- Main Pipeline Agent ---

# This SequentialAgent now manages the entire automated workflow.
main_pipeline = SequentialAgent(
    name="writing_pipeline",
    description="An automated pipeline that researches, writes, refines, and then confirms a draft with the user. This is the main engine for creating a new review from scratch.",
    sub_agents=[
        research_agent,
        refinement_loop,
        confirmation_agent
    ]
)

publish_agent = LlmAgent(
    name="publish_agent",
    model="gemini-2.0-flash",
    description="Applies final formatting to the approved draft for publication.",
    instruction="""
    You are a publisher. Take the final `current_draft` that the user has approved and format it for publication.
    Add a compelling title and ensure the text is clean, well-structured, and ready to be published.
    Your output should ONLY be the final, formatted review.
    """,
    output_key="final_review"
)


# --- Root Agent (Simplified Coordinator) ---

root_agent = LlmAgent(
    name="creative_assistant_agent",
    model="gemini-2.0-flash",
    description="An assistant for writing and managing book review drafts collaboratively.",
    global_instruction="""
    You are an AI assistant specializing in creative tasks for book reviews.
    Focus on writing, brainstorming, researching, and refining content related to books.
    Politely decline any requests that are outside of this scope.
    """,
    instruction="""
    You are the main coordinator for a book review creation service. Your team consists of two main capabilities: a `writing_pipeline` and a `publish_agent`.

    **Your Primary Role:**
    1.  Start by greeting the user and finding out the book title and the main topic for their review.
    2.  If the user only provides a title, proactively suggest potential review angles to help them decide.
    3.  Once the user confirms the details, your main job is to **delegate the entire task to the `writing_pipeline` agent**. This pipeline will handle everything from research to presenting a draft back to the user.
    
    **Handling User Decisions:**
    4.  The `writing_pipeline` will present a final draft and ask for the user's decision. The user's next message to you will be their decision.
    5.  If the user approves the draft or says "publish", your job is to **delegate to the `publish_agent`**.
    6.  If the user provides feedback and wants changes, delegate back to the `writing_pipeline` to start the process over with the new feedback.
    """,
    sub_agents=[main_pipeline, publish_agent]
)