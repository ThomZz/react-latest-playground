import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <Link to="/">Go home</Link>
    </section>
  )
}
