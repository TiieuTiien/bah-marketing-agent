"""
This is the main entry point for the Book Review Assistant application.
It defines the root agent and its sub-agents to form a multi-agent system.
"""
from google.adk.agents import LlmAgent
from .tools import exit_loop


critic_agent = LlmAgent(
    name="critic_agent",
    model="gemini-2.0-flash",
    description="Đánh giá bản nháp và đưa ra phản hồi mang tính xây dựng.",
    instruction="""
    Bạn là một công cụ phân tích đánh giá tự động.
    - **Đầu vào:** Đánh giá `current_draft`.
    - **Đầu ra:** Kết quả của bạn PHẢI CHỈ LÀ một danh sách gạch đầu dòng ngắn gọn với phản hồi mang tính hành động. Gọi công cụ exit_loop khi không còn phản hồi nào thêm.
    """,
    output_key="critic_feedback",
    disallow_transfer_to_parent=True,
    tools=[exit_loop]
)