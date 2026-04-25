import os

try:
    import stripe
except Exception:  # Stripe is optional until billing is configured in production.
    stripe = None


def create_checkout_session(email: str, price_id: str):
    if stripe is None:
        return None

    stripe_secret_key = os.getenv("STRIPE_SECRET_KEY")
    success_url = os.getenv("STRIPE_SUCCESS_URL", "http://localhost:3000/success")
    cancel_url = os.getenv("STRIPE_CANCEL_URL", "http://localhost:3000/cancel")

    if not stripe_secret_key or not price_id:
        return None

    stripe.api_key = stripe_secret_key
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="subscription",
        customer_email=email,
        line_items=[{"price": price_id, "quantity": 1}],
        success_url=success_url,
        cancel_url=cancel_url,
    )
    return session.url
