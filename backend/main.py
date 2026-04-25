from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os, requests, datetime, io
from reportlab.pdfgen import canvas

app = FastAPI(title="KAMOGUI Enterprise API")
OPENROUTER_API_KEY=os.getenv("OPENROUTER_API_KEY")
GROQ_API_KEY=os.getenv("GROQ_API_KEY")
SUPABASE_URL=os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY=os.getenv("SUPABASE_SERVICE_ROLE_KEY")
FRONTEND_ORIGIN=os.getenv("FRONTEND_ORIGIN","*")
app.add_middleware(CORSMiddleware,allow_origins=[FRONTEND_ORIGIN] if FRONTEND_ORIGIN!="*" else ["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

def score_investor(p):
    score=0; amount=str(p.get('investment_range','')).lower(); need=str(p.get('need',''))
    if any(x in amount for x in ['1m','million','500','m€']): score+=35
    if p.get('company'): score+=15
    if p.get('country'): score+=10
    if p.get('phone') or p.get('whatsapp'): score+=15
    if len(need)>25: score+=25
    return {"score":min(score,100),"level":"HOT" if score>=75 else "WARM" if score>=45 else "COLD"}

def supabase_insert(table,payload):
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY: return {"stored":False,"reason":"Supabase not configured"}
    r=requests.post(f"{SUPABASE_URL.rstrip('/')}/rest/v1/{table}",headers={"apikey":SUPABASE_SERVICE_ROLE_KEY,"Authorization":f"Bearer {SUPABASE_SERVICE_ROLE_KEY}","Content-Type":"application/json","Prefer":"return=representation"},json=payload,timeout=20)
    return {"stored":r.status_code in [200,201],"status":r.status_code,"data":r.json() if r.content else None}

@app.get('/')
def root(): return {"status":"Kamogui API running","version":"enterprise-v2"}
@app.get('/health')
def health(): return {"status":"ok"}
@app.get('/api/gold')
def gold_prices():
    try:
        r=requests.get('https://api.metals.live/v1/spot',timeout=10); data=r.json(); gold=next((i[1] for i in data if i[0]=='gold'),None)
    except Exception: gold=2335.68
    return {"USD":gold,"EUR":gold*0.92,"GBP":gold*0.79,"CNY":gold*7.2,"GNF":gold*8600,"XOF":gold*600,"updated_at":datetime.datetime.utcnow().isoformat()}
@app.post('/api/investor-lead')
async def investor_lead(request:Request):
    p=await request.json(); s=score_investor(p); row={**p,**s,"created_at":datetime.datetime.utcnow().isoformat()}; stored=supabase_insert('investor_leads',row); return {"ok":True,"lead":row,"supabase":stored}

def local_ai(message):
    m=message.lower()
    if 'simulate' in m or 'simulation' in m: return "Je peux simuler une exposition or. Donnez le montant, la devise, la durée et l’objectif."
    if 'nda' in m: return "Je peux préparer un NDA corporate. Donnez le nom de la société, pays et interlocuteur."
    if 'loi' in m or 'letter' in m: return "Je peux générer une Letter of Intent. Donnez acheteur, vendeur, quantité indicative et pays."
    if 'risk' in m or 'risque' in m: return "J’analyse le risque selon KYC/AML, provenance, documents, contreparties et logistique."
    return "Je peux qualifier un investisseur, générer un document, simuler une opération, préparer un email commercial et analyser la conformité."

@app.post('/api/ai/chat')
@app.post('/api/chat')
async def chat(request:Request):
    d=await request.json(); msg=d.get('message',''); system="Tu es Gold Autonome, IA business de KAMOGUI. Tu qualifies les investisseurs, proposes des prochaines actions, génères des documents et restes prudent sans promettre de rendement garanti."
    for provider,key,url,model in [('openrouter',OPENROUTER_API_KEY,'https://openrouter.ai/api/v1/chat/completions',os.getenv('OPENROUTER_MODEL','mistralai/mistral-7b-instruct:free')),('groq',GROQ_API_KEY,'https://api.groq.com/openai/v1/chat/completions',os.getenv('GROQ_MODEL','llama-3.1-8b-instant'))]:
        if key:
            try:
                r=requests.post(url,headers={"Authorization":f"Bearer {key}"},json={"model":model,"messages":[{"role":"system","content":system},{"role":"user","content":msg}]},timeout=30)
                return {"reply":r.json()['choices'][0]['message']['content'],"provider":provider}
            except Exception: pass
    return {"reply":local_ai(msg),"provider":"local"}
@app.post('/api/ai/simulate')
async def simulate(request:Request):
    p=await request.json(); amount=float(p.get('amount',0)); pct=float(p.get('variation_pct',5)); return {"amount":amount,"scenario_up":amount*(1+pct/100),"scenario_down":amount*(1-pct/100),"warning":"Simulation indicative, non garantie."}
@app.post('/api/ai/generate-doc')
async def generate_doc(request:Request):
    p=await request.json(); doc_type=p.get('type','LOI'); buf=io.BytesIO(); c=canvas.Canvas(buf); c.drawString(80,800,f"KAMOGUI - {doc_type}"); c.drawString(80,760,"Document généré automatiquement par Gold Autonome."); c.drawString(80,730,str(p)); c.save(); buf.seek(0); return StreamingResponse(buf,media_type='application/pdf',headers={"Content-Disposition":f"attachment; filename=kamogui-{doc_type}.pdf"})
