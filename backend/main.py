import os
import io
import time
from typing import Optional

import requests
from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

try:
    from app.routers.gold_prospector import router as gold_prospector_router
except Exception:
    gold_prospector_router = None

try:
    from app.routers.billing import router as billing_router
except Exception:
    billing_router = None

app = FastAPI(title='KAMOGUI Enterprise API', version='4.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_URL', '*')],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

if gold_prospector_router:
    app.include_router(gold_prospector_router)

if billing_router:
    app.include_router(billing_router)

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

@app.get('/api/health')
def health():
    return {
        'status': 'ok',
        'version': '4.1.0',
        'gold_prospector': bool(gold_prospector_router),
        'billing': bool(billing_router)
    }

@app.post('/api/auth/login')
def login(payload: LoginPayload):
    if payload.email.lower() in {'investor@kamogui.com', 'admin@kamogui.com'} and payload.password in {'kamogui-demo', 'admin-demo'}:
        return {'access_token': JWT_DEMO_TOKEN, 'token_type': 'bearer', 'user': {'email': payload.email}}
    raise HTTPException(status_code=401, detail='Identifiants invalides')
