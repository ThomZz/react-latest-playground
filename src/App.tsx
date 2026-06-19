import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <span className="nav__brand">⚛️ React Playground</span>
        <div className="nav__links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
