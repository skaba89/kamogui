from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai.gold_classifier import is_gold_related
from app.services.scoring.gold_score import compute_gold_score
from app.services.scoring.trust_score import compute_trust_score
from app.services.scraping.web_scraper import search_web

router = APIRouter(prefix="/api/gold-prospector", tags=["Gold Prospector"])

class AnalyzePayload(BaseModel):
    text: str

class SearchPayload(BaseModel):
    query: str

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

@router.post("/search")
def search(payload: SearchPayload):
    query = payload.query
    raw_results = search_web(query)

    prospects = []

    for r in raw_results:
        text = r["title"]
        gold = is_gold_related(text)

        if not gold["is_gold_related"]:
            continue

        gold_score = compute_gold_score(text)
        trust = compute_trust_score(text)

        prospects.append({
            "name": r["title"],
            "url": r["url"],
            "gold_score": gold_score,
            "trust": trust
        })

    return {
        "query": query,
        "count": len(prospects),
        "prospects": prospects
    }
