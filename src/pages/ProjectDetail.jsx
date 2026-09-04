import { useParams, Link, useSearchParams, useLocation } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import { projects } from '../lib/site-data'
import SpaceBackground from '../components/SpaceBackground'
import { projectThemes } from '../data/visualThemes'
import { formatDate } from '../lib/format-date'
import '../styles/events.css'
const fallbackImages = {
  optiqomm: '/assets/images/projects/2025/optiqomm.png',
  radian: '/assets/images/projects/2025/radian.png',
  starspec: '/assets/images/projects/2025/starspec.png',
  ligo: '/assets/images/projects/2025/ligo.png',
  placeholder: '/assets/images/projects/2025/placeholder.svg',
}

export default function ProjectDetail() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const tenureParam = searchParams.get('tenure') || searchParams.get('year') || location.state?.tenure || location.state?.year

  let project = null
  let activeTenure = tenureParam

  if (activeTenure && projects[activeTenure]) {
    project = (projects[activeTenure] || []).find(p => p.id === id)
  }

  if (!project) {
    for (const [tenure, list] of Object.entries(projects)) {
      const found = list.find(p => p.id === id)
      if (found) {
        project = found
        if (!activeTenure) activeTenure = tenure
        break
      }
    }
  }

  const allProjects = Object.values(projects).flat()

  if (!project) {
    return (
      <div className="events-page">
        <SpaceBackground />
        <div className="events-container">
          <p>Project not found.</p>
          <Link to="/projects">{'\u2190'} Back to Projects</Link>
        </div>
      </div>
    )
  }

  const backUrl = activeTenure ? `/projects?tenure=${activeTenure}` : '/projects'
  const colors = projectThemes[allProjects.indexOf(project) % projectThemes.length]
  const image = project.image || fallbackImages[project.id] || fallbackImages.placeholder
  const dateLabel = formatDate(project.date, { year: 'numeric', month: 'long' }) || null

  return (
    <div className="events-page project-detail-page">
      <SpaceBackground />

      <div className="events-container">
        <Link to={backUrl} state={{ tenure: activeTenure }} className="event-category__back">
          {'\u2190'} All Projects
        </Link>

        <header
          className="event-category__header"
          style={{ '--cat-accent': colors.accent, '--cat-bg': colors.bg }}
        >
          <div className="event-category__heading">
            <h1 className="event-category__title">{project.title}</h1>
          </div>
          {dateLabel && <p className="event-category__year">{dateLabel}</p>}
        </header>

        <div className="subcard-list">
          <div
            className={`subcard revealed${project.id.startsWith('apteam') ? ' subcard--apteam' : ''}`}
            style={{ '--cat-accent': colors.accent, '--cat-bg': colors.bg, '--cat-glow': colors.glow }}
          >
            <div className="subcard__shooting-star" />

            <div className="subcard__image">
              <img src={imagePath(image)} alt={project.title} />
              <div className="subcard__image-overlay" />
            </div>

            <div className="subcard__content">
              <h3 className="subcard__title">{project.title}</h3>
              <span className="subcard__divider" />
              {project.author && <p className="subcard__speaker">{project.author}</p>}
              <p className="subcard__description">{project.excerpt}</p>
              {project.tags && (
                <div className="article-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

        {project.content && (
          <>
            <div className="project-divider" />

            <div className="project-content" style={{ '--cat-accent': colors.accent }}>
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </>
        )}

        {project.team && (project.team.leads?.length > 0 || project.team.members?.length > 0) && (
          project.team.leads?.length > 0 && typeof project.team.leads[0] === 'object' ? (
            <div className="project-team-block project-team-block--centered">
              <div className="project-team-header">
                <h3 className="project-team-heading">Team Members</h3>
                <span className="subcard__divider subcard__divider--center" />
              </div>
              <div className="team-members-grid">
                {project.team.leads?.map(person => (
                  <div key={person.name} className="team-member-card">
                    <div className="team-member-card__image">
                      <img
                        src={imagePath(person.image || fallbackImages.placeholder)}
                        alt={person.name}
                        onError={(e) => { e.target.src = imagePath(fallbackImages.placeholder); }}
                      />
                      <div className="team-member-card__overlay" />
                    </div>
                    <div className="team-member-card__info">
                      <span className="team-member-card__role">Project Lead</span>
                      <span className="team-member-card__name">{person.name}</span>
                    </div>
                  </div>
                ))}
                {project.team.members?.map(person => (
                  <div key={person.name} className="team-member-card">
                    <div className="team-member-card__image">
                      <img
                        src={imagePath(person.image || fallbackImages.placeholder)}
                        alt={person.name}
                        onError={(e) => { e.target.src = imagePath(fallbackImages.placeholder); }}
                      />
                      <div className="team-member-card__overlay" />
                    </div>
                    <div className="team-member-card__info">
                      <span className="team-member-card__role">Member</span>
                      <span className="team-member-card__name">{person.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="project-team-block project-team-block--centered">
              <div className="project-team-header">
                <h3 className="project-team-heading">Project Team</h3>
                <span className="subcard__divider subcard__divider--center" />
              </div>
              <div className="subcard__team">
                <div className="subcard__team-media">
                  <img
                    src={imagePath(project.team.image || fallbackImages.placeholder)}
                    alt={`${project.title} team`}
                    onError={(e) => { e.target.src = imagePath(fallbackImages.placeholder); }}
                  />
                  <div className="subcard__image-overlay" />
                </div>
                <div className="subcard__team-content">
                  {project.team.leads?.length > 0 && (
                    <div className="subcard__team-group">
                      <span className="subcard__team-label">Project Lead</span>
                      <ul className="subcard__team-list">
                        {project.team.leads.map(name => (
                          <li key={name}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.team.members?.length > 0 && (
                    <div className="subcard__team-group">
                      <span className="subcard__team-label">Project Members</span>
                      <ul className="subcard__team-list">
                        {project.team.members.map(name => (
                          <li key={name}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
