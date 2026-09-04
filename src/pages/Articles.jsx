import { Link } from 'react-router-dom'
import { getArticles } from '../lib/content-loader'
import { formatDate } from '../lib/format-date'
import { imagePath } from '../lib/image-path'
// MagicBento removed — using projects-style grid for articles
import SpaceBackground from '../components/SpaceBackground'
import '../styles/events.css'

export default function Articles() {
  const articles = getArticles()
  const hiddenArticleIds = new Set([
    'getting-started-with-open-source',
    'project-radian',
    'project-starspec',
    'project-optiqomm',
    'project-sonicphase',
    'project-ferrostats',
    'project-quantaband',
    'project-ligo',
    'project-apteam',
    'project-apteam-2627',
  ])
  const visibleArticles = articles.filter(article => !hiddenArticleIds.has(article.id))

  return (
    <article className="page events-page">
      <SpaceBackground />

      <div className="events-container">
        <header className="events-header articles-header">
          <h1 className="events-title">Articles</h1>
          <p className="events-subtitle">Our articles explore a wide range of topics in physics, from fundamental concepts and historical developments to recent research and scientific breakthroughs. They aim to present complex ideas in a clear and engaging manner, encouraging readers to learn, question, and explore further.</p>
        </header>

        <div className="articles-list">
          {visibleArticles.map(article => (
            <article key={article.id} className="article-card">
              <Link to={`/articles/${article.id}`} className="card-visual">
                {article.image ? (
                  <img src={imagePath(article.image)} alt={article.title} />
                ) : (
                  <div className="pattern-bg" />
                )}
              </Link>
              <div className="card-body">
                {article.date && (
                  <div className="card-meta">
                    {article.author && <span>{article.author}</span>}
                    <span>{formatDate(article.date)}</span>
                  </div>
                )}
                <h3 className="card-title">
                  <Link to={`/articles/${article.id}`}>{article.title}</Link>
                </h3>
                <p className="article-card__excerpt">
                  {article.excerpt || article.summary || ''}
                </p>
                <Link to={`/articles/${article.id}`} className="read-link">
                  Read Article <span className="arrow">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {visibleArticles.length === 0 && (
          <div className="empty-state">
            <p>No articles yet. Check back soon!</p>
          </div>
        )}
      </div>
    </article>
  )
}
