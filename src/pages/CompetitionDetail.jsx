import { Link, useParams } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import { competitions } from '../lib/site-data'

export default function CompetitionDetail() {
  const { id } = useParams()
  const competition = competitions.find(comp => comp.id === id)

  if (!competition) {
    return (
      <article className="competition-detail-page">
        <div className="container">
          <p>Competition not found.</p>
          <Link to="/guild" className="back-link">Back to Guild</Link>
        </div>
      </article>
    )
  }

  return (
    <article className="competition-detail-page">
      <header className="competition-detail-hero">
        <div className="container competition-detail-layout">
          <div className="competition-detail-copy">
            <Link to="/guild" className="back-link">Back to Guild</Link>
            <span className="year-tag">{competition.years.join(', ')}</span>
            <h1>{competition.name}</h1>
            <p>{competition.description}</p>
          </div>
          <div className="competition-detail-image">
            <img src={imagePath(competition.image)} alt={competition.name} />
          </div>
        </div>
      </header>

      <section className="competition-detail-body">
        <div className="container">
          <h2>Competition Details</h2>
          <p>{competition.summary}</p>

          <h2>Highlights</h2>
          <ul>
            {competition.highlights.map(highlight => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}
