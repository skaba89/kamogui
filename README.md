# KAMOGUI International Gold — Final Pro Version

Site corporate premium noir & or avec :
- Hero premium basé sur `frontend/public/hero-kamogui.jpg`
- Pages réelles : Accueil, À propos, Services, Marchés, Conformité, Investisseurs, Contact
- Widget prix de l’or : USD, EUR, GBP, CNY, GNF, XOF
- Backend FastAPI : `/health`, `/api/gold`, `/api/chat`, `/api/investor-lead`
- IA Gold Autonome via OpenRouter/Groq fallback local
- Formulaire investisseur avec scoring HOT/WARM/COLD
- Supabase prêt pour stocker les leads

## Local
```bash
cp .env.example .env
docker compose up --build
```
Frontend : http://localhost:3000  
Backend : http://localhost:8000/health

## Netlify
- Base directory: `frontend`
- Build command: `npm run build`
- Publish: `.next`
- Env: `NEXT_PUBLIC_API_URL=https://kamogui.onrender.com`

## Render
- Root directory: `backend`
- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
