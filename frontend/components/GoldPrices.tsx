import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://kamogui.onrender.com"

const currencies = ["USD", "EUR", "GBP", "CNY", "GNF", "XOF"]

export default function GoldPrices() {
  const [prices, setPrices] = useState<Record<string, number | null>>({})
  const [updatedAt, setUpdatedAt] = useState<string>("")
  const [loading, setLoading] = useState(true)

  async function loadPrices() {
    try {
      const res = await fetch(`${API_URL}/api/gold`, {
        cache: "no-store",
      })

      const data = await res.json()

      setPrices({
        USD: data.USD ?? null,
        EUR: data.EUR ?? null,
        GBP: data.GBP ?? null,
        CNY: data.CNY ?? null,
        GNF: data.GNF ?? null,
        XOF: data.XOF ?? null,
      })

      setUpdatedAt(data.updated_at || new Date().toISOString())
    } catch (error) {
      console.error("Gold price fetch failed", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPrices()

    const interval = setInterval(() => {
      loadPrices()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  function formatValue(code: string, value: number | null | undefined) {
    if (!value || loading) return "Chargement..."

    return new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: code === "GNF" || code === "XOF" ? 0 : 2,
    }).format(value)
  }

  function formatDate(value: string) {
    if (!value) return "en cours"

    try {
      return new Date(value).toLocaleString("fr-FR")
    } catch {
      return "en cours"
    }
  }

  return (
    <div id="markets" className="container priceStrip">
      <div className="strip">
        <div>
          <b>COURS DE L’OR EN TEMPS RÉEL</b>
          <br />
          <small style={{ color: "#aaa" }}>
            Mise à jour : {formatDate(updatedAt)}
          </small>
        </div>

        {currencies.map((code) => (
          <div className="price" key={code}>
            <small>{code}</small>
            <b>{formatValue(code, prices[code])}</b>
            <span className="positive">live</span>
          </div>
        ))}
      </div>
    </div>
  )
}