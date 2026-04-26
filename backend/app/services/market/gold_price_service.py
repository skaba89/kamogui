import os
import time
from typing import Dict

import requests

SUPPORTED_RATES = {
    "USD": 1,
    "EUR": .92,
    "GBP": .79,
    "CNY": 7.23,
    "GNF": 8620,
    "XOF": 603.5,
}


def _convert_from_usd(usd_oz: float) -> Dict[str, float]:
    return {currency: round(usd_oz * rate, 2) for currency, rate in SUPPORTED_RATES.items()}


def get_gold_market_price():
    """Return gold spot data with transparent source metadata.

    Production priority:
    1. GOLD_PRICE_OFFICIAL_URL for a licensed LBMA/IBA/market-data provider proxy.
    2. gold-api.com public indicative XAU endpoint.
    3. Safe fallback so the frontend never breaks.
    """
    official_url = os.getenv("GOLD_PRICE_OFFICIAL_URL")
    official_token = os.getenv("GOLD_PRICE_OFFICIAL_TOKEN")

    if official_url:
        try:
            headers = {"Authorization": f"Bearer {official_token}"} if official_token else {}
            response = requests.get(official_url, headers=headers, timeout=8)
            response.raise_for_status()
            payload = response.json()
            usd_price = float(payload.get("price") or payload.get("usd") or payload.get("XAUUSD"))
            return {
                "source": "licensed_official_provider",
                "provider": "GOLD_PRICE_OFFICIAL_URL",
                "unit": "oz",
                "updated_at": int(time.time()),
                "prices": _convert_from_usd(usd_price),
                "compliance_note": "Official benchmark market data may require a valid licence.",
            }
        except Exception:
            pass

    try:
        response = requests.get("https://api.gold-api.com/price/XAU", timeout=8)
        response.raise_for_status()
        payload = response.json()
        usd_price = float(payload.get("price"))
        return {
            "source": "gold-api.com",
            "provider": "public_realtime_indicative_spot",
            "unit": "oz",
            "updated_at": int(payload.get("updatedAt") or time.time()),
            "prices": _convert_from_usd(usd_price),
            "compliance_note": "Indicative market data. Configure a licensed provider for official valuation/pricing.",
        }
    except Exception:
        base_usd = 2350.50
        return {
            "source": "fallback",
            "provider": "static_safe_fallback",
            "unit": "oz",
            "updated_at": int(time.time()),
            "prices": _convert_from_usd(base_usd),
            "compliance_note": "Fallback only; configure a market data provider before production use.",
        }
