from typing import List
from schemas.task import Plan
from pathlib import Path
import openai

def get_updated_plan_from_feedback(plan: Plan, user_feedback: str, client) -> Plan:
    """
    Updates a plan based on user feedback using the LLM.
    
    Args:
        plan: Current Plan object to update
        user_feedback: String containing user's feedback about changes
        client: OpenAI client instance
    
    Returns:
        Updated Plan object
    """
    # Load the task updater prompt template
    prompt_path = Path(__file__).parent.parent.parent / 'prompts' / 'task_updater.md'
    with open(prompt_path, 'r') as f:
        task_updater_prompt = f.read()

    # Load the original PRD
    prd_path = Path(__file__).parent.parent.parent / 'resources' / 'PlannerAgentPRD.md'
    with open(prd_path, 'r') as f:
        prd_content = f.read()

    # Format the current plan as JSON string
    current_plan_json = plan.model_dump_json(indent=2)

    # Format the task updater prompt with the required inputs
    task_updater_formatted = task_updater_prompt.format(
        prd=prd_content,
        current_tasks=current_plan_json,
        user_feedback=user_feedback
    )

    # Get updated plan from LLM
    completion = client.beta.chat.completions.parse(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": task_updater_formatted}
        ],
        response_format=Plan,
        temperature=0.1
    )

    # Return the updated plan
    return completion.choices[0].message.parsed 