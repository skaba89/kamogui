import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { continents } from '../data/locations'
import ChatWidget from './ChatWidget'

export default function Layout({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const readAuth = () => setIsAuth(!!(localStorage.getItem('kamogui_token') || localStorage.getItem('token')))
    readAuth()
    window.addEventListener('storage', readAuth)
    return () => window.removeEventListener('storage', readAuth)
  }, [])

  return <>
    <div className="topbar"><div className="container"><span>📍 Afrique · Europe · Amérique · Moyen-Orient · Asie</span><span>☎ +1 (514) 123-4567 &nbsp; ✉ contact@kamogui.com</span></div></div>
    <header className="nav"><div className="container navin"><Link href="/" className="brand"><img src="/logo-gold-officiel.png" alt="KAMOGUI International Gold" /></Link><nav className="menu">
      <Link href="/">Accueil</Link><Link href="/about">À propos</Link>
      <div className="dropdown"><Link href="/services">Services</Link><div className="dropdownMenu"><Link href="/services/gold-sourcing">Sourcing responsable</Link><Link href="/services/export-logistics">Export & logistique</Link><Link href="/services/compliance-kyc">Conformité KYC/AML</Link><Link href="/services/investment-advisory">Conseil investisseurs</Link></div></div>
      <Link href="/markets">Marchés</Link><Link href="/compliance">Conformité</Link><Link href="/simulateur">Simulateur</Link><Link href="/investors">Investisseurs</Link><Link href="/contact">Contact</Link>
      {isAuth && <div className="dropdown"><span className="menuLink">Espace compte</span><div className="dropdownMenu"><Link href="/investor-dashboard">Dashboard</Link><Link href="/documents">Documents</Link><Link href="/admin">Admin</Link></div></div>}
      <Link href={isAuth ? '/investor-dashboard' : '/login'} className="cta">{isAuth ? 'Mon espace' : 'Connexion'}</Link>
    </nav></div></header>
    {children}
    <footer className="footerPremium"><div className="container footerGrid"><div><Link href="/" className="brand"><img src="/logo-gold-officiel.png" alt="KAMOGUI International Gold" /></Link><p className="muted">Approvisionnement responsable, traçabilité, conformité et exportation d’or physique vers les marchés internationaux.</p><div className="cityTags">{continents.map(c=><Link key={c.slug} href={`/continents/${c.slug}`}>{c.name}</Link>)}</div></div><div><h3 style={{color:'#D4AF37'}}>Contact corporate</h3><p className="muted">contact@kamogui.com<br/>investors@kamogui.com<br/>+1 (514) 123-4567</p><a className="btn btnGold" href="mailto:contact@kamogui.com">Écrire à KAMOGUI</a></div><div><h3 style={{color:'#D4AF37'}}>Accès rapides</h3><p className="muted"><Link href="/services">Services</Link><br/><Link href="/markets">Cours de l’or</Link><br/><Link href="/simulateur">Simulateur</Link><br/><Link href="/compliance">Conformité</Link></p></div></div><div className="container footerBottom"><span>© KAMOGUI International Gold — Tous droits réservés</span><span>Confidentialité · Conformité · Sécurité</span></div></footer>
    <ChatWidget />
  </>
}
