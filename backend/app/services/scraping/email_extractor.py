import re
import requests

def extract_emails_from_url(url: str):
    try:
        r = requests.get(url, timeout=8)
        emails = set(re.findall(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", r.text))
        return list(emails)[:5]
    except Exception:
        return []
