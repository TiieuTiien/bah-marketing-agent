# app/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 🔑 Get DATABASE_URL from env (Example .env: postgresql://user:pass@host:5432/dbname)
import os
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/ideasdb")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
