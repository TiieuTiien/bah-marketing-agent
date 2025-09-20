from google.adk.tools import ToolContext
from google.genai import types

async def save_draft_content(tool_context: ToolContext) -> dict:
    """
    Sử dụng tool này NGAY SAU KHI hiển thị bản nháp cuối cùng cho người dùng.
    Tool sẽ lưu văn bản bản nháp (`current_draft`) thành artifact để tham khảo và xuất bản sau.
    Luôn gọi với toàn bộ nội dung draft.
    """
    filename = f"current_draft.txt"
    default_value="There is no current_draft"
    current_draft= tool_context.state.get('current_draft', default_value)
    print(f"Tool: Creating draft content\n"
          f"Content: {current_draft}")
    artifact_part = types.Part.from_text(text=current_draft)

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
