from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import subprocess
from typing import Any, Dict

app = FastAPI(title="ADK Service - BAH Marketing Agent")

class RunRequest(BaseModel):
    agent_name: str
    user_id: str = "user_001"
    session_id: str = "session_abc"
    message: str

@app.get("/list-agents")
async def list_agents():
    """Return a list of agents discovered under adk_agents/ where an agent.py exists."""
    repo_root = os.path.dirname(os.path.dirname(__file__))
    agents_dir = os.path.join(repo_root, "adk_agents")
    agents = []
    if os.path.isdir(agents_dir):
        for name in sorted(os.listdir(agents_dir)):
            path = os.path.join(agents_dir, name)
            if os.path.isdir(path) and os.path.exists(os.path.join(path, "agent.py")):
                agents.append(name)
    return {"agents": agents}

@app.post("/run")
async def run_agent(req: RunRequest):
    """Run an agent using the `adk` CLI if available. This is a lightweight scaffold; replace with direct ADK Python integration if desired."""
    try:
        cmd = ["adk", "run", req.agent_name]
        proc = subprocess.run(cmd, input=req.message.encode(), stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=30)
        if proc.returncode != 0:
            raise HTTPException(status_code=500, detail=proc.stderr.decode(errors='ignore'))
        return {"output": proc.stdout.decode(errors='ignore')}
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="adk CLI not found. Install Google ADK and ensure `adk` is on PATH.")
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="Agent run timed out")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)