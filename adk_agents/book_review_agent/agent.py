"""
This is the main entry point for the Book Review Assistant application.
It defines the root agent and its sub-agents to form a multi-agent system.
"""
from google.adk.agents import LlmAgent, LoopAgent
from .tools import exit_loop

def _create_refinement_loop() -> LoopAgent:
    """
    Helper function to build a smarter refinement loop.
    The loop now continues until the critic agent decides the draft is good
    enough and transfers control back to the root agent.
    """

    writer_agent_in_loop = LlmAgent(
        name="writer_agent",
        model="gemini-2.0-flash",
        description="Writes or revises the book review draft based on a plan or feedback.",
        instruction="""
        You are a text-processing engine. Your SOLE function is to generate or refine a book review draft.

        - **Input:** You will receive `research_findings` for the initial draft or `critic_feedback` and `current_draft` for revisions.
        - **Processing:** Use the inputs to write or rewrite the text.
        - **Output:** Your output MUST BE ONLY the full text of the review draft.
        - **Constraint:** DO NOT include any conversational phrases, greetings, or explanations. For example, never start with "Okay, here is the draft...".
        """,
        output_key="current_draft"
    )

    critic_agent_in_loop = LlmAgent(
        name="critic_agent",
        model="gemini-2.0-flash",
        description="Reviews the draft, provides feedback, or approves it by exiting the refinement loop.",
        instruction="""
        You are an automated review-analysis engine. Your function is to evaluate `current_draft`.

        You have two possible actions:
        1.  **If the draft needs improvement:** Your output MUST BE ONLY a concise, bulleted list of actionable feedback. This feedback will be saved.
        2.  **If the draft is high-quality and ready:** You MUST first provide a concise, positive confirmation message (e.g., "The draft is now polished and ready."). Then, on a new line, you MUST call the `approve_and_exit_loop()` tool. Your positive message will be automatically saved as the final feedback.
        """,
        output_key="critic_feedback",
        tools=[exit_loop]
    )

    return LoopAgent(
        name="refinement_loop",
        description="Automatically runs a write-and-review cycle until the critic agent approves the draft.",
        sub_agents=[
            writer_agent_in_loop,
            critic_agent_in_loop,
        ],
        max_iterations=5 # A failsafe to prevent infinite loops
    )

# --- High-Level Agent Definitions ---

research_agent = LlmAgent(
    name="research_agent",
    model="gemini-2.0-flash",
    description="Plans the review structure, gathers information, and then hands off to the writing loop.",
    instruction="""
    You are a meticulous research strategist. Given a `book_title` and `main_topic`.

    **Your process is in two steps:**
    1.  **Plan & Structure:** First, create a clear plan for the book review. This should be a bulleted outline (e.g., Introduction, Key Point 1 with evidence, Key Point 2, Conclusion).
    2.  **Gather & Summarize:** Fill in the outline with concise, relevant information on the topic.

    **CRITICAL FINAL STEP:** After presenting your structured research, you MUST immediately and automatically delegate to the `refinement_loop` agent to start the drafting process. Do not wait for user confirmation. Your final output must be the function call to transfer.
    """,
    output_key="research_findings"
)

publish_agent = LlmAgent(
    name="publish_agent",
    model="gemini-2.0-flash",
    description="Applies final formatting to the approved draft for publication.",
    instruction="""
    You are a publisher. Take the final `current_draft` and format it for publication.
    Add a compelling title and ensure the text is clean, well-structured, and ready to be published.
    Your output should ONLY be the final, formatted review.
    """,
    output_key="final_review"
)

# --- Root Agent (User Interface & Coordinator) ---

root_agent = LlmAgent(
    name="creative_assistant_agent",
    model="gemini-2.0-flash",
    description="An assistant for writing and managing book review drafts collaboratively.",
    global_instruction="""
    You are an AI assistant specializing in creative tasks for book reviews.
    Focus on writing, brainstorming, researching, and refining content related to books.
    Politely decline any requests that are outside of this scope, such as performing calculations or answering general knowledge questions not related to the creative task.
    """,
    instruction="""
    You are the main coordinator of a team of AI agents. Your goal is to provide a seamless user experience by strictly delegating tasks.

    **Interaction Workflow:**
    1.  Start by greeting the user and asking for the book title.
    2.  If the user only provides a title, be proactive. Suggest a few potential review angles (e.g., "core concepts," "practical strategies," "a critical look").
    3.  Once the user confirms both a `book_title` and `main_topic`, your ONLY job is to kick off the entire automated process by delegating to `research_agent`. Announce that you are starting the process.

    **Human Interaction and Delegation Rules:**
    4.  AFTER the `refinement_loop` completes and returns control to you, present the final draft to the user.
    5.  Proactively suggest the next actions: refining it further or publishing it. For example: "Here is the refined draft. We can improve it based on your feedback, or if you're happy with it, we can **publish** it."
    6.  **CRITICAL RULE:** If the user provides any feedback for changes, you MUST immediately delegate back to the `refinement_loop`. Do NOT edit the draft yourself.
    7.  If the user approves or says "publish", delegate to the `publish_agent`.
    """,
    tools=[],
    sub_agents=[research_agent, _create_refinement_loop(), publish_agent]
)

