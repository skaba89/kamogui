import { useMemo, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui-backend.onrender.com'

type Msg = { role: 'assistant' | 'user'; content: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Bonjour, je suis Gold Autonome. Je peux répondre aux questions publiques. Les documents, analyses avancées et dashboards sont réservés aux comptes connectés.' }
  ])

  const token = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem('kamogui_token') || localStorage.getItem('token') || ''
  }, [open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: text }])
    try {
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ message: text })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Réponse indisponible pour le moment.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Service IA temporairement indisponible. Merci de réessayer.' }])
    } finally {
      setLoading(false)
    }
  }

  return <>
    <button className="chatFab" onClick={() => setOpen(!open)} aria-label="Ouvrir Gold Autonome">✦ IA Gold</button>
    {open && <aside className="chatBox" aria-label="Gold Autonome">
      <div className="chatHead"><strong>Gold Autonome</strong><small>{token ? 'Compte connecté · fonctions avancées' : 'Mode public'}</small></div>
      <div className="messages">
        {messages.map((m,i)=><div key={i} className={`msg ${m.role}`}>{m.content}</div>)}
        {loading && <div className="msg assistant">Analyse en cours…</div>}
      </div>
      {!token && <div className="chatNotice">Connectez-vous pour générer des documents, accéder aux analyses avancées et au dashboard investisseur.</div>}
      <div className="chatInputRow">
        <input className="input" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') send()}} placeholder="Posez votre question…" />
        <button className="btn btnGold" onClick={send}>Envoyer</button>
      </div>
    </aside>}
  </>
}
