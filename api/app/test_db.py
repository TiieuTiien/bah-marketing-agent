from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app import models
from app.models import Base

# SQLite in-memory
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_db.sqlite"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Tạo bảng
Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


# Hàm tạo dữ liệu fake
def init_fake_data(db):
    user = db.query(models.User).filter(models.User.username == "testuser").first()
    if not user:
        user = models.User(username="testuser")
        db.add(user)
        db.commit()
        db.refresh(user)

    idea = db.query(models.Idea).filter(models.Idea.title == "Fake Idea").first()
    if not idea:
        idea = models.Idea(
            title="Fake Idea", description="Test description", user_id=user.user_id
        )
        db.add(idea)
        db.commit()
        db.refresh(idea)

    comment = (
        db.query(models.Comment)
        .filter(
            models.Comment.idea_id == idea.idea_id,
            models.Comment.user_id == user.user_id,
        )
        .first()
    )
    if not comment:
        comment = models.Comment(
            idea_id=idea.idea_id, user_id=user.user_id, comment_text="Fake comment"
        )
        db.add(comment)
        db.commit()
