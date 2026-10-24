import { useParams, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import 'katex/dist/katex.min.css'
import { getIPTProblemBySlug } from '../lib/content-loader'
import { imagePath } from '../lib/image-path'

const placeholderImage = '/assets/images/guild/ipt.jpeg'

export default function ProblemDetail() {
  const { year, slug } = useParams()
  const problem = getIPTProblemBySlug(year, slug)
  const [remarkGfm, setRemarkGfm] = useState(null)
  const [remarkMath, setRemarkMath] = useState(null)
  const [rehypeKatex, setRehypeKatex] = useState(null)

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
      <article className="problem-detail-page">
        <div className="container">
          <h1>Problem Not Found</h1>
          <p>Loading problem content.</p>
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