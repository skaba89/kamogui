from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai.gold_classifier import is_gold_related
from app.services.scoring.gold_score import compute_gold_score
from app.services.scoring.trust_score import compute_trust_score
from app.services.scraping.web_scraper import search_web
from app.services.scraping.email_extractor import extract_emails_from_url
from app.services.crm.lead_repository import save_lead, get_leads
from app.services.ai.gold_copywriter import generate_gold_sales_email, generate_follow_up_email

router = APIRouter(prefix="/api/gold-prospector", tags=["Gold Prospector"])

class AnalyzePayload(BaseModel):
    text: str

class SearchPayload(BaseModel):
    query: str

class EmailPayload(BaseModel):
    lead: dict

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
        emails = extract_emails_from_url(r["url"])

        lead = {
            "name": r["title"],
            "url": r["url"],
            "emails": emails,
            "gold_score": gold_score,
            "trust": trust
        }

        save_lead(lead)
        prospects.append(lead)

    return {
        "query": query,
        "count": len(prospects),
        "prospects": prospects
    }

@router.post("/generate-email")
def generate_email(payload: EmailPayload):
    return generate_gold_sales_email(payload.lead)

@router.post("/follow-up")
def follow_up(payload: EmailPayload):
    return generate_follow_up_email(payload.lead)

@router.get("/leads")
def leads():
    return get_leads()
