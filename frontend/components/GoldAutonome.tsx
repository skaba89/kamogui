import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'

export default function GoldAutonome(){
 const [chatOpen,setChatOpen]=useState(false)
 const [input,setInput]=useState('')
 const [loading,setLoading]=useState(false)

 const [messages,setMessages]=useState<any[]>([
   {
     role:'assistant',
     content:`Bonjour, je suis Aurum Advisor.

Je peux vous accompagner sur :

• Simulation d’investissement
• Opportunités aurifères
• Génération de documents (NDA, LOI…)
• Analyse de risque & conformité

Que souhaitez-vous faire ?`
   }
 ])

 async function send(){
   if(!input.trim()||loading)return
   const text=input.trim()
   setInput('')
   setMessages(m=>[...m,{role:'user',content:text}])
   setLoading(true)

   try{
     const r=await fetch(`${API_URL}/api/ai/chat`,{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({message:text})
     })

     const d=await r.json()

     setMessages(m=>[
       ...m,
       {role:'assistant',content:d.reply || 'Réponse indisponible.'}
     ])

   }catch{
     setMessages(m=>[
       ...m,
       {role:'assistant',content:'Connexion backend indisponible. Vérifiez votre configuration API.'}
     ])
   }

   finally{
     setLoading(false)
   }
 }

 return (
   <>

   <button
     className="btn btnGold chatButton"
     onClick={()=>setChatOpen(!chatOpen)}
   >
     {chatOpen ? 'Fermer' : 'Aurum Advisor'}
   </button>

   {chatOpen && (
     <div className="chatBox">

       <h3 style={{color:'#D4AF37',marginTop:0}}>
         ✨ Aurum Advisor
       </h3>

       <div className="messages">
         {messages.map((m,i)=>(
           <div key={i} className={`msg ${m.role}`}>
             {m.content}
           </div>
         ))}

         {loading && (
           <small style={{color:'#D4AF37'}}>
             Analyse en cours...
           </small>
         )}
       </div>

       <div style={{display:'flex',gap:8,marginTop:12}}>
         <input
           className="input"
           value={input}
           onChange={e=>setInput(e.target.value)}
           onKeyDown={e=>e.key==='Enter'&&send()}
           placeholder="Ex: Je souhaite investir 50 000€"
         />

         <button className="btn btnGold" onClick={send}>
           OK
         </button>
       </div>

     </div>
   )}

   </>
 )
}
