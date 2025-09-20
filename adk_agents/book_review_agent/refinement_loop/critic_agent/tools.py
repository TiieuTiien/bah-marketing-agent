from google.adk.tools import ToolContext

def exit_loop(tool_context: ToolContext):
    """
    Sử dụng tool này để LƯU BẢN NHÁP CUỐI CÙNG ra file/DB.
    - Gọi tool NGAY SAU KHI bản nháp `current_draft` được xác nhận là hoàn tất.
    - Input: full text của `current_draft`.
    - Output: xác nhận bản nháp đã được lưu thành công.
    """
    print(f"  [Tool Call] exit_loop triggered by {tool_context.agent_name}")
    tool_context.actions.escalate = True
    # Return empty dict as tools should typically return JSON-serializable output
    return {}