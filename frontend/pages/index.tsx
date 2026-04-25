import { useEffect, useState } from 'react'

type Message = { role: 'assistant' | 'user'; content: string }
type GoldPrices = Record<string, number | null>

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: 'Inter, Arial, sans-serif' },
  container: { maxWidth: 1240, margin: '0 auto', padding: '0 24px' },
  goldText: { color: '#D4AF37' },
  card: { background: 'linear-gradient(145deg, rgba(255,255,255,.075), rgba(255,255,255,.025))', border: '1px solid rgba(212,175,55,.22)', borderRadius: 28, boxShadow: '0 30px 90px rgba(0,0,0,.42)' },
  pill: { border: '1px solid rgba(212,175,55,.35)', borderRadius: 999, padding: '9px 14px', color: '#D4AF37', fontSize: 12, letterSpacing: 1.8, textTransform: 'uppercase' },
  button: { background: 'linear-gradient(135deg,#D4AF37,#f6db8b)', color: '#050505', borderRadius: 999, padding: '15px 22px', fontWeight: 900, textDecoration: 'none', border: 0, cursor: 'pointer' },
  ghostButton: { border: '1px solid rgba(212,175,55,.55)', color: '#D4AF37', borderRadius: 999, padding: '15px 22px', fontWeight: 800, textDecoration: 'none', background: 'rgba(212,175,55,.04)' }
}

