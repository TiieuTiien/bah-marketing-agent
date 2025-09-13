# BAH Marketing Agent

BAH-Marketing-Agent is an AI Agent system designed to support and enhance marketing content creation for the Book and Action HaUI Club, leveraging advanced AI to efficiently generate diverse content.

## Project Structure

```
bah-marketing-agent/
├── api/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── db.py
│   │   └── test_db.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── aiagent/
│   │   │   │   ├── ChatInput/
│   │   │   │   └── ChatWindow/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   ├── comments/
│   │   │   ├── dashboard/
│   │   │   ├── discussion/
│   │   │   ├── ideadetails/
│   │   │   ├── ideaform/
│   │   │   ├── idealist/
│   │   │   └── workspace/
│   │   ├── hooks/
│   │   ├── mocks/
│   │   ├── pages/
│   │   │   └── MainApp/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
├── .gitignore
└── README.md
```

## Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python
- **Database**: SQLAlchemy ORM with PostgreSQL/SQLite support
- **API**: RESTful endpoints for ideas and comments management
- **Models**: User, Idea, Comment, and Tag entities with proper relationships

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript and Vite
- **Styling**: Custom CSS with responsive design
- **State Management**: React hooks with local state management
- **Components**: Modular component architecture for reusability

## Features

### Core Functionality
- **Idea Management**: Create, read, update, delete marketing ideas
- **Comment System**: Threaded discussions on ideas
- **Tag System**: Categorize and filter ideas with tags
- **User Management**: User authentication and profile management
- **AI Agent Integration**: Chat interface for AI-powered assistance

### UI Components
- **Dashboard**: Overview of projects and activities
- **Workspace**: Collaborative environment for idea development
- **Discussion Panel**: Real-time commenting and feedback
- **Idea Forms**: Intuitive forms for idea creation and editing
- **Authentication**: Secure login and registration system

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+
- PostgreSQL (optional, can use SQLite for development)

### Backend Setup
```bash
cd api
pip install -r requirements.txt
python -m app.main
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Development

### Backend Development
- **Database**: Uses SQLAlchemy with automatic table creation
- **Testing**: In-memory test database with mock data
- **API Documentation**: Automatic OpenAPI/Swagger documentation

### Frontend Development
- **Hot Reload**: Vite provides fast development experience
- **Type Safety**: Full TypeScript coverage
- **Component Library**: Reusable components with consistent styling
- **Mock Data**: Development-time data for testing UI components

## API Endpoints

### Ideas
- `GET /ideas` - List all ideas with filtering
- `POST /ideas` - Create new idea
- `GET /ideas/{id}` - Get specific idea
- `PUT /ideas/{id}` - Update idea
- `DELETE /ideas/{id}` - Delete idea

### Comments
- `GET /ideas/{id}/comments` - List comments for an idea
- `POST /ideas/{id}/comments` - Create comment
- `PUT /comments/{id}` - Update comment
- `DELETE /comments/{id}` - Delete comment

## Technology Stack

### Backend
- FastAPI
- SQLAlchemy ORM
- PostgreSQL/SQLite
- Pydantic for data validation

### Frontend
- React 18
- TypeScript
- Vite
- CSS Modules
- React Router

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request