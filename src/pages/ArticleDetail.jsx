import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import 'katex/dist/katex.min.css'
import { getArticle } from '../lib/content-loader'
import { formatDate } from '../lib/format-date'
import MarkdownLink from '../components/MarkdownLink'
import BackLink from '../components/BackLink'

export default function ArticleDetail() {
  const { id } = useParams()
  const article = getArticle(id)
  const [remarkGfm, setRemarkGfm] = useState(null)
  const [remarkMath, setRemarkMath] = useState(null)
  const [rehypeKatex, setRehypeKatex] = useState(null)

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

  // Dynamically import markdown dependencies only when needed
  import('remark-gfm').then((mod) => setRemarkGfm(mod.default)).catch(() => {
    /* fallback handled below */
  })
  import('remark-math').then((mod) => setRemarkMath(mod.default)).catch(() => {
    /* fallback handled below */
  })
  import('rehype-katex').then((mod) => setRehypeKatex(mod.default)).catch(() => {
    /* fallback handled below */
  })

  if (!remarkGfm || !remarkMath || !rehypeKatex) {
    return (
      <article className="page">
        <div className="container">
          <p>Loading article content.</p>
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
          <ReactMarkdown
            components={{ a: MarkdownLink }}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        <footer className="post-footer">
          <BackLink to="/articles">← Back to Articles</BackLink>
        </footer>
      </div>
    </article>
  )
}
