import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import MetricCard from '../components/MetricCard'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

type Lead = {
  name: string
  url: string
  emails?: string[]
  gold_score?: number
  trust?: { trust_level?: string; trust_score?: number }
}

export default function CRM(){
  const [leads,setLeads]=useState<Lead[]>([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    fetch(`${API}/api/gold-prospector/leads`)
      .then(res=>res.json())
      .then(data=>setLeads(Array.isArray(data)?data:[]))
      .finally(()=>setLoading(false))
  },[])

  const avg = leads.length ? Math.round(leads.reduce((s,l)=>s+(l.gold_score||0),0)/leads.length) : 0
  const emails = leads.reduce((s,l)=>s+(l.emails?.length||0),0)

  return <Layout>
    <section className="pageHero">
      <div className="container">
        <p className="eyebrow">Gold CRM</p>
        <h1>Pipeline commercial dédié au marché de l’or</h1>
        <p className="lead">Centralisez les prospects détectés, leurs scores, contacts et signaux de confiance.</p>
      </div>
    </section>
    <section className="content">
      <div className="container">
        <div className="grid">
          <MetricCard label="Leads" value={leads.length} hint="Prospects sauvegardés" />
          <MetricCard label="Score moyen" value={`${avg}/10`} hint="Potentiel gold" />
          <MetricCard label="Emails" value={emails} hint="Contacts extraits" />
        </div>
        {loading && <p className="muted">Chargement des leads...</p>}
        <div className="grid" style={{marginTop:28}}>
          {leads.map((lead,i)=><div className="card" key={`${lead.url}-${i}`}>
            <p className="eyebrowMini">Prospect #{i+1}</p>
            <h3>{lead.name}</h3>
            <p className="muted">Gold Score: <b>{lead.gold_score || 0}/10</b></p>
            <p className="muted">Trust: <b>{lead.trust?.trust_level || 'N/A'}</b></p>
            {lead.emails?.length ? <p className="muted">{lead.emails.join(', ')}</p> : <p className="muted">Aucun email détecté</p>}
            <a className="btn btnGhost" href={lead.url} target="_blank" rel="noreferrer">Ouvrir le site</a>
          </div>)}
        </div>
      </div>
    </section>
  </Layout>
}
