import os
import io
import time
from typing import Optional

import requests
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI(title='KAMOGUI Enterprise API', version='3.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_URL', '*')],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY', '')
GROQ_API_KEY = os.getenv('GROQ_API_KEY', '')
JWT_DEMO_TOKEN = os.getenv('JWT_DEMO_TOKEN', 'kamogui-demo-token')

class LoginPayload(BaseModel):
    email: str
    password: str

class ChatPayload(BaseModel):
    message: str

class SimPayload(BaseModel):
    amount: float = 100000
    variation_pct: float = 5

class DocPayload(BaseModel):
    type: str = 'LOI'
    company: str = 'KAMOGUI International Gold'

def is_authenticated(authorization: Optional[str] = None, token: Optional[str] = None) -> bool:
    raw = authorization or token or ''
    if raw.lower().startswith('bearer '): raw = raw.split(' ', 1)[1]
    return bool(raw and raw in {JWT_DEMO_TOKEN, 'kamogui-demo-token'})

@app.get('/api/health')
def health():
    return {'status': 'ok', 'service': 'kamogui-api', 'ts': int(time.time())}

@app.post('/api/auth/login')
def login(payload: LoginPayload):
    if payload.email.lower() in {'investor@kamogui.com', 'admin@kamogui.com'} and payload.password in {'kamogui-demo', 'admin-demo'}:
        return {'access_token': JWT_DEMO_TOKEN, 'token_type': 'bearer', 'user': {'email': payload.email, 'role': 'admin' if payload.email.startswith('admin') else 'investor'}}
    raise HTTPException(status_code=401, detail='Identifiants invalides')

@app.get('/api/market/gold')
def gold_market():
    # Fallback stable côté API. Le frontend peut consommer une API prix externe via variable d'environnement.
    base_usd = 2350.50
    rates = {'USD': 1, 'EUR': .92, 'GBP': .79, 'CNY': 7.23, 'GNF': 8620, 'XOF': 603.5}
    return {'source': 'fallback', 'unit': 'oz', 'updated_at': int(time.time()), 'prices': {k: round(base_usd*v, 2) for k, v in rates.items()}}

def call_ai(prompt: str, authenticated: bool = False) -> str:
    system = 'Tu es Gold Autonome, assistant corporate de KAMOGUI International Gold. Réponds de manière professionnelle, prudente, conforme, sans conseil financier personnalisé.'
    if authenticated:
        system += ' L’utilisateur est connecté : tu peux proposer des analyses, documents, due diligence, checklist et scénarios indicatifs.'
    if OPENROUTER_API_KEY:
        try:
            r = requests.post('https://openrouter.ai/api/v1/chat/completions', timeout=18, headers={'Authorization': f'Bearer {OPENROUTER_API_KEY}', 'Content-Type': 'application/json'}, json={'model': os.getenv('OPENROUTER_MODEL', 'openai/gpt-4o-mini'), 'messages': [{'role': 'system', 'content': system}, {'role': 'user', 'content': prompt}]})
            if r.ok: return r.json()['choices'][0]['message']['content']
        except Exception:
            pass
    if GROQ_API_KEY:
        try:
            r = requests.post('https://api.groq.com/openai/v1/chat/completions', timeout=18, headers={'Authorization': f'Bearer {GROQ_API_KEY}', 'Content-Type': 'application/json'}, json={'model': os.getenv('GROQ_MODEL', 'llama-3.1-8b-instant'), 'messages': [{'role': 'system', 'content': system}, {'role': 'user', 'content': prompt}]})
            if r.ok: return r.json()['choices'][0]['message']['content']
        except Exception:
            pass
    return 'Gold Autonome est disponible en mode dégradé. Configurez OPENROUTER_API_KEY ou GROQ_API_KEY dans Render pour activer les réponses avancées.'

@app.post('/api/ai/chat')
def ai_chat(payload: ChatPayload, authorization: Optional[str] = Header(default=None)):
    return {'reply': call_ai(payload.message, is_authenticated(authorization=authorization))}

@app.post('/api/ai/simulate')
def simulate(payload: SimPayload):
    up = payload.amount * (1 + payload.variation_pct / 100)
    down = payload.amount * (1 - payload.variation_pct / 100)
    return {'amount': payload.amount, 'variation_pct': payload.variation_pct, 'scenario_up': round(up, 2), 'scenario_down': round(down, 2), 'warning': 'Simulation indicative, non contractuelle, sans conseil financier personnalisé.'}

@app.post('/api/ai/generate-doc')
def generate_doc(data: DocPayload, authorization: Optional[str] = Header(default=None), token: Optional[str] = Header(default=None)):
    if not is_authenticated(authorization=authorization, token=token):
        raise HTTPException(status_code=401, detail='login required')
    content = f"""KAMOGUI International Gold\nDocument: {data.type}\nEntreprise: {data.company}\n\nCe document est généré par Gold Autonome pour un usage corporate préliminaire.\nIl doit être validé par les équipes légales, conformité et finance avant usage externe.\n\nAxes clés:\n- Traçabilité de l’origine de l’or\n- KYC/KYB et conformité AML\n- Conditions logistiques et export\n- Confidentialité et gouvernance documentaire\n"""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.pdfgen import canvas
        buffer = io.BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4
        y = height - 72
        for line in content.split('\n'):
            pdf.drawString(72, y, line[:100]); y -= 18
            if y < 72: pdf.showPage(); y = height - 72
        pdf.save(); buffer.seek(0)
        return StreamingResponse(buffer, media_type='application/pdf', headers={'Content-Disposition': f'attachment; filename=kamogui-{data.type}.pdf'})
    except Exception:
        return StreamingResponse(io.BytesIO(content.encode()), media_type='text/plain', headers={'Content-Disposition': f'attachment; filename=kamogui-{data.type}.txt'})
