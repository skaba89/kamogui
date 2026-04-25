import Head from 'next/head'
import { useEffect, useState } from 'react'

type Prices = Record<string, number | null>
type Msg = { role: 'assistant' | 'user'; content: string }

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'
const gold = '#D4AF37'

const money = ['USD', 'EUR', 'GBP', 'CNY', 'GNF', 'XOF']
const services = [
  ['Approvisionnement responsable', 'Sélection de flux aurifères qualifiés, contrôles documentaires, identification des contreparties et préparation des dossiers de transaction.'],
  ['Traçabilité & conformité', 'KYC, AML, contrôle de provenance, audit trail et documentation structurée pour partenaires bancaires et institutionnels.'],
  ['Exportation & logistique', 'Coordination export, suivi opérationnel, documentation douanière et reporting exécutif vers les parties prenantes.'],
  ['Relations investisseurs', 'Qualification des opportunités, préparation du dossier corporate et accompagnement des échanges partenaires.']
]
const processSteps = ['Sourcing qualifié', 'Audit documentaire', 'Validation KYC/AML', 'Structuration transaction', 'Export & reporting']

export default function Home() {
  const [prices, setPrices] = useState<Prices>({})
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: 'Bonjour, je suis Gold Autonome. Je peux vous orienter sur la conformité, la traçabilité, l’investissement et les partenariats KAMOGUI.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [lead, setLead] = useState({ name: '', company: '', email: '', phone: '', country: '', investment_range: '', need: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/api/gold`).then(r => r.json()).then(setPrices).catch(() => setPrices({}))
  }, [])

  const fmt = (code: string, val: any) => val ? new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(val) : '—'

  async function sendMessage() {
    if (!input.trim() || loading) return
    const text = input.trim()
    setInput('')
    setMessages(m => [...m, { role: 'user', content: text }])
    setLoading(true)
    try {
      const r = await fetch(`${API_URL}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) })
      const d = await r.json()
      setMessages(m => [...m, { role: 'assistant', content: d.reply || 'Réponse indisponible pour le moment.' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Connexion backend indisponible. Vérifiez Render et NEXT_PUBLIC_API_URL.' }])
    } finally { setLoading(false) }
  }

  async function submitLead(e: any) {
    e.preventDefault()
    setStatus('Envoi en cours...')
    try {
      const r = await fetch(`${API_URL}/api/investor-lead`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
      const d = await r.json()
      setStatus(`Demande reçue. Priorité commerciale : ${d.lead?.level || 'WARM'} (${d.lead?.score || 0}/100).`)
    } catch {
      setStatus('Demande préparée. Backend indisponible : contactez contact@kamogui.com.')
    }
  }

  return <>
    <Head>
      <title>KAMOGUI International Gold | Approvisionnement, Traçabilité & Exportation</title>
      <meta name="description" content="KAMOGUI International Gold - plateforme corporate d'approvisionnement responsable, traçabilité, conformité et exportation d'or." />
      <link rel="icon" href="/favicon.svg" />
    </Head>
    <main>
      <style jsx global>{`
        *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:#050505;color:#fff;font-family:Inter,Arial,sans-serif} a{color:inherit}
        .container{max-width:1280px;margin:0 auto;padding:0 28px}.topbar{height:40px;background:#030303;border-bottom:1px solid rgba(212,175,55,.13);display:flex;align-items:center;color:#cfcfcf;font-size:13px}.nav{position:sticky;top:0;z-index:30;background:rgba(5,5,5,.84);backdrop-filter:blur(18px);border-bottom:1px solid rgba(212,175,55,.16)}.navin{height:88px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:flex;gap:14px;align-items:center;text-decoration:none}.brandmark{width:58px;height:58px;border-radius:16px;background:linear-gradient(145deg,#1a1203,#050505);border:1px solid rgba(212,175,55,.55);display:grid;place-items:center;color:${gold};font-family:Georgia,serif;font-size:34px;font-weight:800;box-shadow:0 0 35px rgba(212,175,55,.18)}.brandtitle{font-family:Georgia,serif;color:${gold};font-size:25px;letter-spacing:5px}.brandsub{font-size:10px;letter-spacing:5px;color:#aaa}.menu{display:flex;gap:30px;align-items:center;font-size:13px;letter-spacing:1.2px;text-transform:uppercase}.menu a{text-decoration:none;color:#eee}.menu a:hover{color:${gold}}.cta{border:1px solid rgba(212,175,55,.65);border-radius:6px;padding:14px 20px;color:${gold}!important;font-weight:800}.hero{min-height:760px;background:radial-gradient(circle at 68% 24%,rgba(212,175,55,.17),transparent 23%),linear-gradient(90deg,#050505 0%,#070707 45%,#120d04 100%);position:relative;overflow:hidden;border-bottom:1px solid rgba(212,175,55,.22)}.hero:before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(212,175,55,.33) 1px,transparent 1px);background-size:18px 18px;mask-image:radial-gradient(ellipse at 74% 35%,#000 0%,rgba(0,0,0,.8) 27%,transparent 56%);opacity:.7}.hero:after{content:"";position:absolute;right:3%;top:17%;width:48%;height:62%;background:linear-gradient(120deg,transparent 15%,rgba(212,175,55,.18) 16%,transparent 17%),linear-gradient(55deg,transparent 30%,rgba(212,175,55,.16) 31%,transparent 32%);border-radius:35px;opacity:.75}.heroin{position:relative;z-index:2;display:grid;grid-template-columns:1.03fr .97fr;gap:42px;align-items:center;padding:90px 28px 48px}.eyebrow{display:flex;gap:14px;align-items:center;color:${gold};font-size:13px;letter-spacing:2.8px;text-transform:uppercase}.eyebrow:before{content:"";width:54px;height:1px;background:${gold}}h1{font-family:Georgia,serif;font-size:clamp(52px,7vw,92px);line-height:.98;margin:26px 0 26px;letter-spacing:-2px}.lead{color:#d0d0d0;font-size:18px;line-height:1.85;max-width:620px}.buttons{display:flex;gap:16px;flex-wrap:wrap;margin-top:32px}.btn{display:inline-block;padding:16px 25px;border-radius:7px;text-decoration:none;font-weight:900;letter-spacing:.4px}.btnGold{background:linear-gradient(135deg,#b8892d,#f6d37a);color:#080808}.btnGhost{border:1px solid rgba(212,175,55,.62);color:#fff;background:rgba(0,0,0,.25)}.visual{position:relative;height:560px}.mapPanel{position:absolute;inset:0;border-radius:34px;background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.02));border:1px solid rgba(212,175,55,.18);box-shadow:0 40px 120px rgba(0,0,0,.65);overflow:hidden}.world{position:absolute;inset:26px;background:radial-gradient(circle at 48% 42%,rgba(212,175,55,.26),transparent 22%),radial-gradient(circle at 71% 39%,rgba(212,175,55,.22),transparent 18%),radial-gradient(circle at 39% 56%,rgba(212,175,55,.18),transparent 14%);filter:drop-shadow(0 0 22px rgba(212,175,55,.24));opacity:.82}.routes{position:absolute;inset:0;background:linear-gradient(34deg,transparent 42%,rgba(212,175,55,.32) 43%,transparent 44%),linear-gradient(150deg,transparent 34%,rgba(212,175,55,.22) 35%,transparent 36%),linear-gradient(10deg,transparent 58%,rgba(212,175,55,.22) 59%,transparent 60%)}.bar{position:absolute;right:65px;bottom:52px;width:138px;height:230px;border-radius:15px;transform:skew(-8deg) rotate(-9deg);background:linear-gradient(135deg,#6b4712,#f8d477 43%,#8a5a17 100%);box-shadow:0 28px 50px rgba(0,0,0,.55), inset 0 0 22px rgba(255,255,255,.25);display:grid;place-items:center;text-align:center;color:#2b1700;font-weight:900}.bar.two{right:180px;bottom:34px;transform:skew(-8deg) rotate(8deg);height:205px;opacity:.9}.priceStrip{position:relative;z-index:3;margin-top:-72px}.strip{background:rgba(8,8,8,.88);border:1px solid rgba(212,175,55,.35);border-radius:14px;padding:18px 26px;display:grid;grid-template-columns:1.4fr repeat(6,1fr);gap:18px;box-shadow:0 20px 70px rgba(0,0,0,.45)}.price small{display:block;color:#aaa;margin-bottom:8px}.price b{font-size:16px}.positive{color:#22c873;font-size:12px;margin-left:6px}.featureRow{margin-top:22px;display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:rgba(212,175,55,.18);border:1px solid rgba(212,175,55,.22);border-radius:14px;overflow:hidden}.feature{background:#0b0b0b;padding:22px;display:flex;gap:14px}.icon{font-size:28px;color:${gold}}section.content{padding:92px 0}.sectionTitle{font-family:Georgia,serif;font-size:43px;margin:0 0 20px}.muted{color:#bbb;line-height:1.8}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}.card{background:linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.025));border:1px solid rgba(212,175,55,.18);border-radius:24px;padding:26px;box-shadow:0 25px 80px rgba(0,0,0,.35)}.card h3{color:${gold}}.process{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}.step{position:relative}.stepnum{color:${gold};font-size:13px;letter-spacing:2px}.investor{background:linear-gradient(135deg,rgba(212,175,55,.14),rgba(255,255,255,.035));border:1px solid rgba(212,175,55,.25);border-radius:30px;padding:34px;display:grid;grid-template-columns:1fr 1fr;gap:28px}.form{display:grid;gap:12px}.input{width:100%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#fff;border-radius:12px;padding:14px;outline:none}.chatButton{position:fixed;right:22px;bottom:22px;z-index:80}.chatBox{position:fixed;right:22px;bottom:86px;z-index:79;width:min(430px,calc(100vw - 44px));background:#0e0e0e;border:1px solid rgba(212,175,55,.3);border-radius:22px;padding:18px;box-shadow:0 30px 90px rgba(0,0,0,.55)}.messages{height:310px;overflow:auto;background:rgba(0,0,0,.34);border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:10px}.msg{max-width:88%;padding:11px 13px;border-radius:14px;line-height:1.45;font-size:14px}.assistant{align-self:flex-start;background:rgba(255,255,255,.09)}.user{align-self:flex-end;background:${gold};color:#050505}.footer{border-top:1px solid rgba(212,175,55,.18);padding:34px 0;color:#aaa;background:#030303}@media(max-width:900px){.topbar{display:none}.navin{height:auto;padding-top:18px;padding-bottom:18px;align-items:flex-start}.menu{gap:14px}.heroin,.investor{grid-template-columns:1fr}.visual{height:430px}.strip{grid-template-columns:1fr 1fr}.featureRow,.process{grid-template-columns:1fr}.hero{min-height:auto}h1{font-size:52px}}
      `}</style>

      <div className="topbar"><div className="container" style={{display:'flex',justifyContent:'space-between'}}><span>📍 Montréal, Canada · Conakry, Guinée · Dubaï, Émirats · Genève, Suisse</span><span>✉ contact@kamogui.com</span></div></div>
      <header className="nav"><div className="container navin"><a href="#home" className="brand"><span className="brandmark">K</span><span><span className="brandtitle">KAMOGUI</span><br/><span className="brandsub">INTERNATIONAL GOLD</span></span></a><nav className="menu"><a href="#home">Accueil</a><a href="#about">À propos</a><a href="#services">Services</a><a href="#markets">Marchés</a><a href="#compliance">Conformité</a><a href="#investors" className="cta">Investisseurs</a></nav></div></header>

      <section id="home" className="hero"><div className="container heroin"><div><p className="eyebrow">Plus de 30 ans d’excellence sectorielle</p><h1>L’OR.<br/>NOTRE EXPERTISE.<br/>VOTRE CONFIANCE.</h1><p className="lead">KAMOGUI International Gold est une plateforme corporate spécialisée dans l’approvisionnement responsable, la traçabilité, la conformité et l’exportation d’or physique vers les marchés internationaux.</p><div className="buttons"><a className="btn btnGold" href="#services">Découvrir nos services</a><a className="btn btnGhost" href="#investors">Espace investisseurs</a></div></div><div className="visual"><div className="mapPanel"><div className="world"/><div className="routes"/><div className="bar">KAMOGUI<br/>FINE GOLD<br/>999.9</div><div className="bar two">K<br/>GOLD<br/>1000g</div></div></div></div></section>

      <div id="markets" className="container priceStrip"><div className="strip"><div><b>COURS DE L’OR EN TEMPS RÉEL</b><br/><small style={{color:'#aaa'}}>Prix spot indicatif par once</small></div>{money.map(c=><div className="price" key={c}><small>{c}</small><b>{fmt(c,(prices as any)[c])}</b><span className="positive">+0.58%</span></div>)}</div><div className="featureRow">{['Présence internationale','Conformité totale','Traçabilité garantie','Performance & fiabilité','Partenariats durables'].map((x,i)=><div className="feature" key={x}><span className="icon">{['◎','◇','▣','▥','↔'][i]}</span><div><b>{x}</b><br/><small style={{color:'#aaa'}}>Standards corporate et reporting institutionnel</small></div></div>)}</div></div>

      <section id="about" className="content"><div className="container" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:42,alignItems:'center'}}><div><p className="eyebrow">À propos de KAMOGUI</p><h2 className="sectionTitle">Un héritage. Une vision. Un engagement.</h2><p className="muted">KAMOGUI est conçu pour inspirer confiance aux banques, fonds, investisseurs privés et partenaires miniers. Le positionnement repose sur la qualité des contreparties, la documentation, la conformité et la transparence opérationnelle.</p></div><div className="card"><h3>Signification KAMOGUI</h3><p className="muted"><b>K</b>nowledge · <b>A</b>lliance · <b>M</b>arket · <b>O</b>pportunity · <b>G</b>rowth · <b>U</b>nity · <b>I</b>ntegrity.</p></div></div></section>

      <section id="services" className="content" style={{paddingTop:0}}><div className="container"><h2 className="sectionTitle">Services corporate</h2><p className="muted" style={{maxWidth:850}}>Des services structurés pour transformer une opportunité aurifère en dossier crédible, contrôlable et exploitable par des partenaires institutionnels.</p><div className="grid" style={{marginTop:26}}>{services.map(([t,d])=><div className="card" key={t}><h3>{t}</h3><p className="muted">{d}</p><a href="#contact" style={{color:gold,textDecoration:'none',fontWeight:800}}>Demander une consultation →</a></div>)}</div></div></section>

      <section className="content" style={{paddingTop:0}}><div className="container"><h2 className="sectionTitle">Processus opérationnel</h2><div className="process">{processSteps.map((p,i)=><div className="card step" key={p}><div className="stepnum">0{i+1}</div><h3>{p}</h3><p className="muted">Contrôles, validation, documentation et suivi exécutif.</p></div>)}</div></div></section>

      <section id="compliance" className="content" style={{paddingTop:0}}><div className="container"><div className="card" style={{background:'linear-gradient(135deg,rgba(212,175,55,.14),rgba(255,255,255,.03))'}}><h2 className="sectionTitle" style={{color:gold}}>Conformité, sécurité & gouvernance</h2><div className="grid">{['KYC/AML partenaires','Contrôle de provenance','Traçabilité documentaire','Audit trail transactionnel','Reporting institutionnel','Sécurité des transactions'].map(x=><p className="muted" key={x}>✓ {x}</p>)}</div></div></div></section>

      <section id="investors" className="content" style={{paddingTop:0}}><div className="container"><div className="investor"><div><p className="eyebrow">Banques & investisseurs</p><h2 className="sectionTitle">Demander le dossier corporate</h2><p className="muted">Déposez une demande qualifiée. Le système priorise automatiquement les opportunités afin d’accélérer le traitement commercial.</p></div><form onSubmit={submitLead} className="form">{[['name','Nom complet'],['company','Société'],['email','Email'],['phone','Téléphone / WhatsApp'],['country','Pays'],['investment_range','Capacité / besoin estimé'],['need','Votre besoin']].map(([k,p])=><input key={k} className="input" placeholder={p} value={(lead as any)[k]} onChange={e=>setLead({...lead,[k]:e.target.value})} required={['name','email','need'].includes(k)}/>) }<button className="btn btnGold" type="submit">Envoyer la demande</button>{status&&<p style={{color:gold}}>{status}</p>}</form></div></div></section>

      <section id="contact" className="content" style={{paddingTop:0}}><div className="container"><div className="card" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:24}}><div><h2 style={{color:gold}}>Contact corporate</h2><p className="muted">Montréal · Conakry · Dubaï · Genève</p></div><div><p>contact@kamogui.com</p><p>investors@kamogui.com</p><a className="btn btnGold" href="mailto:contact@kamogui.com">Écrire à KAMOGUI</a></div></div></div></section>

      <footer className="footer"><div className="container">© KAMOGUI International Gold — Approvisionnement · Traçabilité · Exportation</div></footer>

      <button className="btn btnGold chatButton" onClick={()=>setChatOpen(!chatOpen)}>{chatOpen?'Fermer':'Gold Autonome'}</button>
      {chatOpen&&<div className="chatBox"><h3 style={{color:gold,marginTop:0}}>Gold Autonome</h3><div className="messages">{messages.map((m,i)=><div key={i} className={`msg ${m.role}`}>{m.content}</div>)}{loading&&<small style={{color:gold}}>Analyse en cours...</small>}</div><div style={{display:'flex',gap:8,marginTop:12}}><input className="input" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Question confidentielle..."/><button className="btn btnGold" onClick={sendMessage}>OK</button></div></div>}
    </main>
  </>
}