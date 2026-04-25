import requests
from bs4 import BeautifulSoup

def search_web(query: str):
    url = f"https://www.bing.com/search?q={query}"
    try:
        r = requests.get(url, timeout=10)
        soup = BeautifulSoup(r.text, "html.parser")
        results = []
        for a in soup.select("li.b_algo h2 a"):
            results.append({
                "title": a.text,
                "url": a["href"]
            })
        return results
    except Exception:
        return []
