import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <article className="page not-found-page">
      <div className="container text-center">
        <h1>Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    </article>
  )
}
