
import os
from google.adk.cli.fast_api import get_fast_api_app
from dotenv import load_dotenv
import uvicorn

load_dotenv()

AGENT_DIR = os.path.dirname(os.path.abspath(__file__))

app = get_fast_api_app(
    agents_dir=AGENT_DIR,
    allow_origins=["*"],
    web=False
)

@app.get("/")
async def read_root():
    return {"message": "ADK Agent Server is running. Use /list-apps to see available agents."}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)