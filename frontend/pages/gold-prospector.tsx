import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function GoldProspector(){
  const [query,setQuery]=useState('')
  const [results,setResults]=useState<any[]>([])
  const [loading,setLoading]=useState(false)

  async function search(){
    setLoading(true)
    const res = await fetch(`${API}/api/gold-prospector/search`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({query})
    })
    const data = await res.json()
    setResults(data.prospects || [])
    setLoading(false)
  }

  return (
    <div className="container">
      <h1 className="sectionTitle">Gold Prospector</h1>
      <p className="muted">Trouvez des prospects qualifiés dans le marché de l’or</p>

      <div style={{display:'flex',gap:10,marginTop:20}}>
        <input className="input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Acheteur d'or Paris" />
        <button className="btn btnGold" onClick={search}>Rechercher</button>
      </div>

      {loading && <p>Chargement...</p>}

      <div className="grid" style={{marginTop:30}}>
        {results.map((p,i)=> (
          <div key={i} className="card">
            <h3>{p.name}</h3>
            <a href={p.url} target="_blank">Voir site</a>

            <div className="metric">{p.gold_score}/10</div>
            <p>Trust: {p.trust.trust_level}</p>

            {p.emails?.length > 0 && (
              <div>
                <strong>Emails:</strong>
                {p.emails.map((e:any,idx:number)=> (
                  <div key={idx}>{e}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
