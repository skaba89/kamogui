import Layout from '../components/Layout'

export default function Dashboard(){
  return (
    <Layout>
      <div className="container" style={{padding:80}}>
        <h1>Dashboard Investisseur</h1>

        <div className="card">
          <h3>Portefeuille simulé</h3>
          <p>Suivi de vos investissements en or</p>
        </div>

        <div className="card">
          <h3>Opportunités</h3>
          <p>Deals disponibles</p>
        </div>

        <div className="card">
          <h3>Documents</h3>
          <p>NDA / LOI / Term Sheet</p>
        </div>
      </div>
    </Layout>
  )
}