"""
This is the main entry point for the Book Review Assistant application.
It defines the root agent and its sub-agents to form a multi-agent system.
"""
from google.adk.agents import LoopAgent
from .writer_agent.agent import writer_agent
from .critic_agent.agent import critic_agent

# --- Agent Definitions for the Automated Writing Pipeline ---

refinement_loop = LoopAgent(
    name="refinement_loop",
    description="Automatically runs a write-and-review cycle.",
    sub_agents=[
        writer_agent,
        critic_agent,
    ],
    max_iterations=10 # The loop runs a fixed number of times for consistent quality.
)