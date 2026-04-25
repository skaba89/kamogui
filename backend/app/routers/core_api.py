import io
import time

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

router = APIRouter(tags=["Core API"])

DEMO_TOKEN = "kamogui-demo-token"

class LoginPayload(BaseModel):
    email: str
    password: str

class ChatPayload(BaseModel):
    message: str

class SimPayload(BaseModel):
    amount: float = 100000
    variation_pct: float = 5

class DocPayload(BaseModel):
    type: str = "LOI"
    company: str = "KAMOGUI International Gold"

@router.get("/api/health")
def health():
    return {"status": "ok", "service": "kamogui-api", "version": "5.0.0", "ts": int(time.time())}

@router.post("/api/auth/login")
def login(payload: LoginPayload):
    if payload.email.lower() in {"investor@kamogui.com", "admin@kamogui.com"} and payload.password in {"kamogui-demo", "admin-demo"}:
        role = "admin" if payload.email.lower().startswith("admin") else "investor"
        return {"access_token": DEMO_TOKEN, "token_type": "bearer", "user": {"email": payload.email, "role": role}}
    raise HTTPException(status_code=401, detail="Identifiants invalides")

@router.get("/api/market/gold")
def gold_market():
    base_usd = 2350.50
    rates = {"USD": 1, "EUR": .92, "GBP": .79, "CNY": 7.23, "GNF": 8620, "XOF": 603.5}
    return {"source": "fallback", "unit": "oz", "updated_at": int(time.time()), "prices": {k: round(base_usd*v, 2) for k, v in rates.items()}}

@router.post("/api/ai/chat")
def ai_chat(payload: ChatPayload):
    return {"reply": "Gold Autonome est disponible. Les réponses avancées seront activées avec OPENROUTER_API_KEY ou GROQ_API_KEY."}

@router.post("/api/ai/simulate")
def simulate(payload: SimPayload):
    up = payload.amount * (1 + payload.variation_pct / 100)
    down = payload.amount * (1 - payload.variation_pct / 100)
    return {"amount": payload.amount, "variation_pct": payload.variation_pct, "scenario_up": round(up, 2), "scenario_down": round(down, 2)}

@router.post("/api/ai/generate-doc")
def generate_doc(data: DocPayload):
    content = f"KAMOGUI International Gold\nDocument: {data.type}\nEntreprise: {data.company}\n\nDocument corporate préliminaire à valider par les équipes légales et conformité."
    return StreamingResponse(io.BytesIO(content.encode()), media_type="text/plain", headers={"Content-Disposition": f"attachment; filename=kamogui-{data.type}.txt"})
