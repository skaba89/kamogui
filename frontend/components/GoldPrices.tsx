import { useEffect, useState } from 'react'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'
const money = ['USD','EUR','GBP','CNY','GNF','XOF']
export default function GoldPrices(){
 const [prices,setPrices]=useState<any>({})
 useEffect(()=>{fetch(`${API_URL}/api/gold`).then(r=>r.json()).then(setPrices).catch(()=>setPrices({}))},[])
 const fmt=(c:string,v:any)=>v?new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(v):'—'
 return <div id="markets" className="container priceStrip"><div className="strip"><div><b>COURS DE L’OR EN TEMPS RÉEL</b><br/><small style={{color:'#aaa'}}>Prix spot indicatif par once</small></div>{money.map(c=><div className="price" key={c}><small>{c}</small><b>{fmt(c,prices[c])}</b><span className="positive">+0.58%</span></div>)}</div></div>
}
