import Link from 'next/link'
import { ReactNode } from 'react'

const cities = ['Montréal', 'Conakry', 'Dubaï', 'Genève', 'Paris', 'Londres', 'Abidjan']

export default function Layout({ children }: { children: ReactNode }) {
  return <>
    <div className="topbar"><div className="container"><span>📍 Montréal · Conakry · Dubaï · Genève · Paris · Londres · Abidjan</span><span>☎ +1 (514) 123-4567 &nbsp; ✉ contact@kamogui.com</span></div></div>
    <header className="nav"><div className="container navin"><Link href="/" className="brand"><span className="brandmark">K</span><span><span className="brandtitle">KAMOGUI</span><br/><span className="brandsub">INTERNATIONAL GOLD</span></span></Link><nav className="menu"><Link href="/">Accueil</Link><Link href="/about">À propos</Link><Link href="/services">Services</Link><Link href="/markets">Marchés</Link><Link href="/compliance">Conformité</Link><Link href="/investors">Investisseurs</Link><Link href="/contact">Contact</Link><Link href="/investors" className="cta">Demander un appel</Link></nav></div></header>
    {children}
    <footer id="contact" className="footerPremium"><div className="container footerGrid"><div><Link href="/" className="brand"><span className="brandmark">K</span><span><span className="brandtitle">KAMOGUI</span><br/><span className="brandsub">INTERNATIONAL GOLD</span></span></Link><p className="muted">Approvisionnement responsable, traçabilité, conformité et exportation d’or physique vers les marchés internationaux.</p><div className="cityTags">{cities.map(c=><span key={c}>{c}</span>)}</div></div><div><h3 style={{color:'#D4AF37'}}>Contact corporate</h3><p className="muted">contact@kamogui.com<br/>investors@kamogui.com<br/>+1 (514) 123-4567</p><a className="btn btnGold" href="mailto:contact@kamogui.com">Écrire à KAMOGUI</a></div><div><h3 style={{color:'#D4AF37'}}>Accès rapides</h3><p className="muted"><Link href="/services">Services</Link><br/><Link href="/markets">Cours de l’or</Link><br/><Link href="/compliance">Conformité</Link><br/><Link href="/investors">Espace investisseurs</Link></p></div></div><div className="container footerBottom"><span>© KAMOGUI International Gold — Tous droits réservés</span><span>Confidentialité · Conformité · Sécurité</span></div></footer>
  </>
}
