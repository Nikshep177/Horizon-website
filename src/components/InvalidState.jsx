import { Link } from 'react-router-dom'

export default function InvalidState({ message, backTo, backLabel }) {
  return (
    <div className="invalid-state" role="alert">
      <p>{message}</p>
      <Link to={backTo} className="btn btn-primary">{backLabel}</Link>
    </div>
  )
}
