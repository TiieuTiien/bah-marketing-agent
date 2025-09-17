#!/usr/bin/env python3
"""
Test script for authentication endpoints
Run this after starting the FastAPI server to test the authentication flow
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_register():
    """Test user registration"""
    user_data = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/register", json=user_data)
    print(f"Register Response: {response.status_code}")
    if response.status_code == 200:
        print("Registration successful!")
        print(json.dumps(response.json(), indent=2))
        return True
    else:
        print(f"Registration failed: {response.text}")
        return False

def test_login():
    """Test user login"""
    login_data = {
        "username": "testuser",
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    print(f"Login Response: {response.status_code}")
    if response.status_code == 200:
        print("Login successful!")
        token_data = response.json()
        print(json.dumps(token_data, indent=2))
        return token_data["access_token"]
    else:
        print(f"Login failed: {response.text}")
        return None

def test_protected_endpoint(token):
    """Test accessing protected endpoint"""
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/me", headers=headers)
    print(f"Protected endpoint response: {response.status_code}")
    if response.status_code == 200:
        print("Protected endpoint access successful!")
        print(json.dumps(response.json(), indent=2))
        return True
    else:
        print(f"Protected endpoint access failed: {response.text}")
        return False

if __name__ == "__main__":
    print("Testing Authentication Endpoints")
    print("=" * 40)
    
    # Test registration
    print("\n1. Testing Registration...")
    if test_register():
        print("✅ Registration test passed")
    else:
        print("❌ Registration test failed")
        exit(1)
    
    # Test login
    print("\n2. Testing Login...")
    token = test_login()
    if token:
        print("✅ Login test passed")
    else:
        print("❌ Login test failed")
        exit(1)
    
    # Test protected endpoint
    print("\n3. Testing Protected Endpoint...")
    if test_protected_endpoint(token):
        print("✅ Protected endpoint test passed")
    else:
        print("❌ Protected endpoint test failed")
        exit(1)
    
    print("\n🎉 All authentication tests passed!")