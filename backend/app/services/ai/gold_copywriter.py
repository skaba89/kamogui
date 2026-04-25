def generate_gold_sales_email(lead: dict, offer: str = "Gold Prospector") -> dict:
    name = lead.get("name") or "votre société"
    score = lead.get("gold_score", 0)
    emails = lead.get("emails", [])

    subject = f"Opportunité commerciale ciblée pour {name}"
    body = f"""Bonjour,

Nous avons identifié {name} comme un acteur potentiel du marché de l’or et des métaux précieux.

Votre profil présente un Gold Score de {score}/10, ce qui indique un intérêt possible pour des solutions de prospection B2B, qualification de leads et veille marché autour de l’or d’investissement, des lingots, pièces, comptoirs d’or et activités bullion.

Avec {offer}, nous aidons les acteurs du secteur à détecter des opportunités qualifiées, suivre les signaux du marché XAU/USD et améliorer leur acquisition commerciale.

Seriez-vous disponible pour un échange de 15 minutes cette semaine ?

Cordialement,
L’équipe KAMOGUI Gold Intelligence
"""
    return {"to": emails[0] if emails else None, "subject": subject, "body": body.strip()}


def generate_follow_up_email(lead: dict) -> dict:
    name = lead.get("name") or "votre société"
    return {
        "to": (lead.get("emails") or [None])[0],
        "subject": f"Relance — opportunités marché de l’or pour {name}",
        "body": f"Bonjour,\n\nJe me permets de revenir vers vous concernant notre solution de prospection spécialisée dans le marché de l’or.\n\nNous pouvons vous aider à identifier des acheteurs, vendeurs, investisseurs et partenaires qualifiés dans la filière or.\n\nSouhaitez-vous recevoir une démonstration courte ?\n\nCordialement,\nKAMOGUI Gold Intelligence"
    }
