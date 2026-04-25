def compute_gold_score(text: str) -> int:
    text = text.lower()
    score = 0

    if any(k in text for k in ['gold','or','lingot','bullion']): score += 3
    if any(k in text for k in ['bijouterie','joaillerie','comptoir']): score += 2
    if any(k in text for k in ['prix or','xau','once']): score += 2
    if any(k in text for k in ['contact','email','phone']): score += 1
    if any(k in text for k in ['adresse','location','paris','dubai','london']): score += 2

    return min(10, score)
