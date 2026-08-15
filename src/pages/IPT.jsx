import { Link } from 'react-router-dom'
import { getIPTProblems, getIPTYears } from '../lib/content-loader'
import { imagePath } from '../lib/image-path'

const placeholderImage = '/assets/images/guild/ipt.jpeg'

export default function IPT() {
  const problems = getIPTProblems()
  const years = getIPTYears()

  const problemsByYear = {}
  years.forEach(year => {
    problemsByYear[year] = problems.filter(p => p.year === year)
  })

  return (
    <article className="ipt-page">
      <header className="page-header">
        <div className="container">
          <h1>International Physicists' Tournament</h1>
          <p className="page-subtitle">
            The IPT is a physics competition where teams of students solve challenging
            open-ended problems and defend their solutions in scientific discussions.
          </p>
        </div>
      </header>

      <section className="ipt-problems">
        <div className="container">
          {years.map(year => (
            <div key={year} className="ipt-year-section">
              <h2 className="ipt-year-title">{year}</h2>
              <div className="projects-grid">
                {problemsByYear[year].map(problem => (
                  <Link
                    key={problem.id}
                    to={`/ipt/${problem.year}/${problem.slug}`}
                    className="project-card"
                  >
                    <div className="project-card__image">
                      <img src={imagePath(placeholderImage)} alt={problem.title} />
                    </div>
                    <div className="project-card__content">
                      <h3 className="project-card__title">{problem.title}</h3>
                      <p className="project-card__excerpt">{problem.description}</p>
                      <span className="project-card__cta">View Problem →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
