import os
import io
import time
from typing import Optional

import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from app.routers.gold_prospector import router as gold_prospector_router
except Exception:
    gold_prospector_router = None

try:
    from app.routers.billing import router as billing_router
except Exception:
    billing_router = None

try:
    from app.routers.core_api import router as core_api_router
except Exception:
    core_api_router = None

app = FastAPI(title='KAMOGUI Enterprise API', version='5.0.1')

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_URL', '*')],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

if core_api_router:
    app.include_router(core_api_router)

if gold_prospector_router:
    app.include_router(gold_prospector_router)

if billing_router:
    app.include_router(billing_router)
