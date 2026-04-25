from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os, requests, datetime

app = FastAPI(title="KAMOGUI Enterprise API")

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "*")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN] if FRONTEND_ORIGIN != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def score_investor(payload):
    score = 0
    amount = str(payload.get("investment_range", "")).lower()
    if "1m" in amount or "million" in amount or "500" in amount: score += 35
    if payload.get("company"): score += 15
    if payload.get("country"): score += 10
    if payload.get("phone") or payload.get("whatsapp"): score += 15
    if payload.get("need") and len(payload.get("need", "")) > 25: score += 25
    if score >= 75: level = "HOT"
    elif score >= 45: level = "WARM"
    else: level = "COLD"
    return {"score": min(score,100), "level": level}

def supabase_insert(table, payload):
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        return {"stored": False, "reason": "Supabase not configured"}
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{table}"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    r = requests.post(url, headers=headers, json=payload, timeout=20)
    return {"stored": r.status_code in [200,201], "status": r.status_code, "data": r.json() if r.content else None}

@app.get("/")
def root():
    return {"status":"Kamogui API running", "version":"ultra-scale"}

@app.get("/health")
def health():
    return {"status":"ok"}

@app.get("/api/gold")
def gold_prices():
    try:
        r = requests.get("https://api.metals.live/v1/spot", timeout=10)
        data = r.json()
        gold_usd = next((item[1] for item in data if item[0] == "gold"), None)
        return {
            "USD": gold_usd,
            "EUR": gold_usd * 0.92 if gold_usd else None,
            "GBP": gold_usd * 0.79 if gold_usd else None,
            "CNY": gold_usd * 7.2 if gold_usd else None,
            "GNF": gold_usd * 8600 if gold_usd else None,
            "XOF": gold_usd * 600 if gold_usd else None,
            "updated_at": datetime.datetime.utcnow().isoformat()
        }
    except Exception:
        return {"error":"gold data unavailable"}

@app.post("/api/investor-lead")
async def investor_lead(request: Request):
    payload = await request.json()
    scoring = score_investor(payload)
    row = {**payload, **scoring, "created_at": datetime.datetime.utcnow().isoformat()}
    stored = supabase_insert("investor_leads", row)
    return {"ok": True, "lead": row, "supabase": stored}

@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    message = data.get("message")
    system = "Tu es Gold Autonome, assistant institutionnel de KAMOGUI International Gold. Réponds de façon professionnelle sur l'or, la conformité KYC/AML, la traçabilité, l'exportation, les investisseurs, sans promettre de rendement garanti."

    if OPENROUTER_API_KEY:
        try:
            r = requests.post("https://openrouter.ai/api/v1/chat/completions",
                headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}"},
                json={"model": os.getenv("OPENROUTER_MODEL", "mistralai/mistral-7b-instruct:free"), "messages": [{"role":"system","content":system},{"role": "user", "content": message}]}, timeout=30)
            return {"reply": r.json()["choices"][0]["message"]["content"], "provider":"openrouter"}
        except Exception:
            pass

    if GROQ_API_KEY:
        try:
            r = requests.post("https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
                json={"model": os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"), "messages": [{"role":"system","content":system},{"role": "user", "content": message}]}, timeout=30)
            return {"reply": r.json()["choices"][0]["message"]["content"], "provider":"groq"}
        except Exception:
            pass

    return {"reply":"Gold Autonome est actif en mode local. Configure OPENROUTER_API_KEY ou GROQ_API_KEY pour activer l'IA avancée.", "provider":"local"}
