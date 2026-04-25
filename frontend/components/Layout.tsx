import Link from "next/link"
import { ReactNode } from "react"
import { continents } from "../data/locations"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* 🔝 TOP BAR */}
      <div className="topbar">
        <div className="container">
          <span>
            📍 Afrique · Europe · Amérique · Moyen-Orient · Asie
          </span>
          <span>
            ☎ +1 (514) 123-4567 &nbsp; ✉ contact@kamogui.com
          </span>
        </div>
      </div>

      {/* 🧭 NAVIGATION */}
      <header className="nav">
        <div className="container navin">

          {/* LOGO */}
          <Link href="/" className="brand">
            <img
              src="/logo-gold-officiel.png"
              alt="KAMOGUI International Gold"
              style={{ height: 60 }}
            />
          </Link>

          {/* MENU */}
          <nav className="menu">

            <Link href="/">Accueil</Link>
            <Link href="/about">À propos</Link>
            <Link href="/services">Services</Link>
            <Link href="/markets">Marchés</Link>
            <Link href="/compliance">Conformité</Link>

            {/* 🔥 DROPDOWN PLATEFORME */}
            <div className="dropdown">
              <span>Plateforme ▾</span>
              <div className="dropdownMenu">
                <Link href="/gold-autonome-v3">Gold Autonome IA</Link>
                <Link href="/simulateur">Simulateur</Link>
                <Link href="/investor-dashboard">Dashboard</Link>
                <Link href="/documents">Documents IA</Link>
                <Link href="/admin">CRM Admin</Link>
              </div>
            </div>

            <Link href="/investors">Investisseurs</Link>
            <Link href="/contact">Contact</Link>

            {/* CTA */}
            <Link href="/investors" className="cta">
              Demander un appel
            </Link>

          </nav>
        </div>
      </header>

      {/* 📦 CONTENU */}
      {children}

      {/* 🧾 FOOTER */}
      <footer className="footerPremium">
        <div className="container footerGrid">

          {/* COLONNE 1 */}
          <div>
            <Link href="/" className="brand">
              <img
                src="/logo-gold-officiel.png"
                alt="KAMOGUI International Gold"
                style={{ height: 60 }}
              />
            </Link>

            <p className="muted">
              Approvisionnement responsable, traçabilité, conformité
              et exportation d’or physique vers les marchés internationaux.
            </p>

            <div className="cityTags">
              {continents.map((c) => (
                <Link key={c.slug} href={`/continents/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* COLONNE 2 */}
          <div>
            <h3 style={{ color: "#D4AF37" }}>Contact corporate</h3>
            <p className="muted">
              contact@kamogui.com <br />
              investors@kamogui.com <br />
              +1 (514) 123-4567
            </p>

            <a className="btn btnGold" href="mailto:contact@kamogui.com">
              Écrire à KAMOGUI
            </a>
          </div>

          {/* COLONNE 3 */}
          <div>
            <h3 style={{ color: "#D4AF37" }}>Accès rapides</h3>
            <p className="muted">
              <Link href="/services">Services</Link> <br />
              <Link href="/markets">Cours de l’or</Link> <br />
              <Link href="/compliance">Conformité</Link> <br />
              <Link href="/investors">Espace investisseurs</Link>
            </p>
          </div>
        </div>

        {/* BAS FOOTER */}
        <div className="container footerBottom">
          <span>© KAMOGUI International Gold — Tous droits réservés</span>
          <span>Confidentialité · Conformité · Sécurité</span>
        </div>
      </footer>
    </>
  )
}