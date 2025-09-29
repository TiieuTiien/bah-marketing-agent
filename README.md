# BAH Marketing Agent

BAH-Marketing-Agent is an AI Agent system designed to support and enhance marketing content creation for the Book and Action HaUI Club. It provides a full-stack example combining a FastAPI backend, a React + TypeScript frontend, and AI agent integrations to help generate and manage marketing ideas, comments, and collaborative workflows.

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

## Project structure

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
│   │   └── App.tsx
├── .gitignore
└── README.md
```

## Key features

- Idea Management: create, view, update, delete marketing ideas
- Comment System: threaded discussions on ideas
- Tag System: categorize and filter ideas
- User Management: authentication and profiles
- AI Agent Integration: chat interface and AI-assisted content generation

## Tech stack

Backend
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL (production) / SQLite (development)

Frontend
- React 18 + TypeScript
- Vite
- CSS Modules

## Getting started

Prerequisites
- Node.js 18+ and npm or yarn
- Python 3.8+
- (Optional) PostgreSQL for production

Backend (development)
```bash
cd api
python -m venv .venv
source .venv/bin/activate  # macOS / Linux
.\.venv\Scripts\activate   # Windows (PowerShell)
pip install -r requirements.txt
# Set environment variables as needed (example: DATABASE_URL)
uvicorn app.main:app --reload
```

Frontend (development)
```bash
cd frontend
npm install
npm run dev
```

Running locally
- Start the backend first, then the frontend. By default the backend runs on http://127.0.0.1:8000 and the frontend uses Vite (http://localhost:5173).
- API documentation is available at http://127.0.0.1:8000/docs

## ADK agents

This repository includes example agents built with Google ADK under adk_agents/. See adk_agents/README.md for details on configuration, running the agents, and required Google API keys.

## Contributing

Contributions are welcome! Typical workflow:
1. Fork the repository
2. Create a feature branch (git checkout -b feature/name)
3. Make changes and add tests
4. Open a pull request describing your changes

Please follow standard code formatting and include a clear commit message.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for details.

## Contact

If you have questions or need help, open an issue or contact the repository maintainer.
