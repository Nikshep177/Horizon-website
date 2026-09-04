export default function PageHeader({ title, subtitle, className = '' }) {
  return (
    <header className={`page-header events-header${className ? ` ${className}` : ''}`}>
      <h1 className="events-title">{title}</h1>
      {subtitle && <p className="events-subtitle">{subtitle}</p>}
    </header>
  )
}
