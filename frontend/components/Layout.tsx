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
      <Link href="/">Accueil</Link>
      <Link href="/gold-prospector">Prospector</Link>
      <Link href="/crm">CRM</Link>
      <Link href="/markets">Cours de l’or</Link>
      <Link href="/simulateur">Simulateur</Link>
      {isAuth && <Link href="/dashboard">Dashboard</Link>}
      <Link href={isAuth ? '/dashboard' : '/login'} className="cta">{isAuth ? 'Mon espace' : 'Connexion'}</Link>
    </nav></div></header>
    {children}
    <footer className="footerPremium"><div className="container footerGrid"><div><Link href="/" className="brand"><img src="/logo-gold-officiel.png" alt="KAMOGUI International Gold" /></Link><p className="muted">Plateforme SaaS d’intelligence du marché de l’or.</p></div></div></footer>
    <ChatWidget />
  </>
}
