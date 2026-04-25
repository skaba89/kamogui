import Layout from '../components/Layout'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kamogui.onrender.com'

export default function Documents(){

  async function generate(type:string){
    const res = await fetch(`${API_URL}/api/ai/generate-doc`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ type })
    })

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    window.open(url)
  }

  return (
    <Layout>
      <div className="container" style={{padding:80}}>
        <h1>Documents Automatiques</h1>

        <button onClick={()=>generate("NDA")} className="btn btnGold">NDA</button>
        <button onClick={()=>generate("LOI")} className="btn">LOI</button>
        <button onClick={()=>generate("TERM_SHEET")} className="btn">Term Sheet</button>
      </div>
    </Layout>
  )
}