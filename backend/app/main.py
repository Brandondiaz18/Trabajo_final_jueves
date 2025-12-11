from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .db import connect_to_mongo, close_mongo_connection
from .routers import todos

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    connect_to_mongo()
    print("Connected to MongoDB")
    yield
    # Shutdown
    close_mongo_connection()
    print("Closed MongoDB connection")

app = FastAPI(title="TodoList FastAPI", lifespan=lifespan)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todos.router)
