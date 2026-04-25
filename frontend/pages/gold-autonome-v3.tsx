import { useState } from 'react'
import Layout from '../components/Layout'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'

export default function GoldAutonomeV3(){
  const [message,setMessage]=useState('Analyse un investisseur basé à Dubaï avec un budget de 500 000 USD pour de l’or physique.')
  const [reply,setReply]=useState('')
  const [loading,setLoading]=useState(false)
  async function ask(){setLoading(true);try{const r=await fetch(`${API_URL}/api/ai/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message})});const d=await r.json();setReply(d.reply||'Réponse indisponible.')}catch{setReply('Backend indisponible. Vérifiez Render et NEXT_PUBLIC_API_URL.')}finally{setLoading(false)}}
  return <Layout><section className="pageHero"><div className="container"><p className="eyebrow">Gold Autonome V3</p><h1>IA business pour investisseurs, conformité et closing</h1><p className="lead">Gold Autonome qualifie les prospects, analyse les opportunités, prépare les actions commerciales et accélère le passage du visiteur au lead qualifié.</p></div></section><section className="content"><div className="container grid"><div className="card"><h3>Capacités</h3><p className="muted">✓ Qualification investisseur<br/>✓ Scoring HOT / WARM / COLD<br/>✓ Analyse KYC / AML<br/>✓ Simulation d’exposition à l’or<br/>✓ Génération NDA / LOI / Term Sheet<br/>✓ Préparation des emails commerciaux</p></div><div className="card"><h3>Assistant IA</h3><textarea className="input" rows={7} value={message} onChange={e=>setMessage(e.target.value)} /><button className="btn btnGold" onClick={ask}>{loading?'Analyse en cours...':'Analyser avec Gold Autonome'}</button>{reply&&<p className="muted" style={{whiteSpace:'pre-wrap',marginTop:20}}>{reply}</p>}</div></div></section></Layout>
}