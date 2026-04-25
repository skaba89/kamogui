import { useState } from 'react'
import Layout from '../components/Layout'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'

export default function Simulateur(){
  const [amount,setAmount]=useState(10000)
  const [result,setResult]=useState<any>(null)

  async function simulate(){
    const r = await fetch(`${API_URL}/api/ai/simulate`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ amount, variation_pct: 5 })
    })
    const d = await r.json()
    setResult(d)
  }

  return (
    <Layout>
      <div className="container" style={{padding:80}}>
        <h1>Simulateur investissement or</h1>

        <input
          type="number"
          value={amount}
          onChange={e=>setAmount(Number(e.target.value))}
          className="input"
        />

        <button onClick={simulate} className="btn btnGold">
          Simuler
        </button>

        {result && (
          <div>
            <p>📈 Scénario haut: {result.scenario_up}</p>
            <p>📉 Scénario bas: {result.scenario_down}</p>
          </div>
        )}
      </div>
    </Layout>
  )
}