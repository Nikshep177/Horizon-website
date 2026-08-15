import { Link } from 'react-router-dom'
import { imagePath, normalizeAssetPaths } from '../lib/image-path'
import rawCompetitions from '../data/competitions.json'

const competitions = normalizeAssetPaths(rawCompetitions)

const achievements = [
  { year: 2024, competition: 'Indian National Physicists\' Tournament (INPT)', result: '1st & 2nd Place, ₹35,000 prizes' },
  { year: 2025, competition: 'International Physicists\' Tournament (IPT) Qualifiers', result: 'Qualified as Team India Representative' },
  { year: 2024, competition: 'Inter-IIT Tech Meet — Observational Astronomy', result: '3rd Place' },
  { year: 2025, competition: 'Decoherence 2025 — IISc', result: '3rd Place' },
]

export default function Guild() {
  return (
    <article className="guild-page">
      <section className="guild-achievements-section">
        <div className="container">
          <h2 className="section-title">Achievements</h2>
          <ul className="guild-achievements-list">
            {achievements.map((a, i) => (
              <li key={i}>
                <span className="year-tag">{a.year}</span>
                <span className="achievement-competition">{a.competition}</span>
                <span className="achievement-result">{a.result}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="guild-ipt-section">
        <div className="container guild-ipt-layout">
          <div className="guild-ipt-copy">
            <h2 className="section-title">International Physicists' Tournament</h2>
            <p className="guild-ipt-description">
              The IPT is a physics competition where teams of students solve challenging
              open-ended problems and defend their solutions in scientific discussions.
              Horizon has consistently excelled, qualifying for the international stage
              and representing Team India.
            </p>
            <div className="guild-ipt-actions">
              <Link to="/ipt" className="btn btn-primary">Read More</Link>
              <a
                href="https://www.instagram.com/iptindia_iitm"
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="btn-icon" aria-hidden="true"><use href={imagePath('/icons.svg#instagram-icon')} /></svg>
                Instagram
              </a>
            </div>
          </div>
          <div className="guild-ipt-media">
            <img src={imagePath('/assets/images/guild/ipt.jpeg')} alt="IPT team placeholder" />
          </div>
        </div>
      </section>

      <section className="guild-competitions-section">
        <div className="container">
          <h2 className="section-title">Other Competitions</h2>
          <div className="projects-grid">
            {competitions.map((comp, i) => (
              <Link key={comp.id || i} to={`/guild/competitions/${comp.id}`} className="project-card">
                <div className="project-card__image">
                  <img src={imagePath(comp.image)} alt={comp.name} />
                </div>
                <div className="project-card__content">
                  <h3 className="project-card__title">{comp.name}</h3>
                  <p className="project-card__excerpt">{comp.description}</p>
                  <span className="project-card__years">Years: {comp.years.join(', ')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
