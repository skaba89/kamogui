from fastapi import APIRouter
from app.services.ai.gold_classifier import is_gold_related

router = APIRouter(prefix="/api/gold-prospector", tags=["Gold Prospector"])

@router.post("/analyze")
def analyze(text: str):
    return is_gold_related(text)
