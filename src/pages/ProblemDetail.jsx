import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { getIPTProblemBySlug } from '../lib/content-loader'
import { imagePath } from '../lib/image-path'
import MarkdownLink from '../components/MarkdownLink'

const placeholderImage = '/assets/images/guild/ipt.jpeg'

export default function ProblemDetail() {
  const { year, slug } = useParams()
  const problem = getIPTProblemBySlug(year, slug)

  if (!problem) {
    return (
      <article className="problem-detail-page">
        <div className="container">
          <h1>Problem Not Found</h1>
          <p>The requested problem statement does not exist.</p>
        </div>
      </article>
    )
  }

  return (
    <article className="problem-detail-page">
      <header className="problem-detail-header">
        <div className="container">
          <span className="problem-year">IPT {problem.year}</span>
          <h1>{problem.title}</h1>
          <p className="problem-description">{problem.description}</p>
        </div>
      </header>

      <div className="problem-detail-content container">
        <div className="problem-detail-image">
          <img src={imagePath(placeholderImage)} alt={problem.title} />
        </div>

        <div className="problem-detail-body">
          <ReactMarkdown components={{ a: MarkdownLink }} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {problem.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  )
}