const meaning = [
  ['K', 'Knowledge', 'Maîtrise des marchés internationaux des matières premières.'],
  ['A', 'Alliance', 'Partenariats stratégiques producteurs, investisseurs et institutions.'],
  ['M', 'Market', 'Accès structuré aux marchés internationaux de l’or.'],
  ['O', 'Opportunity', 'Opportunités économiques minières et financières.'],
  ['G', 'Growth', 'Développement, expansion et scalabilité.'],
  ['U', 'Unity', 'Coordination de toute la chaîne d’approvisionnement.'],
  ['I', 'Integrity', 'Transparence, conformité et traçabilité.']
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjour, je suis Gold Autonome. Je peux répondre aux investisseurs, expliquer la traçabilité, la conformité KYC/AML, l’exportation et les opportunités liées à KAMOGUI.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [prices, setPrices] = useState<GoldPrices>({})

  useEffect(() => {
    fetch(`${API_URL}/api/gold`).then(r => r.json()).then(setPrices).catch(() => setPrices({}))
  }, [])

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMessage = input.trim()
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: userMessage }])
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMessage })
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'Réponse indisponible pour le moment.' }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Gold Autonome ne peut pas joindre le backend. Vérifie Render et NEXT_PUBLIC_API_URL.' }])
    } finally { setLoading(false) }
  }

  const formatMoney = (code: string, value: number | null | undefined) => {
    if (!value) return 'Chargement'
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value) + ' ' + code
  }

  return (
    <main style={styles.page}>
      <section style={{ background: 'radial-gradient(circle at 70% 10%, rgba(212,175,55,.20), transparent 32%), linear-gradient(135deg,#090909 0%,#070603 48%,#000 100%)', borderBottom: '1px solid rgba(212,175,55,.18)' }}>
        <div style={{ ...styles.container, paddingTop: 32, paddingBottom: 78 }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 58, height: 58, borderRadius: '50%', border: '1px solid #D4AF37', display: 'grid', placeItems: 'center', color: '#D4AF37', fontWeight: 900, fontSize: 28 }}>K</div>
              <div><div style={{ color: '#D4AF37', fontWeight: 900, letterSpacing: 4, fontSize: 22 }}>KAMOGUI</div><div style={{ color: '#aaa', letterSpacing: 5, fontSize: 10 }}>INTERNATIONAL GOLD</div></div>
            </div>
            <div style={{ display: 'flex', gap: 22, color: '#e8e8e8', fontSize: 14, flexWrap: 'wrap' }}>
              <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a><a href="#prices" style={{ color: 'inherit', textDecoration: 'none' }}>Cours de l’or</a><a href="#compliance" style={{ color: 'inherit', textDecoration: 'none' }}>Compliance</a><a href="#gold-autonome" style={{ color: 'inherit', textDecoration: 'none' }}>Gold Autonome</a>
            </div>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))', gap: 44, alignItems: 'center' }}>
            <div>
              <span style={styles.pill}>Approvisionnement • Traçabilité • Exportation</span>
              <h1 style={{ fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: .95, letterSpacing: -2, margin: '26px 0 22px' }}>Global Gold.<br/>Verified Supply.<br/><span style={styles.goldText}>Trusted Capital.</span></h1>
              <p style={{ color: '#cfcfcf', fontSize: 18, lineHeight: 1.75, maxWidth: 640 }}>Plateforme internationale premium pour structurer les opérations aurifères, rassurer les banques, sécuriser les investisseurs et démontrer une chaîne d’approvisionnement conforme.</p>
              <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}><a href="#gold-autonome" style={styles.button}>Parler à Gold Autonome</a><a href="#investors" style={styles.ghostButton}>Demander le dossier investisseur</a></div>
            </div>
            <div style={{ ...styles.card, padding: 26, minHeight: 450, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 35%, rgba(212,175,55,.32), transparent 28%)' }} />
              <div style={{ position: 'relative', height: 390, borderRadius: 24, background: 'linear-gradient(145deg,#101010,#050505)', border: '1px solid rgba(212,175,55,.18)', padding: 26 }}>
                <div style={{ fontSize: 72, color: '#D4AF37', fontWeight: 900 }}>K</div>
                <h2 style={{ fontSize: 28, margin: '6px 0', letterSpacing: 1 }}>Institutional Gold Desk</h2>
                <p style={{ color: '#bfbfbf', lineHeight: 1.7 }}>Présence internationale : Montréal, Conakry, Dubaï, Genève. Conformité KYC/AML, sécurité transactions, traçabilité 100% et gouvernance durable.</p>
                <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {['KYC / AML', 'Traceability', 'Export Desk', 'Investor Ready'].map(x => <div key={x} style={{ background: 'rgba(212,175,55,.08)', border: '1px solid rgba(212,175,55,.22)', borderRadius: 16, padding: 14, color: '#f3d778', fontWeight: 700 }}>{x}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prices" style={{ ...styles.container, paddingTop: 48 }}>
        <div style={{ ...styles.card, padding: 24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, flexWrap:'wrap' }}><div><h2 style={{ margin:0, color:'#D4AF37' }}>Cours de l’or en temps réel</h2><p style={{ color:'#aaa', margin:'8px 0 0' }}>Prix spot indicatif par once, converti dans les principales devises.</p></div><span style={{ ...styles.pill, textTransform:'none' }}>Live market widget</span></div>
          <div style={{ marginTop:22, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:14 }}>
            {['USD','EUR','GBP','CNY','GNF','XOF'].map(code => <div key={code} style={{ background:'rgba(0,0,0,.32)', border:'1px solid rgba(212,175,55,.18)', borderRadius:18, padding:18 }}><div style={{ color:'#999', fontSize:12 }}>{code}</div><div style={{ color:'#fff', fontSize:20, fontWeight:900, marginTop:8 }}>{formatMoney(code, prices[code])}</div></div>)}
          </div>
        </div>
      </section>

      <section id="services" style={{ ...styles.container, paddingTop: 54 }}>
        <h2 style={{ fontSize: 38, marginBottom: 18 }}>Services premium</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
          {['Gold Sourcing', 'Supply Chain Traceability', 'Export & Logistics', 'Investment Opportunities', 'Commodity Trading'].map((item) => <div key={item} style={{ ...styles.card, padding: 24 }}><h3 style={{ color: '#D4AF37' }}>{item}</h3><p style={{ color: '#bbb', lineHeight: 1.7 }}>Process structuré, documents vérifiables, reporting et accompagnement institutionnel.</p></div>)}
        </div>
      </section>

      <section id="meaning" style={{ ...styles.container, paddingTop: 64 }}>
        <h2 style={{ fontSize: 38 }}>KAMOGUI, letter by letter</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:14 }}>
          {meaning.map(([letter,title,desc]) => <div key={letter} style={{ ...styles.card, padding:20 }}><div style={{ color:'#D4AF37', fontSize:36, fontWeight:900 }}>{letter}</div><h3>{title}</h3><p style={{ color:'#bbb', lineHeight:1.6 }}>{desc}</p></div>)}
        </div>
      </section>

      <section id="compliance" style={{ ...styles.container, paddingTop:64 }}>
        <div style={{ ...styles.card, padding:30, background:'linear-gradient(135deg,rgba(212,175,55,.14),rgba(255,255,255,.035))' }}><h2 style={{ color:'#D4AF37' }}>Compliance, sécurité & gouvernance</h2><p style={{ color:'#ddd', fontSize:17, lineHeight:1.8 }}>KYC, AML, audit des partenaires, traçabilité des opérations, documentation export, contrôle de provenance et sécurité transactionnelle pour un niveau de confiance compatible banques, fonds et institutions.</p></div>
      </section>

      <section id="gold-autonome" style={{ ...styles.container, paddingTop:64, paddingBottom:80 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(330px,1fr))', gap:24 }}>
          <div><span style={styles.pill}>AI Investment Assistant</span><h2 style={{ fontSize:42, margin:'22px 0 12px' }}>Gold Autonome</h2><p style={{ color:'#c9c9c9', lineHeight:1.8, fontSize:17 }}>Un assistant IA dédié aux investisseurs : analyse d’opportunité, explication conformité, simulation commerciale et préparation à l’échange avec l’équipe KAMOGUI.</p></div>
          <div style={{ ...styles.card, padding:22 }}>
            <div style={{ height:360, overflowY:'auto', background:'rgba(0,0,0,.42)', borderRadius:18, padding:14, display:'flex', flexDirection:'column', gap:12 }}>
              {messages.map((m,i)=><div key={i} style={{ alignSelf:m.role==='user'?'flex-end':'flex-start', maxWidth:'88%', background:m.role==='user'?'#D4AF37':'rgba(255,255,255,.09)', color:m.role==='user'?'#050505':'#fff', padding:'12px 14px', borderRadius:16, lineHeight:1.5, fontSize:14 }}>{m.content}</div>)}
              {loading && <div style={{ color:'#D4AF37' }}>Gold Autonome analyse...</div>}
            </div>
            <div style={{ display:'flex', gap:10, marginTop:14 }}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Pose une question investisseur..." style={{ flex:1, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', color:'#fff', borderRadius:14, padding:'14px 12px', outline:'none' }} /><button onClick={sendMessage} disabled={loading} style={{ ...styles.button, borderRadius:14 }}>Envoyer</button></div>
          </div>
        </div>
      </section>
    </main>
  )
}
