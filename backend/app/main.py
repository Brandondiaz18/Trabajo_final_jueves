from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .db import connect_to_mongo, close_mongo_connection
from .routers import todos

app = FastAPI(title="TodoList FastAPI")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    connect_to_mongo()
    print("Connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_event():
    close_mongo_connection()
    print("Closed MongoDB connection")

app.include_router(todos.router)
