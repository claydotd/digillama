import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/order', label: 'Order a print!' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav({ customCursor, onCustomCursorChange }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="nav-header">
      <div className="nav-inner container">
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          digillama.
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav
          id="site-nav"
          className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}
        >
          <ul>
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`nav-cursor-toggle${customCursor ? ' nav-cursor-toggle--on' : ''}`}
            aria-pressed={customCursor}
            onClick={() => onCustomCursorChange(!customCursor)}
          >
            <span className="nav-cursor-toggle-label">Fun cursor</span>
            <span className="nav-cursor-toggle-switch" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  )
}
