import { useState } from 'react'
import Layout from '../components/Layout'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'

export default function Simulateur(){
  const [amount,setAmount]=useState(100000)
  const [result,setResult]=useState<any>(null)
  async function simulate(){const r=await fetch(`${API_URL}/api/ai/simulate`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount})});setResult(await r.json())}
  return <Layout><section className="pageHero"><div className="container"><h1>Simulateur investissement or</h1></div></section><section className="content"><div className="container"><input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="input"/><button className="btn btnGold" onClick={simulate}>Simuler</button>{result&&<div className="card"><p>Scénario +5% : {result.scenario_up}</p><p>Scénario -5% : {result.scenario_down}</p></div>}</div></section></Layout>
}
