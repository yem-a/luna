from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import Optional, List, Dict
from schema import Task, Plan
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()

# Directory to store uploaded files
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for tasks
tasks_db: Dict[str, Task] = {}

# Create a new task (for testing purposes)
@app.post("/tasks/", response_model=Task)
def create_task(task: Task):
    if task.id in tasks_db:
        raise HTTPException(status_code=400, detail="Task already exists")
    tasks_db[task.id] = task
    return task

# Get a task by ID
@app.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    return tasks_db[task_id]

# Update a task by ID
@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, task: Task, field: Optional[str] = None):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if field:
        existing_task = tasks_db[task_id]
        if not hasattr(existing_task, field):
            raise HTTPException(status_code=400, detail=f"Invalid field: {field}")
        
        # Get the new value from the input task
        new_value = getattr(task, field)
        # Update the existing task with the new value
        tasks_db[task_id] = existing_task.copy(update={field: new_value})
        return tasks_db[task_id]
    
    tasks_db[task_id] = task
    return task


# Delete a task by ID
@app.delete("/tasks/{task_id}", response_model=Task)
def delete_task(task_id: str):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    deleted_task = tasks_db.pop(task_id)
    return deleted_task

# List all tasks (optional)
@app.get("/tasks/", response_model=List[Task])
def list_tasks():
    return list(tasks_db.values())

# Get a plan (list of all tasks)
@app.get("/plan/", response_model=Plan)
def get_plan():
    return Plan(tasks=list(tasks_db.values()))

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save the file to the upload directory
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        
        return JSONResponse(
            status_code=200,
            content={"message": f"File '{file.filename}' uploaded successfully!"}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"An error occurred: {str(e)}"}
        )

@app.get("/uploads/")
async def get_uploads():
    uploads = []
    for file in os.listdir(UPLOAD_DIR):
        uploads.append(file)
    return {"uploads": uploads}
