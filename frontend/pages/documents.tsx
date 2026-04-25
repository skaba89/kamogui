import Layout from "../components/Layout"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kamogui.onrender.com"

export default function Docs() {
  function generate(type: string) {
    window.open(API_URL + "/api/ai/generate-doc?type=" + type, "_blank")
  }

  return (
    <Layout>
      <div className="container">
        <h1>Documents IA</h1>

        <button className="btn btnGold" onClick={() => generate("NDA")}>
          Générer NDA
        </button>

        <button className="btn btnGold" onClick={() => generate("LOI")}>
          Générer LOI
        </button>
      </div>
    </Layout>
  )
}