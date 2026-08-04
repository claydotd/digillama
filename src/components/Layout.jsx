import { Outlet } from 'react-router-dom'
import Nav from './Nav'

export default function Layout() {
  return (
    <div className="site-layout">
      <Nav />
      <div className="site-content">
        <main>
          <Outlet />
        </main>
        <footer className="site-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} C Leslie. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
