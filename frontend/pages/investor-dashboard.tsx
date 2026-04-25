import Layout from "../components/Layout"

export default function Dashboard() {
  return (
    <Layout>
      <div className="container">
        <h1>Dashboard Investisseur</h1>

        <ul>
          <li>Prix de l’or en temps réel</li>
          <li>Simulation</li>
          <li>Opportunités</li>
          <li>Documents générés</li>
        </ul>
      </div>
    </Layout>
  )
}