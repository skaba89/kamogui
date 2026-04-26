import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import MetricCard from '../components/MetricCard'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

type AnalyticsData = {
  total_leads: number
  average_gold_score: number
  emails_found: number
  hot_leads: number
  by_status?: Record<string, number>
}

export default function Dashboard(){
  const [data,setData]=useState<AnalyticsData | null>(null)

  useEffect(()=>{
    fetch(`${API}/api/gold-prospector/analytics`)
      .then(res=>res.json())
      .then(setData)
  },[])

  if(!data) return <Layout><div className="container">Chargement...</div></Layout>

  const statusEntries = Object.entries(data.by_status || {}) as [string, number][]

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
        {statusEntries.length === 0 && <p className="muted">Aucun statut disponible.</p>}
        {statusEntries.map(([status,count])=>(
          <div key={status}>{status}: {count}</div>
        ))}
      </div>
    </section>
  </Layout>
}
