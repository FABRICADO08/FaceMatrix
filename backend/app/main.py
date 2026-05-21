from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import register_router, checkin_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Face Ideathon API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(register_router)
app.include_router(checkin_router)

@app.get("/")
def root():
    return {"message": "Face Ideathon API is running"}