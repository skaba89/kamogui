import { useState } from "react"
import Layout from "../components/Layout"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kamogui.onrender.com"

export default function Simulateur() {
  const [amount, setAmount] = useState(10000)
  const [result, setResult] = useState<any>(null)

  async function simulate() {
    const res = await fetch(API_URL + "/api/ai/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, variation_pct: 5 }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <Layout>
      <div className="container">
        <h1>Simulateur investissement or</h1>

        <input
          className="input"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button className="btn btnGold" onClick={simulate}>
          Simuler
        </button>

        {result && (
          <div>
            <p>Haut : {result.scenario_up}</p>
            <p>Bas : {result.scenario_down}</p>
          </div>
        )}
      </div>
    </Layout>
  )
}