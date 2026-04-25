import stripe

stripe.api_key = "YOUR_STRIPE_SECRET_KEY"

def create_checkout_session(email: str, price_id: str):
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        mode='subscription',
        customer_email=email,
        line_items=[{'price': price_id,'quantity': 1}],
        success_url="http://localhost:3000/success",
        cancel_url="http://localhost:3000/cancel"
    )
    return session.url
