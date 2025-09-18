from contextlib import asynccontextmanager
from datetime import timedelta
from typing import List, Optional
from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app import models, schemas
from app.auth import (
    authenticate_user,
    create_access_token,
    get_password_hash,
    CurrentUser,
)
from app.db import get_db, SessionLocal


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup code
    db = SessionLocal()
    db.close()

    yield

    # Shutdown code
    print("App shutting down!")


origins = [
    "http://localhost:5432",  # Vite default port
    "http://localhost:3000",  # React default port
    "http://localhost:8080",  # Alternative frontend port
]

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
            try:
                tag = models.Tag(name=name)
                db.add(tag)
                db.flush() 
            except IntegrityError:
                db.rollback()
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


# ---------------- Authentication ----------------
@app.post("/api/register", response_model=schemas.UserProfile)
def register(user_data: schemas.RegisterRequest, db: Session = Depends(get_db)):
    # Check if username already exists
    existing_user = (
        db.query(models.User).filter(models.User.username == user_data.username).first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Check if email already exists
    existing_email = (
        db.query(models.User).filter(models.User.email == user_data.email).first()
    )
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = models.User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password,
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User registration failed")


@app.post("/api/login", response_model=schemas.Token)
def login(login_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/me", response_model=schemas.UserProfile)
def get_current_user_profile(current_user: CurrentUser):
    return current_user


# ---------------- Ideas ----------------
@app.get("/api/ideas", response_model=List[schemas.IdeaResponse])
def list_ideas(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    tag: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(models.Idea).options(
        joinedload(models.Idea.author), joinedload(models.Idea.tags)
    )
    if search:
        q = q.filter(
            models.Idea.title.ilike(f"%{search}%")
            | models.Idea.description.ilike(f"%{search}%")
        )
    if status:
        q = q.filter(models.Idea.status == status)
    if category:
        q = q.filter(models.Idea.category == category)
    if tag:
        q = q.join(models.Idea.tags).filter(models.Tag.name == tag)

    ideas = q.all()
    return [idea_to_response(i) for i in ideas]


@app.post("/api/ideas", response_model=schemas.IdeaResponse)
def create_idea(
    payload: schemas.IdeaFormData,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    try:
        existing_idea = (
            db.query(models.Idea)
            .filter(
                models.Idea.user_id == current_user.user_id,
                models.Idea.title == payload.title,
            )
            .first()
        )
        if existing_idea:
            raise HTTPException(status_code=400, detail="Title already exist")

        idea = models.Idea(
            title=payload.title,
            description=payload.description,
            category=payload.category,
            user_id=current_user.user_id,
            status="new",
        )

        print(f"Created idea object: {idea}")

        if payload.tags:
            print(f"Processing tags: {payload.tags}")
            idea.tags = get_or_create_tags(db, payload.tags)
            print(f"Tags processed: {[t.name for t in idea.tags]}")

        idea = save_and_refresh(db, idea)
        print(f"Saved idea: {idea.idea_id}")

        return idea_to_response(idea)

    except Exception as e:
        print(f"Error creating idea: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback

        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


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
@app.get("/api/ideas/{idea_id}/comments", response_model=List[schemas.CommentResponse])
def list_comments(idea_id: int, db: Session = Depends(get_db)):
    comments = (
        db.query(models.Comment)
        .options(joinedload(models.Comment.user))
        .filter(models.Comment.idea_id == idea_id)
        .all()
    )
    return [comment_to_response(c) for c in comments]


@app.post("/api/ideas/{idea_id}/comments", response_model=schemas.CommentResponse)
def create_comment(
    idea_id: int,
    payload: schemas.CommentFormData,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    idea = db.query(models.Idea).filter(models.Idea.idea_id == idea_id).first()
    if not idea:
        raise HTTPException(status_code=404, detail="Idea not found")

    comment = models.Comment(
        idea_id=idea_id,
        user_id=current_user.user_id,
        comment_text=payload.comment_text,
    )
    comment = save_and_refresh(db, comment)
    return comment_to_response(comment)


@app.get(
    "/api/ideas/{idea_id}/comments/{comment_id}", response_model=schemas.CommentResponse
)
def get_comment(
    idea_id: int,
    comment_id: int,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    comment = (
        db.query(models.Comment)
        .options(joinedload(models.Comment.user))
        .filter(
            models.Comment.comment_id == comment_id, models.Comment.idea_id == idea_id
        )
        .first()
    )
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not allowed to view this comment")
    return comment_to_response(comment)


@app.put(
    "/api/ideas/{idea_id}/comments/{comment_id}", response_model=schemas.CommentResponse
)
def update_comment(
    idea_id: int,
    comment_id: int,
    payload: schemas.CommentFormData,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    comment = (
        db.query(models.Comment)
        .options(joinedload(models.Comment.user))
        .filter(
            models.Comment.comment_id == comment_id, models.Comment.idea_id == idea_id
        )
        .first()
    )
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not allowed to edit this comment")
    comment.comment_text = payload.comment_text
    comment = save_and_refresh(db, comment)
    return comment_to_response(comment)


@app.delete("/api/ideas/{idea_id}/comments/{comment_id}")
def delete_comment(
    idea_id: int,
    comment_id: int,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    comment = (
        db.query(models.Comment)
        .filter(
            models.Comment.comment_id == comment_id, models.Comment.idea_id == idea_id
        )
        .first()
    )
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.user_id:
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
