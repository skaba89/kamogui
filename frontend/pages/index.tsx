import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour, je suis Gold Autonome. Je peux répondre aux investisseurs, expliquer la traçabilité, la conformité et les opportunités liées à KAMOGUI.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: userMessage }])
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'Réponse indisponible pour le moment.' }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Impossible de contacter Gold Autonome. Vérifie NEXT_PUBLIC_API_URL et le backend Render.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #1f1605 0%, #0A0A0A 45%, #000 100%)', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 80 }}>
          <div style={{ color: '#D4AF37', fontWeight: 800, letterSpacing: 3, fontSize: 22 }}>KAMOGUI</div>
          <div style={{ display: 'flex', gap: 24, color: '#d9d9d9', fontSize: 14 }}>
            <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
            <a href="#compliance" style={{ color: 'inherit', textDecoration: 'none' }}>Compliance</a>
            <a href="#gold-autonome" style={{ color: 'inherit', textDecoration: 'none' }}>Gold Autonome</a>
          </div>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <p style={{ color: '#D4AF37', letterSpacing: 4, fontSize: 13, textTransform: 'uppercase' }}>International Gold Trading Platform</p>
            <h1 style={{ fontSize: 'clamp(42px, 7vw, 82px)', lineHeight: 1, margin: '18px 0', maxWidth: 760 }}>Global Gold. Trusted Network. Verified Supply.</h1>
            <p style={{ color: '#c9c9c9', fontSize: 18, lineHeight: 1.7, maxWidth: 620 }}>KAMOGUI connecte producteurs, investisseurs et institutions autour d’une chaîne d’approvisionnement aurifère premium, traçable et conforme.</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
              <a href="#gold-autonome" style={{ background: 'linear-gradient(135deg,#D4AF37,#f7d879)', color: '#090909', padding: '14px 22px', borderRadius: 999, fontWeight: 800, textDecoration: 'none' }}>Parler à Gold Autonome</a>
              <a href="mailto:contact@kamogui.com" style={{ border: '1px solid #D4AF37', color: '#D4AF37', padding: '14px 22px', borderRadius: 999, fontWeight: 700, textDecoration: 'none' }}>Devenir partenaire</a>
            </div>
          </div>

          <div id="gold-autonome" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(212,175,55,.35)', borderRadius: 28, padding: 22, boxShadow: '0 30px 90px rgba(0,0,0,.45)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h2 style={{ margin: 0, color: '#D4AF37' }}>Gold Autonome</h2>
                <p style={{ margin: '6px 0 0', color: '#aaa', fontSize: 13 }}>Assistant IA investisseurs & conformité</p>
              </div>
              <span style={{ background: '#143d21', color: '#9effb8', padding: '6px 10px', borderRadius: 999, fontSize: 12 }}>LIVE</span>
            </div>
            <div style={{ height: 360, overflowY: 'auto', background: 'rgba(0,0,0,.35)', borderRadius: 18, padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '86%', background: m.role === 'user' ? '#D4AF37' : 'rgba(255,255,255,.09)', color: m.role === 'user' ? '#050505' : '#f5f5f5', padding: '12px 14px', borderRadius: 16, lineHeight: 1.5, fontSize: 14 }}>
                  {m.content}
                </div>
              ))}
              {loading && <div style={{ color: '#D4AF37', fontSize: 13 }}>Gold Autonome analyse...</div>}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Pose une question sur l’or, la conformité, l’investissement..." style={{ flex: 1, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', borderRadius: 14, padding: '14px 12px', outline: 'none' }} />
              <button onClick={sendMessage} disabled={loading} style={{ background: '#D4AF37', color: '#050505', border: 0, borderRadius: 14, padding: '0 18px', fontWeight: 800, cursor: 'pointer' }}>Envoyer</button>
            </div>
          </div>
        </div>

        <section id="services" style={{ marginTop: 90, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          {['Gold Sourcing', 'Traceability', 'Export & Logistics', 'Investment Desk'].map((item) => (
            <div key={item} style={{ border: '1px solid rgba(212,175,55,.22)', borderRadius: 22, padding: 22, background: 'rgba(255,255,255,.04)' }}>
              <h3 style={{ color: '#D4AF37' }}>{item}</h3>
              <p style={{ color: '#bbb', lineHeight: 1.6 }}>Service premium pour structurer une chaîne de valeur aurifère fiable, transparente et institutionnelle.</p>
            </div>
          ))}
        </section>

        <section id="compliance" style={{ marginTop: 50, padding: 28, borderRadius: 24, background: 'linear-gradient(135deg, rgba(212,175,55,.16), rgba(255,255,255,.04))', border: '1px solid rgba(212,175,55,.25)' }}>
          <h2 style={{ color: '#D4AF37' }}>Compliance & Security</h2>
          <p style={{ color: '#ddd', lineHeight: 1.8 }}>KYC, AML, traçabilité, audit des opérations, gouvernance des partenaires et sécurisation des transactions pour rassurer banques, investisseurs et institutions.</p>
        </section>
      </section>
    </main>
  )
}
