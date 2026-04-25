type MetricCardProps = {
  label: string
  value: string | number
  hint?: string
}

export default function MetricCard({ label, value, hint }: MetricCardProps){
  return <div className="card metricCard">
    <small className="eyebrowMini">{label}</small>
    <div className="metric">{value}</div>
    {hint && <p className="muted" style={{margin:0}}>{hint}</p>}
  </div>
}
