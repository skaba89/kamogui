import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { services } from '../../data/services'

export default function ServicePage() {
  const { query } = useRouter()
  const service = services.find(s => s.slug === query.slug)

  if (!service) return <Layout><div className="container"><h1>Chargement...</h1></div></Layout>

  return (
    <Layout>
      <div className="container" style={{padding:'80px 0'}}>
        <h1>{service.title}</h1>
        <p>{service.desc}</p>
      </div>
    </Layout>
  )
}
