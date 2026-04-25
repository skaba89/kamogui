import { useEffect, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui-backend.onrender.com'
const money = ['USD','EUR','GBP','CNY','GNF','XOF']
const fallback: Record<string, number> = { USD: 2350.5, EUR: 2162.46, GBP: 1856.9, CNY: 16994.12, GNF: 20261410, XOF: 1418617.1 }

function fmt(c:string,v:number){try{return new Intl.NumberFormat('fr-FR',{style:'currency',currency:c,maximumFractionDigits:c==='GNF'||c==='XOF'?0:2}).format(v)}catch{return `${Math.round(v).toLocaleString('fr-FR')} ${c}`}}

export default function GoldPrices(){
  const [prices,setPrices]=useState<Record<string,number>>(fallback)
  const [updated,setUpdated]=useState('')
  const [source,setSource]=useState('chargement')
  useEffect(()=>{let stop=false; async function load(){try{const r=await fetch(`${API_URL}/api/market/gold`,{cache:'no-store'}); const d=await r.json(); if(!stop&&d.prices){setPrices(d.prices); setSource(d.source||'api'); setUpdated(new Date((d.updated_at||Date.now()/1000)*1000).toLocaleTimeString('fr-FR'))}}catch{setSource('fallback')}} load(); const id=setInterval(load,60000); return()=>{stop=true; clearInterval(id)}},[])
  return <div id="markets" className="container priceStrip"><div className="strip"><div className="priceTitle"><b>COURS DE L’OR EN TEMPS RÉEL</b><br/><small style={{color:'#aaa'}}>Prix spot indicatif par once · {source} {updated && `· ${updated}`}</small></div>{money.map(c=><div className="price" key={c}><small>{c}</small><b>{fmt(c,prices[c]||0)}</b><span className="positive">live</span></div>)}</div></div>
}
