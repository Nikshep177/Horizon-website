import { useEffect, useRef } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import { eventsData } from '../lib/site-data'
import SpaceBackground from '../components/SpaceBackground'
import InvalidState from '../components/InvalidState'
import { eventCategoryThemes } from '../data/visualThemes'
import '../styles/events.css'

export default function EventCategory() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const requestedYear = searchParams.get('year')
  const availableYears = Object.keys(eventsData)
  const invalidYear = requestedYear && !availableYears.includes(requestedYear)
  const year = requestedYear || '2025-26'
  const listRef = useRef(null)

  const yearData = eventsData[year] || {}
  const cat = yearData[category]
  const colors = eventCategoryThemes[category] || eventCategoryThemes.g2g

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const els = list.querySelectorAll('.subcard, .observation-tile')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [category, year])

  if (invalidYear) {
    return (
      <div className="events-page">
        <SpaceBackground />
        <div className="events-container">
          <InvalidState
            message={`No events year matches "${requestedYear}".`}
            backTo="/events"
            backLabel="View Events"
          />
        </div>
      </div>
    )
  }

  if (!cat) {
    return (
      <div className="events-page">
        <SpaceBackground />
        <div className="events-container">
          <InvalidState
            message={`No event category matches "${category}".`}
            backTo={`/events?year=${encodeURIComponent(year)}`}
            backLabel="View Events"
          />
        </div>
      </div>
    )
  }

  const isObservation = category === 'observation'

  return (
    <div className="events-page">
      <SpaceBackground />

      <div className="events-container">
        <Link to={`/events?year=${encodeURIComponent(year)}`} className="event-category__back">
          {'\u2190'} All Events
        </Link>

        <header
          className="event-category__header"
          style={{ '--cat-accent': colors.accent, '--cat-bg': colors.bg }}
        >
          <div className="event-category__heading">
            <span className="event-category__icon">{cat.icon}</span>
            <h1 className="event-category__title">{cat.title}</h1>
          </div>
          <p className="event-category__year">{year}</p>
        </header>

        {isObservation ? (
          <div className="observation-layout" ref={listRef}>
            <section
              className="observation-intro"
              style={{ '--cat-accent': colors.accent, '--cat-glow': colors.glow }}
            >
              <h2 className="observation-intro__title">About the Sessions</h2>
              <p className="observation-intro__text">{cat.about || cat.description}</p>
            </section>

            <section
              className="observation-gallery"
              style={{ '--cat-accent': colors.accent, '--cat-glow': colors.glow }}
            >
              <h2 className="observation-gallery__title">Observation Gallery</h2>
              <div className="observation-gallery__grid">
                {(cat.tiles || []).map((tile, index) => (
                  <figure
                    key={tile.id}
                    className="observation-tile"
                    style={{ '--reveal-delay': `${index * 0.08}s` }}
                  >
                    <div className="observation-tile__media">
                        <img src={imagePath(tile.image)} alt={tile.title} loading="lazy" decoding="async" />
                    </div>
                  </figure>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className={`subcard-list subcard-list--${category} subcard-list--year-${year}`} ref={listRef}>
            {cat.subcards.map((sub, index) => {
              if (sub.entries && sub.entries.length > 0) {
                return (
                  <div
                    key={sub.id}
                    className="subcard subcard--merged"
                    style={{
                      '--cat-accent': colors.accent,
                      '--cat-bg': colors.bg,
                      '--cat-glow': colors.glow,
                      '--reveal-delay': `${index * 0.1}s`,
                    }}
                  >
                    <div className="subcard__shooting-star" />
                    <div className="subcard__merged-header">
                      <h3 className="subcard__title subcard__title--center">{sub.title}</h3>
                      <span className="subcard__divider subcard__divider--center" />
                    </div>
                    <div className="subcard__merged-list">
                      {sub.entries.map((entry, entryIdx) => (
                        <div key={entryIdx} className="subcard__merged-entry">
                          <div className="subcard__merged-entry-media">
                            <img src={imagePath(entry.image)} alt={sub.title} loading="lazy" decoding="async" />
                          </div>
                          <div className="subcard__merged-entry-body">
                            <p className="subcard__description">{entry.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              if (sub.images && sub.images.length > 0) {
                return (
                  <div
                    key={sub.id}
                    className="subcard subcard--gallery"
                    style={{
                      '--cat-accent': colors.accent,
                      '--cat-bg': colors.bg,
                      '--cat-glow': colors.glow,
                      '--reveal-delay': `${index * 0.1}s`,
                    }}
                  >
                    <div className="subcard__shooting-star" />
                    <div className="subcard__gallery-header">
                      <h3 className="subcard__title subcard__title--center">{sub.title}</h3>
                      <span className="subcard__divider subcard__divider--center" />
                      {sub.description && (
                        <p className="subcard__description subcard__description--center">{sub.description}</p>
                      )}
                    </div>
                    <div className="subcard__gallery-grid">
                      {sub.images.map((imgSrc, imgIdx) => (
                        <div key={imgIdx} className="subcard__gallery-item">
                          <img src={imagePath(imgSrc)} alt={`${sub.title} ${imgIdx + 1}`} loading="lazy" decoding="async" />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={sub.id}
                  className={`subcard${index % 2 === 1 ? ' subcard--reverse' : ''}`}
                  style={{
                    '--cat-accent': colors.accent,
                    '--cat-bg': colors.bg,
                    '--cat-glow': colors.glow,
                    '--reveal-delay': `${index * 0.1}s`,
                  }}
                >
                  <div className="subcard__shooting-star" />

                  {sub.image && (
                    <div className="subcard__image">
                      <img src={imagePath(sub.image)} alt={sub.title} loading="lazy" decoding="async" />
                      <div className="subcard__image-overlay" />
                    </div>
                  )}

                  <div className="subcard__content">
                    {sub.title && <h3 className="subcard__title">{sub.title}</h3>}
                    {sub.title && <span className="subcard__divider" />}
                    {sub.speaker && (
                      <p className="subcard__speaker">{sub.speaker}</p>
                    )}
                    <p className="subcard__description">{sub.description}</p>
                    {sub.youtube && (
                      <a
                        href={sub.youtube}
                        className="subcard__youtube"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
                        </svg>
                        Watch the Session Here!
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
