import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { inventoryCategories, inventorySections } from '../data/inventoryData'
import './EquipmentInventory.css'

const FILTER_TABS = inventoryCategories.filter(category => category !== 'All')

const InventoryCard = ({ section, dimmed }) => {
  const cardRef = useRef(null)

  const handleMouseMove = e => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--glow-x', `${x}%`)
    card.style.setProperty('--glow-y', `${y}%`)
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--glow-x', '50%')
    card.style.setProperty('--glow-y', '50%')
  }

  const className = `inventory-card${dimmed ? ' inventory-card--dimmed' : ''}`

  return (
    <article
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="inventory-card__title">{section.category}</h3>
      <ul className="inventory-card__list">
        {section.items.map(item => (
          <li key={`${item.company ?? ''}-${item.model}`} className="inventory-item">
            <span className="inventory-item__dot" aria-hidden="true" />
            {item.company && <span className="inventory-item__company">{item.company}</span>}
            <span className="inventory-item__model">{item.model}</span>
            {item.tag && <span className="inventory-item__tag">{item.tag}</span>}
            {item.quantity != null && (
              <span className="inventory-item__qty">Qty {item.quantity}</span>
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}

const measureElementRelativeTo = (element, container) => {
  const containerRect = container.getBoundingClientRect()
  const rect = element.getBoundingClientRect()
  const styles = getComputedStyle(container)

  return {
    x: rect.left - containerRect.left - parseFloat(styles.borderLeftWidth),
    y: rect.top - containerRect.top - parseFloat(styles.borderTopWidth),
    width: rect.width,
    height: rect.height
  }
}

export default function EquipmentInventory() {
  const [activeTab, setActiveTab] = useState(FILTER_TABS[0])
  const containerRef = useRef(null)
  const indicatorRef = useRef(null)
  const tabRefs = useRef([])
  const activeTabPositionRef = useRef(null)

  const measureTab = useCallback(element => {
    const container = containerRef.current
    if (!container || !element) return null
    return measureElementRelativeTo(element, container)
  }, [])

  const activeTabPosition = useCallback(() => {
    const index = FILTER_TABS.indexOf(activeTab)
    return measureTab(tabRefs.current[index])
  }, [activeTab, measureTab])

  const animateTo = useCallback((target, duration) => {
    if (!target || !indicatorRef.current) return
    gsap.to(indicatorRef.current, {
      x: target.x,
      y: target.y,
      width: target.width,
      height: target.height,
      duration,
      ease: 'power3.out',
      overwrite: 'auto'
    })
  }, [])

  useEffect(() => {
    activeTabPositionRef.current = activeTabPosition
  }, [activeTabPosition])

  useEffect(() => {
    const layout = () => {
      const position = activeTabPositionRef.current()
      if (!position) return
      animateTo(position, 0)
    }
    layout()
    window.addEventListener('resize', layout)
    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {})
    }
    return () => window.removeEventListener('resize', layout)
  }, [animateTo])

  useEffect(() => {
    const position = activeTabPosition()
    if (!position) return
    animateTo(position, 0.35)
  }, [activeTab, activeTabPosition, animateTo])

  const handleMouseEnter = index => {
    const position = measureTab(tabRefs.current[index])
    if (position) animateTo(position, 0.35)
  }

  const handleMouseLeave = () => {
    const position = activeTabPosition()
    if (position) animateTo(position, 0.4)
  }

  return (
    <section className="inventory-section">
      <div className="inventory-container">
        <h2 className="inventory-title">Equipment Inventory</h2>
        <p className="inventory-subtitle">
          The telescopes, sensors, and hardware behind our deep-space observations and captures.
        </p>

        <div
          className="inventory-nav-container"
          role="tablist"
          aria-label="Inventory categories"
          ref={containerRef}
          onMouseLeave={handleMouseLeave}
        >
          <span className="inventory-nav-indicator" ref={indicatorRef} aria-hidden="true" />
          {FILTER_TABS.map((category, index) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeTab === category}
              ref={el => {
                tabRefs.current[index] = el
              }}
              className={`inventory-nav-link${activeTab === category ? ' inventory-nav-link--active' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="inventory-grid">
          {inventorySections.map(section => (
            <InventoryCard
              key={section.category}
              section={section}
              dimmed={activeTab !== section.filter}
            />
          ))}
        </div>
      </div>
    </section>
  )
}