from fastapi import APIRouter
from app.services.billing.stripe_service import create_checkout_session

router = APIRouter(prefix="/api/billing", tags=["Billing"])

@router.post("/checkout")
def checkout(email: str):
    url = create_checkout_session(email, "price_xxx")
    return {"url": url}
