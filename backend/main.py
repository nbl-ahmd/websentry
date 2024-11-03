from fastapi import FastAPI
from pydantic import BaseModel
from model import test_url, check_homograph
from fastapi.middleware.cors import CORSMiddleware
import os
import uvicorn

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

@app.post("/check-url")
async def check_url(request: URLRequest):
    return check_homograph(request.url)

if __name__ == "__main__":
    # Use the PORT environment variable, default to 8000 if not set
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port, workers=1,
        timeout_keep_alive=75,
        timeout_notify=30,
        timeout_graceful_shutdown=10,
        log_level="info",
        limit_concurrency=10,
        backlog=128,
        limit_max_requests=0,
        timeout=30)
