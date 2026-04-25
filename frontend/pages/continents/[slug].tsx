import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { continents } from '../../data/locations'

export default function ContinentPage() {
  const { query } = useRouter()
  const data = continents.find(c => c.slug === query.slug)

  if (!data) return <Layout><div className="container"><h1>Chargement...</h1></div></Layout>

  return (
    <Layout>
      <div className="container" style={{padding:'80px 0'}}>
        <h1>{data.name}</h1>
        <p>{data.address}</p>
        <p>{data.phone}</p>
        <p>{data.email}</p>
        <iframe src={data.map} width="100%" height="400" style={{border:0}} />
      </div>
    </Layout>
  )
}
