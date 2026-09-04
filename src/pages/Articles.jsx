import { Link } from 'react-router-dom'
import { getArticles } from '../lib/content-loader'
import { formatDate } from '../lib/format-date'
import { imagePath } from '../lib/image-path'
import SpaceBackground from '../components/SpaceBackground'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import '../styles/events.css'

export default function Articles() {
  const articles = getArticles()

  return (
    <article className="page events-page">
      <SpaceBackground />

      <div className="events-container">
        <PageHeader
          title="Articles"
          className="articles-header"
          subtitle="Our articles explore a wide range of topics in physics, from fundamental concepts and historical developments to recent research and scientific breakthroughs. They aim to present complex ideas in a clear and engaging manner, encouraging readers to learn, question, and explore further."
        />

        <div className="articles-list">
          {articles.map(article => (
            <article key={article.id} className="article-card">
              <Link to={`/articles/${article.id}`} className="card-visual">
                {article.image ? (
                  <img src={imagePath(article.image)} alt={article.title} loading="lazy" decoding="async" />
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

        {articles.length === 0 && (
          <EmptyState message="No articles yet. Check back soon!" />
        )}
      </div>
    </article>
  )
}
