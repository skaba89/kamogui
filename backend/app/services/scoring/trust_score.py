def compute_trust_score(text: str) -> dict:
    text = text.lower()
    score = 0

    if 'https' in text: score += 2
    if any(k in text for k in ['contact','email','phone']): score += 2
    if any(k in text for k in ['adresse','location']): score += 2
    if any(k in text for k in ['legal','terms','privacy']): score += 2

    level = 'HIGH'
    if score < 4:
        level = 'LOW'
    elif score < 7:
        level = 'MEDIUM'

    return {
        'trust_score': score,
        'trust_level': level
    }
