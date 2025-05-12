from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

# Configure the API
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://myunihealth.app",  # Your Vercel domain
        "https://*.vercel.app"  # All Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health center services
cp_health_center_services = [
    "Self Order Test Only - STI (No Symptoms)",
    "Tuberculosis (TB) - Self Order",
    "Acne Condition",
    "Allergies/Sinus Problem",
    "Anxiety/Stress (Not with counseling)",
    "Asthma (NO trouble breathing now)",
    "Birth Control Problems",
    "Birth Control Starting or Changing",
    "Breast problem(s)",
    "Cold/Cough",
    "Depression (Not with counseling)",
    "Discuss a Private Matter",
    "Earache or Ear Problem",
    "Eye problem",
    "Fatigue",
    "Fever",
    "Finger or Toenail Problem",
    "Headaches",
    "Mesntrual Problem",
    "Mental Health Concern (NOT Counseling) Initial",
    "Mouth/Oral Problem (NOT sore throat)",
    "Pain (Ongoing) (Back, Arm, Leg, Hand, Etc.)",
    "Rash/Skin Concern/Problem",
    "Rash/Skin, Infection",
    "Rash/Skin, Poision Oak",
    "Rectal/Anal Problem",
    "Sexual Health Concern (Penis/Testicles)",
    "Sexual Health Concern (Uterus/Vagina)",
    "Sleeping Problems",
    "Sore Throat",
    "Stomach or Digestive Problem",
    "Urinary Symptoms (pain, burning, frequency)",
    "Vaginal Symptoms (Itching/Irritation)",
    "Well Woman Exam w/Pap (age 21+) chages may apply"
]

# Initialize the model
model = genai.GenerativeModel('gemini-2.0-flash')

# Request model
class ChatRequest(BaseModel):
    message: str

# Response model
class ChatResponse(BaseModel):
    response: str

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Create the prompt with the user's message
        prompt = f"""Based on the following list of available health center services, please help with this query:

        Available Services:
        {chr(10).join([f"- {service}" for service in cp_health_center_services])}

        User Query: {request.message}

        Please provide:
        1. The most relevant service(s) from our list
        2. Any limitations or special conditions to be aware of
        3. Alternative services that might be helpful
        """

        # Generate response
        response = model.generate_content(prompt)
        
        return ChatResponse(response=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Health Center AI Chat API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 