from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Table, Text, func
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

idea_tags = Table(
    "idea_tags",
    Base.metadata,
    Column("idea_id", Integer, ForeignKey("ideas.idea_id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.tag_id", ondelete="CASCADE"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False, unique=True)
    
    # Relationship
    ideas = relationship("Idea", back_populates="author", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    
class Tag(Base):
    __tablename__ = "tags"
    tag_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

class Idea(Base):
    __tablename__ = "ideas"
    idea_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(32), nullable=False, default="new")
    category = Column(String(100), nullable=True)
    google_docs_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Foreign key
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    
    # Relationship
    author = relationship("User", back_populates="ideas")
    tags = relationship("Tag", secondary=idea_tags, backref="ideas", lazy="joined")
    comments = relationship("Comment", back_populates="idea", cascade="all, delete-orphan")

class Comment(Base):
    __tablename__ = "comments"
    comment_id = Column(Integer, primary_key=True, index=True)
    comment_text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Foreign key
    idea_id = Column(Integer, ForeignKey("ideas.idea_id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    
    # Relationship
    idea = relationship("Idea", back_populates="comments")
    user = relationship("User", back_populates="comments")
    