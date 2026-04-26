import json
import os
from datetime import datetime
from uuid import uuid4

FILE_PATH = os.getenv("LEADS_FILE_PATH", "leads.json")


def _load():
    if not os.path.exists(FILE_PATH):
        return []
    with open(FILE_PATH, "r") as f:
        try:
            data = json.load(f)
            return data if isinstance(data, list) else []
        except Exception:
            return []


def _write(data):
    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)


def save_lead(lead: dict):
    data = _load()
    lead = {
        "id": lead.get("id") or str(uuid4()),
        "status": lead.get("status") or "new",
        "created_at": lead.get("created_at") or datetime.utcnow().isoformat(),
        **lead,
    }
    data.append(lead)
    _write(data)
    return lead


def get_leads():
    return _load()


def update_lead_status(lead_id: str, status: str):
    data = _load()
    for lead in data:
        if lead.get("id") == lead_id:
            lead["status"] = status
            lead["updated_at"] = datetime.utcnow().isoformat()
            _write(data)
            return lead
    return None


def get_lead_analytics():
    leads = _load()
    total = len(leads)
    emails = sum(len(lead.get("emails") or []) for lead in leads)
    avg_score = round(sum(lead.get("gold_score") or 0 for lead in leads) / total, 1) if total else 0
    hot = len([lead for lead in leads if (lead.get("gold_score") or 0) >= 8])
    verified = len([lead for lead in leads if (lead.get("trust") or {}).get("trust_level") == "HIGH"])
    by_status = {}
    for lead in leads:
        status = lead.get("status") or "new"
        by_status[status] = by_status.get(status, 0) + 1
    return {
        "total_leads": total,
        "emails_found": emails,
        "average_gold_score": avg_score,
        "hot_leads": hot,
        "verified_or_high_trust": verified,
        "by_status": by_status,
    }
