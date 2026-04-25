import { useState } from 'react'
import { useRouter } from 'next/router'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui-backend.onrender.com'

export default function Login(){
  const router = useRouter(); const [email,setEmail]=useState('investor@kamogui.com'); const [password,setPassword]=useState('kamogui-demo'); const [error,setError]=useState('')
  async function submit(e:any){e.preventDefault(); setError(''); try{const r=await fetch(`${API_URL}/api/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); const d=await r.json(); if(!r.ok) throw new Error(d.detail||'Erreur'); localStorage.setItem('kamogui_token',d.access_token); localStorage.setItem('kamogui_user',JSON.stringify(d.user)); router.push('/investor-dashboard')}catch(err:any){setError(err.message)}}
  return <><section className="pageHero"><div className="container"><p className="eyebrow">Accès sécurisé</p><h1>Connexion <span className="goldWord">KAMOGUI</span></h1><p className="lead">Accédez aux fonctions avancées de Gold Autonome, aux documents et au dashboard investisseur.</p></div></section><section className="content"><div className="container"><form className="card form authCard" onSubmit={submit}><h2>Compte investisseur</h2><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe"/><button className="btn btnGold">Se connecter</button>{error&&<p className="errorText">{error}</p>}<p className="muted">Démo : investor@kamogui.com / kamogui-demo</p></form></div></section></>
}
