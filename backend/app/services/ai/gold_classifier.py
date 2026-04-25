from typing import Dict

def is_gold_related(text: str) -> Dict:
    keywords = [
        'gold','or','lingot','bullion','xau','bijouterie','joaillerie',
        'achat d\'or','vente d\'or','precious metals','métaux précieux'
    ]
    text_lower = text.lower()
    hits = [k for k in keywords if k in text_lower]
    score = min(10, len(hits)*2)
    return {
        "is_gold_related": score >= 4,
        "score": score,
        "keywords": hits
    }
