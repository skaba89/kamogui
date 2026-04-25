from fastapi import APIRouter
from pydantic import BaseModel
from app.services.billing.stripe_service import create_checkout_session

router = APIRouter(prefix="/api/billing", tags=["Billing"])


class CheckoutPayload(BaseModel):
    email: str
    price_id: str


@router.post("/checkout")
def checkout(payload: CheckoutPayload):
    url = create_checkout_session(payload.email, payload.price_id)

    if not url:
        return {"error": "Stripe not configured"}

    return {"url": url}
