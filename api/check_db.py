try:
    print("Testing imports...")
    
    print("1. Testing database connection...")
    from app.db import engine, SessionLocal
    print("✅ Database imports successful")
    
    print("2. Testing models...")
    from app.models import Base, User
    print("✅ Models imports successful")
    
    print("3. Testing Base metadata...")
    print(f"Tables in metadata: {list(Base.metadata.tables.keys())}")
    
    print("4. Testing engine connection...")
    with engine.connect() as conn:
        print("✅ Database connection successful")
    
    print("\n🎉 All imports working correctly!")
    
except Exception as e:
    print(f"❌ Import error: {e}")
    import traceback
    traceback.print_exc()