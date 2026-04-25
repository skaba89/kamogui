from fastapi import FastAPI, Request
import os, requests

app = FastAPI()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@app.get("/")
def root():
    return {"status":"Kamogui API running"}

@app.get("/health")
def health():
    return {"status":"ok"}

@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    message = data.get("message")

    if OPENROUTER_API_KEY:
        try:
            r = requests.post("https://openrouter.ai/api/v1/chat/completions",
                headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}"},
                json={"model": "mistralai/mistral-7b-instruct:free", "messages": [{"role": "user", "content": message}]}
            )
            return {"reply": r.json()["choices"][0]["message"]["content"]}
        except:
            pass

    if GROQ_API_KEY:
        try:
            r = requests.post("https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
                json={"model": "llama-3.1-8b-instant", "messages": [{"role": "user", "content": message}]}
            )
            return {"reply": r.json()["choices"][0]["message"]["content"]}
        except:
            pass

    return {"reply":"Gold Autonome offline"}
