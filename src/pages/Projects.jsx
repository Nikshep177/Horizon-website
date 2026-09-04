import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import { projects } from '../lib/site-data'
import SpaceBackground from '../components/SpaceBackground'
import SelectionPills from '../components/SelectionPills'
import EmptyState from '../components/EmptyState'
import InvalidState from '../components/InvalidState'
import PageHeader from '../components/PageHeader'
import CardGrid from '../components/CardGrid'
import { getProjectTheme } from '../data/visualThemes'
import '../styles/events.css'

const tenures = Object.keys(projects).sort()

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
  const invalidTenure = yearParam && !tenures.includes(yearParam)
  const activeTenure = (yearParam && tenures.includes(yearParam))
    ? yearParam
    : (stateTenure && tenures.includes(stateTenure))
      ? stateTenure
      : tenures[0]

  if (invalidTenure) {
    return (
      <article className="events-page projects-page">
        <SpaceBackground />
        <div className="events-container">
          <InvalidState
            message={`No projects tenure matches "${yearParam}".`}
            backTo="/projects"
            backLabel="View Projects"
          />
        </div>
      </article>
    )
  }

  const filteredProjects = projects[activeTenure] || []

  return (
    <article className="events-page projects-page">
      <SpaceBackground />

      <div className="events-container">
        <PageHeader
          title="Projects"
          subtitle="Explore our research projects across different time periods."
        />

        <SelectionPills
          items={tenures}
          activeItem={activeTenure}
          onSelect={tenure => setSearchParams({ tenure }, { replace: true })}
          ariaLabel="Select year"
        />

        <CardGrid className={`projects-grid projects-grid--${filteredProjects.length}`}>
          {filteredProjects.map((project, index) => {
            const colors = getProjectTheme(index)
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
                  <img src={imagePath(image)} alt={project.title} loading="lazy" decoding="async" />
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
        </CardGrid>
        {filteredProjects.length === 0 && (
          <EmptyState message="No projects are available for this tenure." />
        )}
      </div>
    </article>
  )
}
