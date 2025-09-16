# app/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 🔑 Get DATABASE_URL from env (Example .env: postgresql://user:pass@host:5432/dbname)
import os
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test_db.sqlite")

engine = create_engine(DATABASE_URL, pool_pre_ping=True, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
