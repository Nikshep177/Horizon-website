import { Link, useSearchParams } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import { eventsData } from '../lib/site-data'
import SpaceBackground from '../components/SpaceBackground'
import SelectionPills from '../components/SelectionPills'
import EmptyState from '../components/EmptyState'
import InvalidState from '../components/InvalidState'
import { getEventTheme } from '../data/visualThemes'
import '../styles/events.css'

const years = Object.keys(eventsData).sort().reverse()
export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedYear = searchParams.get('year')
  const invalidYear = requestedYear && !years.includes(requestedYear)
  const activeYear = years.includes(requestedYear) ? requestedYear : years[0]

  if (invalidYear) {
    return (
      <article className="events-page">
        <SpaceBackground />
        <div className="events-container">
          <InvalidState
            message={`No events year matches "${requestedYear}".`}
            backTo="/events"
            backLabel="View Events"
          />
        </div>
      </article>
    )
  }

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

        <SelectionPills
          items={years}
          activeItem={activeYear}
          onSelect={year => setSearchParams({ year }, { replace: true })}
          ariaLabel="Select year"
        />

        <div className="category-grid">
          {categories.map((cat, index) => {
            const colors = getEventTheme(cat.id)
            const sessionCount = cat.sessionCount ?? (cat.tiles ? cat.tiles.length : cat.subcards.length)
            const noCount = ['qiskit', 'conclave', 'cfi', 'freshie', 'observation'].includes(cat.id)
            return (
            <Link
              key={cat.id}
              to={`/events/${cat.id}?year=${encodeURIComponent(activeYear)}`}
              className={`category-card${index % 2 === 1 ? ' category-card--reverse' : ''}${cat.id === 'observation' ? ' category-card--observation' : ''}`}
              style={{
                '--cat-bg': colors.bg,
                '--cat-accent': colors.accent,
              }}
            >
              <div className="category-card__shooting-star" />

              <div className="category-card__image">
                <img src={imagePath(cat.image)} alt={cat.title} loading="lazy" decoding="async" />
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
        {categories.length === 0 && (
          <EmptyState message="No events are available for this year." />
        )}
      </div>
    </div>
  )
}
