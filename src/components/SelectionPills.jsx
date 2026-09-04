export default function SelectionPills({
  items,
  activeItem,
  onSelect,
  ariaLabel,
  className = '',
}) {
  return (
    <nav className={`year-pills${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
      {items.map(item => (
        <button
          key={item}
          type="button"
          className={`year-pill${activeItem === item ? ' year-pill--active' : ''}`}
          onClick={() => onSelect(item)}
        >
          {activeItem === item && <span className="year-pill__comet" />}
          <span className="year-pill__label">{item}</span>
        </button>
      ))}
    </nav>
  )
}
