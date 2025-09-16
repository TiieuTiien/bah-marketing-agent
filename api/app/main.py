from contextlib import asynccontextmanager
from typing import List, Optional
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app import models, schemas
from app.db import get_db, SessionLocal


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup code
    db = SessionLocal()
    db.close()

    yield

    # Shutdown code
    print("App shutting down!")


origins = {
    "http://localhost:5432",
}

app = FastAPI(title="Idea Management API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- Helper ----------------
def save_and_refresh(db: Session, obj):
    try:
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


def get_or_create_tags(db: Session, tag_names: List[str]) -> List[models.Tag]:
    tags = []
    seen = set()
    for name in tag_names:
        name = name.strip()
        if not name or name in seen:
            continue
        seen.add(name)

        tag = db.query(models.Tag).filter(models.Tag.name == name).first()
        if not tag:
            stmt = (
                insert(models.Tag)
                .values(name=name)
                .on_conflict_do_nothing()
                .returning(models.Tag.tag_id, models.Tag.name)
            )
            result = db.execute(stmt)
            db.commit()
            tag = db.query(models.Tag).filter(models.Tag.name == name).first()
        tags.append(tag)
    return tags


def idea_to_response(idea: models.Idea) -> schemas.IdeaResponse:
    return schemas.IdeaResponse(
        idea_id=idea.idea_id,
        user_id=idea.user_id,
        username=idea.author.username if idea.author else None,
        title=idea.title,
        description=idea.description,
        status=idea.status,
        category=idea.category,
        created_at=idea.created_at,
        google_docs_url=idea.google_docs_url,
        tags=[t.name for t in idea.tags] if idea.tags else [],
    )


def comment_to_response(comment: models.Comment) -> schemas.CommentResponse:
    return schemas.CommentResponse.model_validate(comment).model_copy(
        update={"username": comment.user.username if comment.user else None}
    )


# ---------------- Ideas ----------------
@app.post("/api/ideas", response_model=schemas.IdeaResponse)
def create_idea(
    payload: schemas.IdeaFormData,
    db: Session = Depends(get_db),
    user_id: int = 1,  # TODO: lấy từ auth token
):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    existing_idea = (
        db.query(models.Idea)
        .filter(models.Idea.user_id == user_id, models.Idea.title == payload.title)
        .first()
    )
    if existing_idea:
        raise HTTPException(status_code=400, detail="Title already exist")

    idea = models.Idea(
        title=payload.title,
        description=payload.description,
        category=payload.category,
        user_id=user.user_id,
        status="new",
    )

    if payload.tags:
        idea.tags = get_or_create_tags(db, payload.tags)

    idea = save_and_refresh(db, idea)

    return idea_to_response(idea)


@app.get("/api/ideas", response_model=List[schemas.IdeaResponse])
def list_ideas(
    status: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    tag: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(models.Idea).options(
        joinedload(models.Idea.author), joinedload(models.Idea.tags)
    )
    if status:
        q = q.filter(models.Idea.status == status)
    if category:
        q = q.filter(models.Idea.category == category)
    if tag:
        q = q.join(models.Idea.tags).filter(models.Tag.name == tag)

    ideas = q.all()
    return [idea_to_response(i) for i in ideas]


@app.get("/api/ideas/{idea_id}", response_model=schemas.IdeaResponse)
def get_idea(idea_id: int, db: Session = Depends(get_db)):
    idea = (
        db.query(models.Idea)
        .options(joinedload(models.Idea.author), joinedload(models.Idea.tags))
        .filter(models.Idea.idea_id == idea_id)
        .first()
    )
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")

    return idea_to_response(idea)


@app.put("/api/ideas/{idea_id}", response_model=schemas.IdeaResponse)
def update_idea(
    idea_id: int, payload: schemas.IdeaFormData, db: Session = Depends(get_db)
):
    idea = db.query(models.Idea).filter(models.Idea.idea_id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")

    if payload.title and payload.title != idea.title:
        existing = (
            db.query(models.Idea).filter(models.Idea.title == payload.title).first()
        )
        if existing:
            raise HTTPException(status_code=400, detail="Title already exist")

    idea.title = payload.title if payload.title is not None else idea.title
    idea.description = (
        payload.description if payload.description is not None else idea.description
    )
    idea.category = payload.category if payload.category is not None else idea.category

    if payload.tags is not None:
        idea.tags = get_or_create_tags(db, payload.tags)

    idea = save_and_refresh(db, idea)
    return idea_to_response(idea)


@app.delete("/api/ideas/{idea_id}")
def delete_idea(idea_id: int, db: Session = Depends(get_db)):
    idea = db.query(models.Idea).filter(models.Idea.idea_id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")

    db.delete(idea)
    db.commit()
    return {"detail": "Idea deleted"}


# ---------------- Comments ----------------
@app.post("/api/ideas/{idea_id}/comments", response_model=schemas.CommentResponse)
def create_comment(
    idea_id: int,
    payload: schemas.CommentFormData,
    db: Session = Depends(get_db),
    user_id: int = 1,  # TODO: lấy từ auth token
):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    idea = db.query(models.Idea).filter(models.Idea.idea_id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")

    comment = models.Comment(
        idea_id=idea_id,
        user_id=user.user_id,
        comment_text=payload.comment_text,
    )
    comment = save_and_refresh(db, comment)
    return comment_to_response(comment)


@app.get("/api/ideas/{idea_id}/comments", response_model=List[schemas.CommentResponse])
def list_comments(idea_id: int, db: Session = Depends(get_db)):
    comments = (
        db.query(models.Comment)
        .options(joinedload(models.Comment.user))
        .filter(models.Comment.idea_id == idea_id)
        .all()
    )
    return [comment_to_response(c) for c in comments]


@app.put("/api/comments/{comment_id}", response_model=schemas.CommentResponse)
def update_comment(
    comment_id: int,
    payload: schemas.CommentFormData,
    db: Session = Depends(get_db),
    user_id: int = 1,
):
    comment = (
        db.query(models.Comment)
        .options(joinedload(models.Comment.user))
        .filter(models.Comment.comment_id == comment_id)
        .first()
    )
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not allowed to edit this comment")

    comment.comment_text = payload.comment_text
    comment = save_and_refresh(db, comment)
    return comment_to_response(comment)


@app.delete("/api/comments/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db), user_id: int = 1):
    comment = (
        db.query(models.Comment).filter(models.Comment.comment_id == comment_id).first()
    )
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.user_id != user_id:
        raise HTTPException(
            status_code=403, detail="Not allowed to delete this comment"
        )

    db.delete(comment)
    db.commit()
    return {"detail": "Comment deleted"}


@app.get("/")
def root():
    return {"message": "Hello FastAPI with mock data!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
