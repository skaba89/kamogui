import { useEffect, useState } from 'react'

type Message = { role: 'assistant' | 'user'; content: string }
type GoldPrices = Record<string, number | null>
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'

const gold = '#D4AF37'
const card: React.CSSProperties = { background: 'linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.025))', border: '1px solid rgba(212,175,55,.22)', borderRadius: 28, boxShadow: '0 30px 90px rgba(0,0,0,.38)' }
const container: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', padding: '0 24px' }
const button: React.CSSProperties = { background: 'linear-gradient(135deg,#D4AF37,#f7dd8e)', color: '#060606', borderRadius: 999, padding: '14px 22px', fontWeight: 900, border: 0, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }
const ghost: React.CSSProperties = { color: gold, border: '1px solid rgba(212,175,55,.5)', borderRadius: 999, padding: '14px 22px', fontWeight: 800, textDecoration: 'none', display: 'inline-block', background: 'rgba(212,175,55,.04)' }

const services = [
  ['Gold Sourcing', 'Accès structuré à des flux d’approvisionnement aurifères qualifiés, avec procédures de validation des contreparties.'],
  ['Traceability & Compliance', 'Documentation opérationnelle, KYC/AML, contrôle de provenance et traçabilité des transactions.'],
  ['Export & Logistics', 'Coordination des opérations d’export, logistique, documents et suivi institutionnel.'],
  ['Investor Relations', 'Qualification d’opportunités, préparation de dossiers investisseurs et accompagnement commercial.'],
  ['Commodity Desk', 'Veille marché, prix indicatifs, structuration de transactions et reporting exécutif.']
]

const meaning = [
  ['K','Knowledge','Expertise marché, gouvernance et lecture des flux internationaux.'], ['A','Alliance','Réseau de partenaires producteurs, institutions et investisseurs.'], ['M','Market','Accès aux marchés internationaux des matières premières.'], ['O','Opportunity','Détection et structuration d’opportunités économiques.'], ['G','Growth','Croissance maîtrisée, scalabilité et expansion internationale.'], ['U','Unity','Coordination entre acteurs de la chaîne de valeur.'], ['I','Integrity','Transparence, conformité et traçabilité des opérations.']
]

