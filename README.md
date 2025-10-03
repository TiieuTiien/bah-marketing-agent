# BAH-Marketing-Agent

**BAH-Marketing-Agent** is an AI-powered system that supports **marketing content creation** for the **Book and Action HaUI Club**.
It combines a **React frontend**, a **FastAPI backend**, and an **Agent Development Kit (ADK) service** to build, run, and manage AI-driven content generation workflows.

## ✨ Features

* 🖥️ **Frontend (React/TypeScript)** — user-friendly interface for managing content
* ⚙️ **Backend (FastAPI/Python)** — API layer handling business logic and integrations
* 🤖 **ADK Agents** — modular AI agents built with the Agent Development Kit
* 📦 **Extensible** — designed for future AI service integrations and multi-agent workflows

## 🏗️ Architecture Overview

* **Frontend** calls the backend API.
* **Backend** coordinates requests, validates inputs, and triggers AI tasks.
* **ADK Agents** run independently, providing AI-powered capabilities (text generation, summarization, etc.).

## 🛠 Tech Stack

* **Frontend**: React + TypeScript, CSS
* **Backend**: Python + FastAPI
* **Agents**: Agent Development Kit (FastAPI)

## 📂 Project Structure

```text
bah-marketing-agent/
├── frontend/                # React app (TypeScript)
│   ├── package.json
│   └── src/
├── api/                     # FastAPI app (Python)
│   ├── requirements.txt
│   └── app/
├── adk_agents/              # Agent Development Kit implementations
│   ├── main.py              # ADK FastAPI entrypoint
│   ├── requirements.txt
│   └── README.md
├── README.md
└── LICENSE
```

## ⚡ Quick Start (Docker)

For the fastest setup, use Docker:

```bash
git clone https://github.com/your-org/bah-marketing-agent.git
cd bah-marketing-agent
docker-compose up --build
```

Services will be available at:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:8080](http://localhost:8080)
* ADK Agents: [http://localhost:8000](http://localhost:8000)

## ⚙️ Environment Variables

Configure your `.env` files as needed for each service.  
**Do not commit `.env` with secrets.**

## 🔧 Running Services (Manual Dev Mode)

### 1. Backend (FastAPI)

```bash
cd api
python -m venv .venv
.\.venv\Scripts\activate    # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8080
```

* Health: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)
* Docs: [http://127.0.0.1:8080/docs](http://127.0.0.1:8080/docs)

### 2. ADK Agents

```bash
cd adk_agents
python -m venv .venv
.\.venv\Scripts\activate    # Windows
pip install -r requirements.txt
python main.py
```

* Health: [http://localhost:8000/](http://localhost:8000/)

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

* App: [http://localhost:3000](http://localhost:3000)

## ✅ Health Checks

* Backend: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)
* ADK Agents: [http://localhost:8000/](http://localhost:8000/)
* Frontend: [http://localhost:3000](http://localhost:3000)

## 🐞 Troubleshooting

* **Service not reachable?**
  * Check correct folder (`api/` vs `adk_agents/`).
  * Verify ports: backend `8080`, agents `8000`.
  * Ensure `.env` contains required keys.
* **Frontend API errors?**
  * Confirm frontend is configured to point to the backend API.
* **Dependency errors?**
  * Reinstall with `pip install -r requirements.txt` or `npm install`.

## 🤝 Contributing

* Keep service-specific setup in their respective `README.md` (`frontend/`, `adk_agents/`).
* Open issues for missing docs, bugs, or runtime problems.
* Follow standard practices: run linters/tests before PR.

## 📜 License

Licensed under the **Apache 2.0 License** — see [LICENSE](./LICENSE).