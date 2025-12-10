from datetime import datetime
from .db import db
from bson import ObjectId

COLLECTION = "todos"

async def list_todos():
    cursor = db[COLLECTION].find().sort("created_at", -1)
    return [doc async for doc in cursor]

async def create_todo(data):
    todo = {
        "title": data["title"],
        "description": data.get("description"),
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    res = await db[COLLECTION].insert_one(todo)
    todo["_id"] = res.inserted_id
    return todo

async def get_todo_by_id(id: str):
    doc = await db[COLLECTION].find_one({"_id": ObjectId(id)})
    return doc

async def update_todo(id: str, data: dict):
    await db[COLLECTION].update_one({"_id": ObjectId(id)}, {"$set": data})
    return await get_todo_by_id(id)

async def delete_todo(id: str):
    res = await db[COLLECTION].delete_one({"_id": ObjectId(id)})
    return res.deleted_count