export default function Home(){
  const [prices,setPrices]=useState<GoldPrices>({})
  const [chatOpen,setChatOpen]=useState(false)
  const [messages,setMessages]=useState<Message[]>([{role:'assistant',content:'Bonjour, je suis Gold Autonome. Je peux vous orienter sur la conformité, la traçabilité, l’investissement et les partenariats KAMOGUI.'}])
  const [input,setInput]=useState('')
  const [loading,setLoading]=useState(false)
  const [lead,setLead]=useState({name:'',company:'',email:'',phone:'',country:'',investment_range:'',need:''})
  const [leadStatus,setLeadStatus]=useState('')

  useEffect(()=>{fetch(`${API_URL}/api/gold`).then(r=>r.json()).then(setPrices).catch(()=>setPrices({}))},[])
  const fmt=(c:string,v:any)=>v?new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(v)+' '+c:'En cours'

  async function sendMessage(){
    if(!input.trim()||loading)return
    const msg=input.trim(); setInput(''); setMessages(m=>[...m,{role:'user',content:msg}]); setLoading(true)
    try{const r=await fetch(`${API_URL}/api/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})}); const d=await r.json(); setMessages(m=>[...m,{role:'assistant',content:d.reply||'Réponse indisponible.'}])}
    catch{setMessages(m=>[...m,{role:'assistant',content:'Connexion backend indisponible. Vérifiez Render.'}])}
    finally{setLoading(false)}
  }

  async function submitLead(e:any){
    e.preventDefault(); setLeadStatus('Envoi en cours...')
    try{const r=await fetch(`${API_URL}/api/investor-lead`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead)}); const d=await r.json(); setLeadStatus(`Demande reçue. Qualification : ${d.lead?.level || 'WARM'} (${d.lead?.score || 0}/100).`)}
    catch{setLeadStatus('Votre demande est prête, mais le backend est indisponible. Contactez-nous directement.')}
  }

  return <main style={{minHeight:'100vh',background:'#050505',color:'#fff',fontFamily:'Inter, Arial, sans-serif'}}>
    <header style={{position:'sticky',top:0,zIndex:20,backdropFilter:'blur(18px)',background:'rgba(5,5,5,.78)',borderBottom:'1px solid rgba(212,175,55,.13)'}}>
      <div style={{...container,display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:18,paddingBottom:18,gap:20}}>
        <a href="#home" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none'}}><span style={{width:46,height:46,borderRadius:'50%',border:`1px solid ${gold}`,display:'grid',placeItems:'center',color:gold,fontWeight:900,fontSize:24}}>K</span><span><b style={{color:gold,letterSpacing:4}}>KAMOGUI</b><br/><small style={{color:'#aaa',letterSpacing:4}}>INTERNATIONAL GOLD</small></span></a>
        <nav style={{display:'flex',gap:18,flexWrap:'wrap',fontSize:14}}>{['home','about','services','prices','compliance','investors','contact'].map(x=><a key={x} href={`#${x}`} style={{color:'#eee',textDecoration:'none',textTransform:'capitalize'}}>{x}</a>)}</nav>
      </div>
    </header>

    <section id="home" style={{background:'radial-gradient(circle at 76% 12%,rgba(212,175,55,.26),transparent 30%),linear-gradient(135deg,#090909,#070603 55%,#000)',borderBottom:'1px solid rgba(212,175,55,.18)'}}><div style={{...container,paddingTop:82,paddingBottom:96,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(330px,1fr))',gap:46,alignItems:'center'}}>
      <div><p style={{color:gold,letterSpacing:5,fontSize:12}}>APPROVISIONNEMENT • TRAÇABILITÉ • EXPORTATION</p><h1 style={{fontSize:'clamp(44px,7vw,86px)',lineHeight:.95,letterSpacing:-2,margin:'20px 0'}}>Institutional Gold.<br/>Trusted Network.<br/><span style={{color:gold}}>Verified Supply.</span></h1><p style={{color:'#d1d1d1',fontSize:18,lineHeight:1.8,maxWidth:670}}>KAMOGUI International Gold est positionnée comme une plateforme aurifère internationale mature, orientée conformité, performance, traçabilité et partenariats stratégiques.</p><div style={{display:'flex',gap:14,marginTop:34,flexWrap:'wrap'}}><a href="#investors" style={button}>Demander le dossier investisseur</a><a href="#services" style={ghost}>Découvrir nos services</a></div></div>
      <div style={{...card,padding:28,minHeight:440,position:'relative',overflow:'hidden'}}><div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 70% 35%,rgba(212,175,55,.35),transparent 26%)'}}/><div style={{position:'relative',height:'100%',borderRadius:24,background:'linear-gradient(145deg,#111,#050505)',border:'1px solid rgba(212,175,55,.18)',padding:28}}><div style={{fontSize:80,color:gold,fontWeight:900}}>K</div><h2 style={{fontSize:30}}>Corporate Gold Desk</h2><p style={{color:'#bbb',lineHeight:1.8}}>Une image institutionnelle pensée pour banques, fonds, investisseurs privés et partenaires miniers.</p><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:28}}>{['KYC / AML','Audit Trail','Secure Deals','Global Desk'].map(x=><div key={x} style={{padding:14,borderRadius:16,background:'rgba(212,175,55,.08)',border:'1px solid rgba(212,175,55,.22)',color:'#f3d778',fontWeight:800}}>{x}</div>)}</div></div></div>
    </div></section>

    <section id="about" style={{...container,paddingTop:70}}><h2 style={{fontSize:38}}>Une société pensée pour durer</h2><p style={{color:'#cfcfcf',fontSize:17,lineHeight:1.8,maxWidth:900}}>Le site est structuré pour refléter une entreprise expérimentée : gouvernance, conformité, documentation, présence internationale, relation investisseurs et crédibilité commerciale.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14,marginTop:24}}>{meaning.map(([l,t,d])=><div key={l} style={{...card,padding:20}}><div style={{color:gold,fontSize:38,fontWeight:900}}>{l}</div><h3>{t}</h3><p style={{color:'#bbb',lineHeight:1.6}}>{d}</p></div>)}</div></section>

    <section id="services" style={{...container,paddingTop:70}}><h2 style={{fontSize:38}}>Services & expertises</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:18}}>{services.map(([t,d])=><div key={t} style={{...card,padding:24}}><h3 style={{color:gold}}>{t}</h3><p style={{color:'#bbb',lineHeight:1.7}}>{d}</p><a href="#contact" style={{color:gold,textDecoration:'none',fontWeight:800}}>Demander une consultation →</a></div>)}</div></section>

    <section id="prices" style={{...container,paddingTop:70}}><div style={{...card,padding:26}}><h2 style={{color:gold,margin:0}}>Cours de l’or indicatif</h2><p style={{color:'#aaa'}}>Widget visible pour USD, EUR, GBP, CNY, GNF et XOF.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:14,marginTop:20}}>{['USD','EUR','GBP','CNY','GNF','XOF'].map(c=><div key={c} style={{background:'rgba(0,0,0,.34)',border:'1px solid rgba(212,175,55,.18)',borderRadius:18,padding:18}}><small style={{color:'#999'}}>{c}</small><div style={{fontWeight:900,fontSize:20,marginTop:8}}>{fmt(c,prices[c])}</div></div>)}</div></div></section>

    <section id="compliance" style={{...container,paddingTop:70}}><div style={{...card,padding:30,background:'linear-gradient(135deg,rgba(212,175,55,.14),rgba(255,255,255,.035))'}}><h2 style={{color:gold}}>Compliance, sécurité & gouvernance</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>{['KYC/AML partenaires','Traçabilité documentaire','Sécurité des transactions','Reporting institutionnel'].map(x=><p key={x} style={{color:'#ddd',lineHeight:1.7}}>✓ {x}</p>)}</div></div></section>

    <section id="investors" style={{...container,paddingTop:70}}><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24,alignItems:'start'}}><div><h2 style={{fontSize:38}}>Espace investisseurs & partenaires</h2><p style={{color:'#cfcfcf',lineHeight:1.8}}>Déposez une demande qualifiée. Le système attribue automatiquement un score commercial pour prioriser les opportunités HOT/WARM/COLD.</p></div><form onSubmit={submitLead} style={{...card,padding:24,display:'grid',gap:12}}>{[['name','Nom complet'],['company','Société'],['email','Email'],['phone','Téléphone / WhatsApp'],['country','Pays'],['investment_range','Capacité ou besoin estimé'],['need','Votre besoin']].map(([k,p])=><input key={k} value={(lead as any)[k]} onChange={e=>setLead({...lead,[k]:e.target.value})} placeholder={p} required={['name','email','need'].includes(k)} style={{background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.14)',color:'#fff',borderRadius:14,padding:14,outline:'none'}}/>)}<button style={{...button,borderRadius:14}}>Envoyer la demande</button>{leadStatus&&<p style={{color:gold}}>{leadStatus}</p>}</form></div></section>

    <section id="contact" style={{...container,paddingTop:70,paddingBottom:90}}><div style={{...card,padding:28,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20}}><div><h2 style={{color:gold}}>Contact corporate</h2><p style={{color:'#ccc',lineHeight:1.7}}>Montréal • Conakry • Dubaï • Genève</p></div><div><p>Email : contact@kamogui.com</p><p>Partenariats : investors@kamogui.com</p><a href="mailto:contact@kamogui.com" style={button}>Écrire à KAMOGUI</a></div></div></section>

    <button onClick={()=>setChatOpen(!chatOpen)} style={{position:'fixed',right:22,bottom:22,zIndex:50,...button,boxShadow:'0 18px 45px rgba(0,0,0,.45)'}}>{chatOpen?'Fermer':'Gold Autonome'}</button>
    {chatOpen&&<div style={{position:'fixed',right:22,bottom:84,zIndex:49,width:'min(420px,calc(100vw - 44px))',...card,padding:18,background:'#101010'}}><h3 style={{color:gold,marginTop:0}}>Gold Autonome</h3><div style={{height:310,overflowY:'auto',background:'rgba(0,0,0,.36)',borderRadius:16,padding:12,display:'flex',flexDirection:'column',gap:10}}>{messages.map((m,i)=><div key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start',maxWidth:'88%',background:m.role==='user'?gold:'rgba(255,255,255,.09)',color:m.role==='user'?'#050505':'#fff',padding:'10px 12px',borderRadius:14,lineHeight:1.45,fontSize:14}}>{m.content}</div>)}{loading&&<small style={{color:gold}}>Analyse en cours...</small>}</div><div style={{display:'flex',gap:8,marginTop:12}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Question confidentielle..." style={{flex:1,background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.14)',color:'#fff',borderRadius:12,padding:12}}/><button onClick={sendMessage} style={{...button,borderRadius:12,padding:'12px 14px'}}>OK</button></div></div>}
  </main>
}
