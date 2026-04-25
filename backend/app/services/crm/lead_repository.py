import json
import os

FILE_PATH = "leads.json"

def save_lead(lead: dict):
    data = []
    if os.path.exists(FILE_PATH):
        with open(FILE_PATH, "r") as f:
            try:
                data = json.load(f)
            except:
                data = []

    data.append(lead)

    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)

    return lead


def get_leads():
    if not os.path.exists(FILE_PATH):
        return []

    with open(FILE_PATH, "r") as f:
        try:
            return json.load(f)
        except:
            return []
