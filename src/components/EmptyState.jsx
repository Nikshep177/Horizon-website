export default function EmptyState({ message, className = '' }) {
  return (
    <div className={`empty-state${className ? ` ${className}` : ''}`} role="status">
      <p>{message}</p>
    </div>
  )
}
