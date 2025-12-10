from fastapi import APIRouter, HTTPException, status
from typing import List
from ..schemas import TodoCreate, TodoUpdate, TodoInDB
from ..models import list_todos, create_todo, get_todo_by_id, update_todo, delete_todo

router = APIRouter(prefix="/api/todos", tags=["todos"])

@router.get("/", response_model=List[TodoInDB])
async def get_todos():
    docs = await list_todos()
    return docs

@router.post("/", response_model=TodoInDB, status_code=status.HTTP_201_CREATED)
async def post_todo(payload: TodoCreate):
    todo = await create_todo(payload.dict())
    return todo

@router.get("/{todo_id}", response_model=TodoInDB)
async def get_todo(todo_id: str):
    doc = await get_todo_by_id(todo_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Todo not found")
    return doc

@router.put("/{todo_id}", response_model=TodoInDB)
async def put_todo(todo_id: str, payload: TodoUpdate):
    existing = await get_todo_by_id(todo_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Todo not found")
    update_data = {k:v for k,v in payload.dict().items() if v is not None}
    # validate status
    if "status" in update_data and update_data["status"] not in ("pending", "completed"):
        raise HTTPException(status_code=400, detail="Invalid status")
    updated = await update_todo(todo_id, update_data)
    return updated

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_todo(todo_id: str):
    existing = await get_todo_by_id(todo_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Todo not found")
    await delete_todo(todo_id)
    return
