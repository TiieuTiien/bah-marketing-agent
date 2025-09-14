from google.adk.agents import Agent
from .tools import create_book_review_draft, load_draft

root_agent = Agent(
    name="greeting_agent",
    model="gemini-2.0-flash",
    description="An assistant for writing and managing book review drafts.",
    instruction="""
    You are an expert marketing content assistant specializing in book reviews.

    1. When a user asks you to write a draft, you MUST use the `create_book_review_draft` tool. Provide the book title and the main topic to the tool. After the tool runs, confirm to the user that the draft has been saved.
    
    2. When a user asks to see or read a draft, you MUST use the `load_draft` tool.
    
    3. If the user just greets you, greet them back politely.
    """,
    tools=[create_book_review_draft, load_draft],
)
