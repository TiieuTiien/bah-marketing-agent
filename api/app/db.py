# app/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# 🔑 Get DATABASE_URL from env (Example .env: postgresql://user:pass@host:5432/dbname)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test_db.db")

engine = create_engine(DATABASE_URL, pool_pre_ping=True, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Initialize database tables if they don't exist
def init_db():
    """Initialize database tables if they don't exist"""
    try:
        # Import here to avoid circular imports
        from app.models import Base
        
        # For SQLite, check if database file exists and has tables
        if DATABASE_URL.startswith("sqlite"):
            db_file = DATABASE_URL.replace("sqlite:///./", "")
            
            # If database file doesn't exist, it will be created by SQLAlchemy
            if not os.path.exists(db_file):
                print(f"🆕 Database file {db_file} doesn't exist, creating...")
            
            # Check if tables exist
            from sqlalchemy import inspect
            inspector = inspect(engine)
            existing_tables = inspector.get_table_names()
            
            if not existing_tables:
                print("📊 No tables found, creating all tables...")
                Base.metadata.create_all(bind=engine)
                print("✅ Database tables created successfully!")
            else:
                print(f"📋 Database tables already exist: {existing_tables}")
        else:
            # For other databases (PostgreSQL, MySQL, etc.)
            Base.metadata.create_all(bind=engine)
            print("✅ Database tables initialized!")
            
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        # Don't raise the exception, let the app continue
        # You might want to log this properly in production

# Initialize database when this module is imported
init_db()

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()