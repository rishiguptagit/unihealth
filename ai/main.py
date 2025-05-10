import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load variables from .env.local file
load_dotenv('.env.local')

# Now you can access the variable
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

# Configure the API
genai.configure(api_key=GEMINI_API_KEY)

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
    "Well Woman Exam w/Pap (age 21+) chages may apply"]

# Create a structured prompt that guides the model through understanding the services
system_prompt = """You are a medical service classification assistant. Your task is to understand and categorize medical services based on the following list of available services at a health center.

Available Services:
{services}

Please follow these steps in your analysis:
1. First, understand the broad categories of services (e.g., self-order tests, mental health, physical conditions, etc.)
2. Identify any special conditions or limitations mentioned (e.g., "NO trouble breathing now", "Not with counseling")
3. Note any age restrictions or specific requirements
4. Consider how these services might be grouped for easier navigation

When responding to queries about these services:
- Always consider the exact wording and limitations of each service
- Be precise about what is and isn't covered
- If a service isn't in the list, clearly state that it's not available
- Consider related services that might be relevant
"""

# Format the services list into a readable string
services_text = "\n".join([f"- {service}" for service in cp_health_center_services])

# Combine the system prompt with the services
full_prompt = system_prompt.format(services=services_text)

# Initialize the model
model = genai.GenerativeModel('gemini-2.0-flash')

# Initialize the model with the structured prompt
response = model.generate_content(full_prompt)

print("Model initialization response:")
print(response.text)

# Now the model is preprocessed with the services and ready for specific queries
def query_services(user_query):
    query_prompt = f"""Based on the services I've already learned about, please help with this query:
    
    User Query: {user_query}
    
    Please provide:
    1. The most relevant service(s) from our list
    2. Any limitations or special conditions to be aware of
    3. Alternative services that might be helpful
    """
    
    response = model.generate_content(query_prompt)
    return response.text

# Example usage:
result = query_services("I have a persistent cough and fever")
print(result)
