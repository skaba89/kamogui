import Head from 'next/head'
import { useEffect, useState } from 'react'

const API_URL = 'https://kamogui.onrender.com'
const gold = '#D4AF37'

export default function Home(){
  const [prices,setPrices]=useState({})

  useEffect(()=>{
    fetch(API_URL+'/api/gold').then(r=>r.json()).then(setPrices)
  },[])

  return (
    <>
      <Head>
        <title>KAMOGUI International Gold</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main style={{background:'#050505',color:'#fff',fontFamily:'Inter, sans-serif'}}>

        <section style={{minHeight:'90vh',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'60px',background:'linear-gradient(135deg,#000,#0b0906)'}}>
          <div>
            <h1 style={{fontSize:'72px',lineHeight:1}}>L’OR.<br/>NOTRE EXPERTISE.<br/><span style={{color:gold}}>VOTRE CONFIANCE.</span></h1>
            <p style={{color:'#ccc',maxWidth:500}}>KAMOGUI est une plateforme internationale spécialisée dans l’approvisionnement, la traçabilité et l’exportation d’or physique.</p>
            <button style={{marginTop:20,background:gold,color:'#000',padding:'14px 20px',borderRadius:8}}>Espace Investisseurs</button>
          </div>

          <div style={{width:400,height:400,background:'radial-gradient(circle,#D4AF37 0%, transparent 60%)',opacity:0.3}} />
        </section>

        <section style={{padding:'40px 60px'}}>
          <h2 style={{color:gold}}>Cours de l’or</h2>
          <div style={{display:'flex',gap:20}}>
            {['USD','EUR','GNF','XOF'].map(c=>(
              <div key={c} style={{background:'#111',padding:20,borderRadius:10}}>
                <p>{c}</p>
                <strong>{prices[c]||'...'}</strong>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}
