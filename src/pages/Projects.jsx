import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { imagePath, normalizeAssetPaths } from '../lib/image-path'
import rawProjects from '../data/projects.json'
import SpaceBackground from '../components/SpaceBackground'
import '../styles/events.css'

const projects = normalizeAssetPaths(rawProjects)
const tenures = Object.keys(projects).sort()

const projectPalette = [
  { bg: '#1e1b4b', accent: '#818cf8', glow: 'rgba(129, 140, 248, 0.35)' },
  { bg: '#4a1942', accent: '#f472b6', glow: 'rgba(244, 114, 182, 0.35)' },
  { bg: '#022c22', accent: '#34d399', glow: 'rgba(52, 211, 153, 0.35)' },
  { bg: '#451a03', accent: '#fbbf24', glow: 'rgba(251, 191, 36, 0.35)' },
  { bg: '#2e1065', accent: '#a78bfa', glow: 'rgba(167, 139, 250, 0.35)' },
  { bg: '#431407', accent: '#f87171', glow: 'rgba(248, 113, 113, 0.35)' },
  { bg: '#083344', accent: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.35)' },
  { bg: '#1e293b', accent: '#fb923c', glow: 'rgba(251, 146, 60, 0.35)' },
]

const fallbackImages = {
  optiqomm: '/assets/images/projects/2025/optiqomm.png',
  radian: '/assets/images/projects/2025/radian.png',
  starspec: '/assets/images/projects/2025/starspec.png',
  ligo: '/assets/images/projects/2025/ligo.png',
  placeholder: '/assets/images/projects/2025/placeholder.svg',
}

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const yearParam = searchParams.get('tenure') || searchParams.get('year')
  const stateTenure = location.state?.tenure || location.state?.year
  const activeTenure = (yearParam && tenures.includes(yearParam))
    ? yearParam
    : (stateTenure && tenures.includes(stateTenure))
      ? stateTenure
      : tenures[0]

  const filteredProjects = projects[activeTenure] || []

  return (
    <article className="events-page projects-page">
      <SpaceBackground />

      <div className="events-container">
        <header className="events-header">
          <h1 className="events-title">Projects</h1>
          <p className="events-subtitle">Explore our research projects across different time periods.</p>
        </header>

        <nav className="year-pills" aria-label="Select year">
          {tenures.map(year => (
            <button
              key={year}
              className={`year-pill${activeTenure === year ? ' year-pill--active' : ''}`}
              onClick={() => setSearchParams({ tenure: year }, { replace: true })}
            >
              {activeTenure === year && <span className="year-pill__comet" />}
              <span className="year-pill__label">{year}</span>
            </button>
          ))}
        </nav>

        <div className={`projects-grid projects-grid--${filteredProjects.length}`}>
          {filteredProjects.map((project, index) => {
            const colors = projectPalette[index % projectPalette.length]
            const image = project.image || fallbackImages[project.id] || fallbackImages.placeholder

            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}?tenure=${activeTenure}`}
                state={{ tenure: activeTenure }}
                className="project-card project-card--inner"
                style={{
                  '--cat-bg': colors.bg,
                  '--cat-accent': colors.accent,
                  '--cat-glow': colors.glow,
                }}
              >
                <div className="project-card__shooting-star" />

                <div className="project-card__image">
                  <img src={imagePath(image)} alt={project.title} />
                  <div className="project-card__image-overlay" />
                </div>

                <div className="project-card__content">
                  <h3 className="project-card__title">{project.title}</h3>
                  <span className="project-card__divider" />

                  <div className="project-card__sub">
                    <p className="project-card__description">{project.excerpt}</p>

                    {project.tags && (
                      <div className="article-tags">
                        {project.tags.map(tag => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                      </div>
                    )}

                    <span className="project-card__cta">
                      View Project <span className="project-card__arrow">{'\u2192'}</span>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </article>
  )
}
