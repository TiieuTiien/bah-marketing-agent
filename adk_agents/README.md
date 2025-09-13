# 🤖 Greeting Agent
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

A simple AI assistant built with the Google Agent Development Kit (ADK) that greets the user.

---

## 📋 Prerequisites

* Python 3.9+
* An active Python virtual environment (e.g., `venv`)

## 🚀 Installation

1.  **Clone this repository.**

2.  **Activate your virtual environment.**

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## ⚙️ Configuration

This agent requires a Google API Key to interact with the Gemini model.

1.  Create a file named `.env` in the project's parent directory.
2.  Add your API key to the `.env` file. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

    ```env
    # .env file content
    GOOGLE_GENAI_USE_VERTEXAI=FALSE
    GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"
    ```

## ▶️ Running the Agent

You can interact with this agent in two simple ways from your terminal. Make sure you are in the parent directory of the `my_greeting_agent` folder.

### 1. Interactive Dev UI (Recommended)

This command starts a web server with a user interface for chatting with your agent.
```bash
adk web
```
After running, open `http://127.0.0.1:8000` in your browser and select `my_greeting_agent`.

### 2. Command-Line Interface (CLI)

This command lets you chat with the agent directly in your terminal.
```bash
adk run greeting_agent
```

### 3. Custom API Server (FastAPI)

If you have created a `main.py` file to define a custom FastAPI server, you can run it directly with `uvicorn`. This is ideal for when you want to run only the API endpoints without the development UI. You can set the `web` argument in the `get_fast_api_app` function to `True` if you want to enable the UI.

**Prerequisite:** You must have a `main.py` file in your project's parent directory.

```bash
uvicorn main:app --reload
```

This command starts your custom API server. After it's running, you can interact with the agent by sending HTTP requests (e.g., using `curl`) to `http://127.0.0.1:8000` in a <b>different</b> terminal.

Example:

1. **Open a new terminal:** You can access the auto-generated API documentation at **`/docs`** to test the endpoints interactively, or use the `curl` commands below.

2. **List available agents:** Your agent's name will be the name of its directory, i.e., `greeting_agent`.

```bash
# In a different terminal
curl -X GET http://127.0.0.1:8000/list-apps

# Expected result:
["greeting_agent"]
```

3. **Create a new session:** We need a session to store the conversation history.

```bash
# Create new session
curl -X POST http://127.0.0.1:8000/apps/my_agent/users/user_001/sessions/session_abc
```

4. **Send a query to the agent (Q\&A):** This is the main endpoint for interaction. We will send a new message to the created session.

```bash
curl -X POST http://127.0.0.1:8000/run_sse \
-H "Content-Type: application/json" \
-d '{
  "app_name": "my_agent",
  "user_id": "user_001",
  "session_id": "session_abc",
  "new_message": {
    "role": "user",
    "parts": [{
      "text": "Hello, how are you?"
    }]
  },
  "streaming": false
}'
```

  * **`app_name`**: The name of your agent directory (`my_agent`).
  * **`user_id` & `session_id`**: Must match the session you created.
  * **`new_message`**: The content of your query.

**Result**: You will receive a series of events in JSON format from the agent.
```bash
# The final response will be similar to:
{"text":"Hello! I'm doing well. What's your name?"}
```
---
## 📜 License

This project is licensed under the Apache 2.0 License.