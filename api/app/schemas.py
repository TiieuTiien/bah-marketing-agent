from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

# ----- Comment -----
class CommentFormData(BaseModel):
    comment_text: str

class CommentResponse(BaseModel):
    comment_id: int
    idea_id: int
    user_id: int
    username: Optional[str] = None
    comment_text: str
    created_at: datetime
    
    model_config = {
        "from_attributes": True
    }

# ----- Idea -----
class IdeaFormData(BaseModel):
    title: str
    description: Optional[str]
    category: Optional[str]
    tags: List[str] = Field(default_factory=list)

class IdeaResponse(BaseModel):
    idea_id: int
    user_id: int
    username: Optional[str] = None
    title: str
    description: Optional[str]
    status: str
    category: Optional[str]
    tags: List[str] = None
    created_at: datetime
    google_docs_url: Optional[str] = None

    model_config = {
        "from_attributes": True
    }
