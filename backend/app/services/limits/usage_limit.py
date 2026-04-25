from datetime import datetime

usage = {}

def can_use(user_id: str, limit: int):
    today = datetime.now().date()

    if user_id not in usage:
        usage[user_id] = []

    usage[user_id] = [d for d in usage[user_id] if d == today]

    if len(usage[user_id]) >= limit:
        return False

    usage[user_id].append(today)
    return True
