import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import eventsData from '../data/events.json'
import SpaceBackground from '../components/SpaceBackground'
import '../styles/events.css'

const years = Object.keys(eventsData).sort().reverse()
const categoryColors = {
  g2g: { bg: '#2d1b69', accent: '#7c3aed' },
  q2q: { bg: '#0c2d48', accent: '#06b6d4' },
  boltzmann: { bg: '#451a03', accent: '#f59e0b' },
  observation: { bg: '#022c22', accent: '#10b981' },
  summer: { bg: '#4a1942', accent: '#ec4899' },
  qiskit: { bg: '#2e1065', accent: '#a78bfa' },
  conclave: { bg: '#431407', accent: '#fb923c' },
  cfi: { bg: '#020617', accent: '#38bdf8' },
  freshie: { bg: '#3b0764', accent: '#e879f9' },
  extra: { bg: '#1e1b4b', accent: '#a5b4fc' },
  other: { bg: '#1e293b', accent: '#94a3b8' },
}

export default function Events() {
  const { state } = useLocation()
  const [activeYear, setActiveYear] = useState(state?.year || years[0])

  const yearData = eventsData[activeYear] || {}
  const categories = Object.values(yearData)

  return (
    <div className="events-page">
      <SpaceBackground />

      <div className="events-container">
        <header className="events-header">
          <h1 className="events-title">
            <span className="events-title__icon" aria-hidden="true">
              <span className="atom-icon">
                <span className="atom-icon__orbit atom-icon__orbit--a">
                  <span className="atom-icon__electron-holder">
                    <span className="atom-icon__electron" />
                  </span>
                </span>
                <span className="atom-icon__orbit atom-icon__orbit--b">
                  <span className="atom-icon__electron-holder">
                    <span className="atom-icon__electron" />
                  </span>
                </span>
                <span className="atom-icon__orbit atom-icon__orbit--c">
                  <span className="atom-icon__electron-holder">
                    <span className="atom-icon__electron" />
                  </span>
                </span>
                <span className="atom-icon__nucleus" />
              </span>
            </span>
            Event Horizon
          </h1>
          <p className="events-subtitle">
            Horizon’s flagship events bring the IIT Madras community closer to the frontiers of physics
            through engaging talks, interactive sessions, and research showcases. From exploring the
            mysteries of the universe to highlighting cutting-edge scientific advancements, our events
            inspire curiosity and foster scientific discussion.
          </p>
        </header>

        <nav className="year-pills" aria-label="Select year">
          {years.map(year => (
            <button
              key={year}
              className={`year-pill${activeYear === year ? ' year-pill--active' : ''}`}
              onClick={() => setActiveYear(year)}
            >
              {activeYear === year && <span className="year-pill__comet" />}
              <span className="year-pill__label">{year}</span>
            </button>
          ))}
        </nav>

        <div className="category-grid">
          {categories.map((cat, index) => {
            const sessionCount = cat.sessionCount ?? (cat.tiles ? cat.tiles.length : cat.subcards.length)
            const noCount = ['qiskit', 'conclave', 'cfi', 'freshie', 'observation'].includes(cat.id)
            return (
            <Link
              key={cat.id}
              to={`/events/${cat.id}`}
              state={{ year: activeYear }}
              className={`category-card${index % 2 === 1 ? ' category-card--reverse' : ''}${cat.id === 'observation' ? ' category-card--observation' : ''}`}
              style={{
                '--cat-bg': categoryColors[cat.id]?.bg || '#1a1a2e',
                '--cat-accent': categoryColors[cat.id]?.accent || '#6366f1',
              }}
            >
              <div className="category-card__shooting-star" />

              <div className="category-card__image">
                <img src={imagePath(cat.image)} alt={cat.title} />
                <div className="category-card__image-overlay" />
              </div>

              <div className="category-card__content">
                <div className="category-card__heading">
                  <span className="category-card__icon">{cat.icon}</span>
                  <h2 className="category-card__title">{cat.title}</h2>
                </div>
                <p className="category-card__description">{cat.description}</p>
                {!noCount && (
                  <span className="category-card__count">
                    {sessionCount} {sessionCount === 1 ? 'session' : 'sessions'}
                  </span>
                )}
                <span className="category-card__cta">
                  Explore {noCount ? 'Session' : 'Sessions'} <span className="category-card__arrow">{'\u2192'}</span>
                </span>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
