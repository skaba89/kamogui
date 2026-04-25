import { useState } from 'react'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'
export default function InvestorForm(){
 const [lead,setLead]=useState({name:'',company:'',email:'',phone:'',country:'',investment_range:'',need:''})
 const [status,setStatus]=useState('')
 async function submitLead(e:any){e.preventDefault();setStatus('Envoi en cours...');try{const r=await fetch(`${API_URL}/api/investor-lead`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead)});const d=await r.json();setStatus(`Demande reçue. Priorité commerciale : ${d.lead?.level || 'WARM'} (${d.lead?.score || 0}/100).`)}catch{setStatus('Demande préparée. Backend indisponible : contactez contact@kamogui.com.')}}
 return <form onSubmit={submitLead} className="form">{[['name','Nom complet'],['company','Société'],['email','Email'],['phone','Téléphone / WhatsApp'],['country','Pays'],['investment_range','Capacité / besoin estimé'],['need','Votre besoin']].map(([k,p])=><input key={k} className="input" placeholder={p} value={(lead as any)[k]} onChange={e=>setLead({...lead,[k]:e.target.value})} required={['name','email','need'].includes(k)}/>) }<button className="btn btnGold" type="submit">Envoyer la demande</button>{status&&<p style={{color:'#D4AF37'}}>{status}</p>}</form>
}
