import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
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
    <header className="nav">
      <div className="container navin">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="KAMOGUI" />
          <div className="brandMark">
            <span className="brandName">KAMOGUI</span>
            <span className="brandSub">Gold Intelligence</span>
          </div>
        </Link>
        <nav className="menu">
          <Link href="/">Accueil</Link>
          <Link href="/gold-prospector">Prospector</Link>
          <Link href="/crm">CRM</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href={isAuth ? '/dashboard' : '/login'} className="cta">{isAuth ? 'Mon espace' : 'Connexion'}</Link>
        </nav>
      </div>
    </header>
    {children}
    <ChatWidget />
  </>
}
