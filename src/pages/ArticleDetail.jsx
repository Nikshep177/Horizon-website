import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { getArticle } from '../lib/content-loader'
import { formatDate } from '../lib/format-date'
import MarkdownLink from '../components/MarkdownLink'

export default function ArticleDetail() {
  const { id } = useParams()
  const article = getArticle(id)

  if (!article) {
    return (
      <article className="page">
        <div className="container">
          <p>Article not found.</p>
          <Link to="/articles">← Back to Articles</Link>
        </div>
      </article>
    )
  }

  return (
    <article className="post">
      <div className="container">
        <header className="post-header">
          <h1>{article.title}</h1>
          <div className="post-meta">
            <span className="author">By {article.author}</span>
            <span className="date">{formatDate(article.date)}</span>
          </div>
          {article.tags && (
            <div className="post-tags">
              {article.tags.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className="post-content">
          <ReactMarkdown components={{ a: MarkdownLink }} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {article.content}
          </ReactMarkdown>
        </div>

        <footer className="post-footer">
          <Link to="/articles" className="back-link">← Back to Articles</Link>
        </footer>
      </div>
    </article>
  )
}
