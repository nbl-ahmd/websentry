from fastapi import FastAPI
from pydantic import BaseModel
from model import test_url, check_homograph
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import uvicorn
import requests
import httpx
import asyncio
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

# Keep-alive endpoint
@app.get("/keep-alive")
async def keep_alive():
    return {"message": "I'm alive!"}


@app.post("/check-url")
async def check_url(request: URLRequest):
    return check_homograph(request.url)

# Function to ping the keep-alive endpoint
async def ping_keep_alive():
    KEEP_ALIVE_URL = "https://websentry.onrender.com/keep-alive"  # Replace with your actual endpoint URL
    PING_INTERVAL = 600  # Ping every 15 minutes

    while True:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(KEEP_ALIVE_URL)
                print(f"Keep-alive ping sent: {response.status_code} - {response.json()}")
        except Exception as e:
            print(f"Error pinging keep-alive endpoint: {e}")

        await asyncio.sleep(PING_INTERVAL)

# Run the keep-alive function in the background when the application starts
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(ping_keep_alive())

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)