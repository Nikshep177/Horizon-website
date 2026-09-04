export default function CardGrid({ as: Component = 'div', className = '', children }) {
  return (
    <Component className={`card-grid ${className}`.trim()}>
      {children}
    </Component>
  )
}
