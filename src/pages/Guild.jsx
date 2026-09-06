import { Link, useSearchParams } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import { competitions } from '../lib/site-data'
import SpaceBackground from '../components/SpaceBackground'
import InvalidState from '../components/InvalidState'
import ExternalLink from '../components/ExternalLink'
import '../styles/events.css'

const achievements = [
  {
    year: '2024',
    competition: "Indian National Physicists' Tournament (INPT)",
    result: '1st & 2nd Place',
    detail: null,
  },
  {
    year: '2025',
    competition: "International Physicists' Tournament (IPT) Qualifiers",
    result: 'Qualified as Team India Representative',
    detail: null,
  },
  {
    year: '2024',
    competition: 'Inter-IIT Tech Meet — Observational Astronomy',
    result: '3rd Place',
    detail: null,
  },
  {
    year: '2025',
    competition: 'Decoherence 2025 — IISc',
    result: '3rd Place',
    detail: null,
  },
]

const guildNav = [
  { id: 'achievements', label: 'Achievements' },
  { id: 'ipt', label: 'IPT' },
  { id: 'competitions', label: 'Competitions' },
  { id: 'problems', label: 'Problems' },
]

const problemSets = [
  {
    id: 'problem-1',
    title: 'Problem Set 1',
    file: '/assets/images/guild page problem set/Problem 1.pdf',
  },
  {
    id: 'problem-2',
    title: 'Problem Set 2',
    file: '/assets/images/guild page problem set/Problem 2.pdf',
  },
]

export default function Guild() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedSection = searchParams.get('section')
  const invalidSection = requestedSection && !guildNav.some(item => item.id === requestedSection)
  const activeSection = guildNav.some(item => item.id === requestedSection)
    ? requestedSection
    : 'achievements'

  if (invalidSection) {
    return (
      <article className="guild-page">
        <SpaceBackground />
        <div className="guild-page__content">
          <div className="container">
            <InvalidState
              message={`No Guild section matches "${requestedSection}".`}
              backTo="/guild"
              backLabel="View Guild"
            />
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="guild-page">
      <SpaceBackground />

      <div className="guild-page__content">
        <header className="guild-hero">
          <div className="container">
            <h1 className="guild-title">Physics Guild</h1>
            <p className="guild-subtitle">
              The Physics Guild represents our club at national and international physics competitions,
              bringing together students to tackle challenging problems through collaboration and creative
              problem-solving.
            </p>
            <nav className="guild-nav" aria-label="Guild sections">
              {guildNav.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`guild-nav__pill${activeSection === item.id ? ' guild-nav__pill--active' : ''}`}
                  onClick={() => setSearchParams({ section: item.id }, { replace: true })}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {activeSection === 'achievements' && (
          <section className="guild-section">
            <div className="container">
              <h2 className="guild-section__title">Achievements</h2>
              <div className="guild-achievements-grid">
                {achievements.map((a, i) => (
                  <article key={i} className="guild-achievement-card">
                    <span className="guild-achievement-card__year">{a.year}</span>
                    <h3 className="guild-achievement-card__competition">{a.competition}</h3>
                    <div className="guild-achievement-card__result">
                      <span>{a.result}</span>
                      {a.detail && <span className="guild-achievement-card__detail">{a.detail}</span>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'ipt' && (
          <section className="guild-section">
            <div className="container">
              <h2 className="guild-section__title">International Physicists' Tournament</h2>
              <div className="guild-ipt-grid">
                <div className="guild-panel">
                  <p className="guild-panel__text">
                    The IPT is a physics competition where teams of students solve challenging
                    open-ended problems and defend their solutions in scientific discussions.
                    Horizon has consistently excelled, qualifying for the international stage
                    and representing Team India.
                  </p>
                  <div className="guild-ipt-actions">
                    <ExternalLink
                      href="https://www.instagram.com/iptindia_iitm"
                      className="btn btn-outline"
                    >
                      <svg
                        className="btn-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </ExternalLink>
                  </div>
                </div>
                <div className="guild-ipt-media">
                  <img src={imagePath('/assets/images/guild/IPTteam.jpeg')} alt="IPT team" />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'competitions' && (
          <section className="guild-section">
            <div className="container">
              <h2 className="guild-section__title">Competitions</h2>
              <div className="guild-competitions-grid">
                {competitions.map((comp, i) => (
                  <Link
                    key={comp.id || i}
                    to={`/guild/competitions/${comp.id}`}
                    className="guild-competition-card"
                  >
                    <div className="guild-competition-card__image">
                      <img src={imagePath(comp.image)} alt={comp.name} loading="lazy" decoding="async" />
                    </div>
                    <div className="guild-competition-card__body">
                      <h3 className="guild-competition-card__title">{comp.name}</h3>
                      <p className="guild-competition-card__description">{comp.description}</p>
                      <span className="guild-competition-card__years">
                        Years: {comp.years.join(', ')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'problems' && (
          <section className="guild-section">
            <div className="container">
              <h2 className="guild-section__title">Problems</h2>
              <div className="guild-problems-grid">
                {problemSets.map((problem, i) => (
                  <a
                    key={problem.id}
                    href={imagePath(problem.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="guild-problem-card"
                  >
                    <span className="guild-problem-card__year">Problem Set {i + 1}</span>
                    <h3 className="guild-problem-card__title">{problem.title}</h3>
                    <p className="guild-problem-card__description">
                      Click to open the problem set.
                    </p>
                  </a>
                ))}
              </div>
              <p className="guild-problems-note">
                More problem sets will be updated soon.
              </p>
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
