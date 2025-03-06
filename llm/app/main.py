from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str
    options: Optional[List[dict]] = None

def create_system_prompt():
    return """You are a university health assistant. Your role is to:
1. Help students understand their symptoms
2. Provide appropriate healthcare options based on severity
3. Consider factors like:
   - Distance to healthcare facilities
   - Student insurance coverage
   - Urgency of care needed
4. Always encourage seeking professional medical help when appropriate
5. Never provide definitive medical diagnoses

Keep responses clear, professional, and focused on directing students to appropriate care options."""

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Prepare messages for OpenAI
        messages = [{"role": "system", "content": create_system_prompt()}]
        messages.extend([{"role": msg.role, "content": msg.content} for msg in request.messages])

        # Get completion from OpenAI
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )

        # Extract response
        response = completion.choices[0].message.content

        # For demonstration, we'll hardcode some options
        # In a real app, these would come from a database
        options = [
            {
                "name": "Student Health Center",
                "distance": "0.5 miles",
                "availability": "Next available: Today 2:30 PM",
                "insurance": "Covered by Student Insurance"
            },
            {
                "name": "Virtual Consultation",
                "availability": "Available in 15 minutes",
                "cost": "$20 copay with Student Insurance"
            },
            {
                "name": "Urgent Care Center",
                "distance": "1.2 miles",
                "availability": "Walk-in available",
                "cost": "$50 copay with Student Insurance"
            }
        ]

        return ChatResponse(response=response, options=options)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
