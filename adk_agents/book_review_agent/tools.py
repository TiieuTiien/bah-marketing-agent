import uuid
from google.adk.tools import ToolContext
from google.genai import types


async def create_book_review_draft(
    book_title: str, topic: str, tool_context: ToolContext
) -> dict:
    """
    Creates a draft for a book review and saves it as an artifact.
    Args:
        book_title (str): The title of the book to review.
        topic (str): The main topic or angle for the marketing review.
        tool_context (ToolContext): Injected by ADK to access artifacts and state.
    Returns:
        A dictionary confirming the draft was saved, including the artifact filename.
    """
    print(f"Tool: Creating draft for '{book_title}' on topic '{topic}'.")

    draft_content = (
        f"**Review Draft for: {book_title}**\n\n"
        f"This is a fantastic book that explores {topic}. "
        "It captivates the reader from the first page..."
    )

    safe_title = "".join(c if c.isalnum() else "_" for c in book_title).lower()
    filename = f"draft_{safe_title}_{uuid.uuid4().hex[:6]}.txt"

    artifact_part = types.Part.from_text(text=draft_content)

    try:
        version = await tool_context.save_artifact(
            filename=filename, artifact=artifact_part
        )
        print(f"Tool: Saved artifact '{filename}' as version {version}.")
        return {
            "status": "success",
            "message": f"Draft saved as '{filename}'.",
            "filename": filename,
        }
    except Exception as e:
        print(f"Tool: Error saving artifact: {e}")
        return {"status": "error", "message": "Could not save the draft."}


async def load_draft(filename: str, tool_context: ToolContext) -> dict:
    """
    Loads the content of a previously saved draft artifact.
    Args:
        filename (str): The exact filename of the draft to load.
        tool_context (ToolContext): Injected by ADK to access artifacts.
    Returns:
        A dictionary containing the status and the content of the draft.
    """
    print(f"Tool: Loading artifact '{filename}'.")

    try:

        artifact_part = await tool_context.load_artifact(filename=filename)

        if artifact_part and artifact_part.inline_data:
            print("Tool: Artifact loaded successfully.")
            raw_bytes = artifact_part.inline_data.data
            decoded_text = raw_bytes.decode("utf-8")

            return {"status": "success", "content": decoded_text}
        else:
            print("Tool: Artifact not found or has no text/inline_data content.")
            return {
                "status": "error",
                "message": f"Draft '{filename}' not found or is empty.",
            }

    except Exception as e:

        print(f"Tool: Error loading artifact: {e}")
        return {"status": "error", "message": f"Could not load the draft '{filename}'."}
