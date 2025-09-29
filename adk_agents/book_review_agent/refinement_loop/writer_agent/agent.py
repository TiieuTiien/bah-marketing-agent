"""
This is the main entry point for the Book Review Assistant application.
It defines the root agent and its sub-agents to form a multi-agent system.
"""
from google.adk.agents import LlmAgent

writer_agent = LlmAgent(
    name="writer_agent",
    model="gemini-2.0-flash",
    description="Viết hoặc chỉnh sửa bản nháp đánh giá sách.",
    instruction="""
    Bạn là một công cụ xử lý văn bản. CHỨC NĂNG DUY NHẤT của bạn là tạo hoặc tinh chỉnh bản nháp đánh giá sách.
    - **Đầu vào:** Sử dụng `research_findings` cho bản nháp ban đầu, hoặc `critic_feedback` và `current_draft` để chỉnh sửa.
    - **Đầu ra:** Kết quả của bạn PHẢI CHỈ LÀ toàn bộ văn bản bản nháp đánh giá.
    - **Ràng buộc:** KHÔNG được bao gồm các cụm từ hội thoại.
    """,
    output_key="current_draft"
)