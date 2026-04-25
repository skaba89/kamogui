import { useState } from 'react'

export default function GoldProspector(){
  const [input,setInput]=useState('')
  const [result,setResult]=useState<any>(null)

  async function analyze(){
    const res = await fetch('/api/gold-prospector/analyze',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(input)
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div style={{padding:40}}>
      <h1>Gold Prospector</h1>
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Acheteur d'or Paris" />
      <button onClick={analyze}>Analyser</button>
      {result && <pre>{JSON.stringify(result,null,2)}</pre>}
    </div>
  )
}
