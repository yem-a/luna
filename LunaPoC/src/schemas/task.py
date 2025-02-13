from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field

class PriorityLevel(str, Enum):
    MUST_HAVE = "must_have"
    SHOULD_HAVE = "should_have"
    COULD_HAVE = "could_have"

class ConfidenceLevel(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

class RiskLevel(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

class TaskEstimate(BaseModel):
    hours: float
    confidence_level: ConfidenceLevel
    story_points: Optional[int] = None
    notes: Optional[str] = None

class TaskRisk(BaseModel):
    level: RiskLevel
    description: str
    mitigation_strategy: Optional[str] = None

class Task(BaseModel):
    id: str = Field(..., description="Unique identifier for the task")
    title: str = Field(..., description="Short, descriptive title")
    description: str = Field(..., description="Detailed task description")
    priority: PriorityLevel
    
    # Dependencies
    depends_on: List[str] = Field(default_factory=list, description="List of task IDs this task depends on")
    
    # Estimation
    estimate: TaskEstimate
    
    # Risk Assessment
    risk: Optional[TaskRisk] = None
    
    # Metadata
    section: Optional[str] = Field(None, description="PRD section this task was derived from")
    tags: List[str] = Field(default_factory=list)
    

class Plan(BaseModel):
    tasks: List[Task] = Field(default_factory=list, description="List of tasks in the plan")
    name: str = Field(..., description="Name of the plan")
    description: Optional[str] = Field(None, description="Description of the plan")