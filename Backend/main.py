from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from google import genai

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create client (Make sure to replace "YOUR_ACTUAL_API_KEY" with your real key)
client = genai.Client(api_key="")

class Message(BaseModel):
    text: str

@app.post("/chat")
async def chat(message: Message):
    try:
        # Change the model name right here!
        response = client.models.generate_content(
            model="gemini-2.5-flash",  
            contents=message.text
        )

        return {"reply": response.text}

    except Exception as e:
        print("ERROR:", e)
        return {"reply": "Error: " + str(e)}