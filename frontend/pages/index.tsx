import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import GoldPrices from '../components/GoldPrices'
import GoldAutonome from '../components/GoldAutonome'
import InvestorForm from '../components/InvestorForm'

const services = [
  ['Approvisionnement responsable', 'Sélection de flux aurifères qualifiés, contrôles documentaires et préparation des dossiers de transaction.'],
  ['Traçabilité & conformité', 'KYC, AML, contrôle de provenance, audit trail et documentation bancaire structurée.'],
  ['Exportation & logistique', 'Coordination export, suivi opérationnel, documentation douanière et reporting exécutif.'],
  ['Relations investisseurs', 'Qualification des opportunités, préparation du dossier corporate et accompagnement des échanges partenaires.']
]
const processSteps = ['Sourcing qualifié', 'Audit documentaire', 'Validation KYC/AML', 'Structuration transaction', 'Export & reporting']

export default function Home() {
  return <>
    <Head><title>KAMOGUI International Gold | Approvisionnement, Traçabilité & Exportation</title><meta name="description" content="KAMOGUI International Gold - plateforme corporate d'approvisionnement responsable, traçabilité, conformité et exportation d'or." /></Head>
    <Layout>
      <section id="home" className="hero"><div className="container heroContent"><div><p className="eyebrow">Plus de 30 ans d’excellence</p><h1><span className="goldWord">L’OR.</span><br/>NOTRE EXPERTISE.<br/>VOTRE CONFIANCE.</h1><p className="lead">KAMOGUI International Gold est un groupe privé spécialisé dans l’approvisionnement responsable, la traçabilité et l’exportation d’or physique depuis l’Afrique vers les marchés internationaux.</p><div className="buttons"><Link className="btn btnGold" href="/services">Découvrir nos services</Link><Link className="btn btnGhost" href="/investors">Espace investisseurs</Link></div></div><div /></div></section>
      <GoldPrices />
      <div className="container"><div className="featureRow">{['Présence internationale','Conformité totale','Traçabilité garantie','Performance & fiabilité','Partenariats durables'].map((x,i)=><div className="feature" key={x}><span className="icon">{['◎','◇','▣','▥','↔'][i]}</span><div><b>{x}</b><br/><small style={{color:'#aaa'}}>Standards corporate et reporting institutionnel</small></div></div>)}</div></div>
      <section className="content"><div className="container" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:42,alignItems:'center'}}><div><p className="eyebrow">À propos de KAMOGUI</p><h2 className="sectionTitle">Un héritage. Une vision. Un engagement.</h2><p className="muted">KAMOGUI est conçu pour inspirer confiance aux banques, fonds, investisseurs privés et partenaires miniers. Le positionnement repose sur la qualité des contreparties, la documentation, la conformité et la transparence opérationnelle.</p></div><div className="card"><h3>Signification KAMOGUI</h3><p className="muted"><b>K</b>nowledge · <b>A</b>lliance · <b>M</b>arket · <b>O</b>pportunity · <b>G</b>rowth · <b>U</b>nity · <b>I</b>ntegrity.</p></div></div></section>
      <section className="content" style={{paddingTop:0}}><div className="container"><h2 className="sectionTitle">Services corporate</h2><p className="muted" style={{maxWidth:850}}>Des services structurés pour transformer une opportunité aurifère en dossier crédible, contrôlable et exploitable par des partenaires institutionnels.</p><div className="grid" style={{marginTop:26}}>{services.map(([t,d])=><div className="card" key={t}><h3>{t}</h3><p className="muted">{d}</p><Link href="/contact" style={{color:'#D4AF37',textDecoration:'none',fontWeight:800}}>Demander une consultation →</Link></div>)}</div></div></section>
      <section className="content" style={{paddingTop:0}}><div className="container"><h2 className="sectionTitle">Processus opérationnel</h2><div className="process">{processSteps.map((p,i)=><div className="card" key={p}><div className="stepnum">0{i+1}</div><h3>{p}</h3><p className="muted">Contrôles, validation, documentation et suivi exécutif.</p></div>)}</div></div></section>
      <section className="content" style={{paddingTop:0}}><div className="container"><div className="card" style={{background:'linear-gradient(135deg,rgba(212,175,55,.14),rgba(255,255,255,.03))'}}><h2 className="sectionTitle" style={{color:'#D4AF37'}}>Conformité, sécurité & gouvernance</h2><div className="grid">{['KYC/AML partenaires','Contrôle de provenance','Traçabilité documentaire','Audit trail transactionnel','Reporting institutionnel','Sécurité des transactions'].map(x=><p className="muted" key={x}>✓ {x}</p>)}</div></div></div></section>
      <section className="content" style={{paddingTop:0}}><div className="container"><div className="investor"><div><p className="eyebrow">Banques & investisseurs</p><h2 className="sectionTitle">Demander le dossier corporate</h2><p className="muted">Déposez une demande qualifiée. Le système priorise automatiquement les opportunités afin d’accélérer le traitement commercial.</p></div><InvestorForm /></div></div></section>
      <GoldAutonome />
    </Layout>
  </>
}
