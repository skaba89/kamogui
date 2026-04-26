import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import MetricCard from '../components/MetricCard'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Dashboard(){
  const [data,setData]=useState<any>(null)

  useEffect(()=>{
    fetch(`${API}/api/gold-prospector/analytics`)
      .then(res=>res.json())
      .then(setData)
  },[])

  if(!data) return <Layout><div className="container">Chargement...</div></Layout>

  return <Layout>
    <section className="container">
      <h1 className="sectionTitle">Analytics Dashboard</h1>
      <div className="grid">
        <MetricCard label="Leads" value={data.total_leads} />
        <MetricCard label="Score moyen" value={data.average_gold_score} />
        <MetricCard label="Emails" value={data.emails_found} />
        <MetricCard label="Hot Leads" value={data.hot_leads} />
      </div>

      <div className="card" style={{marginTop:30}}>
        <h3>Répartition par statut</h3>
        {Object.entries(data.by_status || {}).map(([k,v])=>(
          <div key={k}>{k}: {v}</div>
        ))}
      </div>
    </section>
  </Layout>
}
