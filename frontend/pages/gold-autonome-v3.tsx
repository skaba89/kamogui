import { useState } from "react"
import Layout from "../components/Layout"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kamogui.onrender.com"

export default function GoldAutonome() {
  const [message, setMessage] = useState("")
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)

  async function ask() {
    setLoading(true)
    try {
      const res = await fetch(API_URL + "/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      setReply(data.reply)
    } catch {
      setReply("Erreur backend")
    }
    setLoading(false)
  }

  return (
    <Layout>
      <div className="container">
        <h1>Gold Autonome V3</h1>

        <textarea
          className="input"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Décris un investisseur ou une opportunité..."
        />

        <button className="btn btnGold" onClick={ask}>
          {loading ? "Analyse..." : "Analyser"}
        </button>

        {reply && <pre>{reply}</pre>}
      </div>
    </Layout>
  )
}