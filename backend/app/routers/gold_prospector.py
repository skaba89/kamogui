from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai.gold_classifier import is_gold_related
from app.services.scoring.gold_score import compute_gold_score
from app.services.scoring.trust_score import compute_trust_score

router = APIRouter(prefix="/api/gold-prospector", tags=["Gold Prospector"])

class AnalyzePayload(BaseModel):
    text: str

@router.post("/analyze")
def analyze(payload: AnalyzePayload):
    text = payload.text

    gold = is_gold_related(text)
    gold_score = compute_gold_score(text)
    trust = compute_trust_score(text)

    return {
        "input": text,
        "gold": gold,
        "gold_score": gold_score,
        "trust": trust
    }
