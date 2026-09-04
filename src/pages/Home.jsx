import { Link } from 'react-router-dom'
import './Home.css'
import artwork from '../artwork.json'
import { artworkImages } from '../artworkImages.js'

export default function Home() {
  return (
    <div className="page home">
      <section className="hero container">
        <p className="hero-eyebrow">eyebrow text goes here</p>
        <h1>artwork by c leslie</h1>
        <p className="hero-lead">
          description text goes here
        </p>
        <div className="hero-actions">
          <Link to="/gallery" className="btn">
            View gallery
          </Link>
          <Link to="/order" className="btn btn--outline">
            Order prints
          </Link>
        </div>
      </section>
    </div>
  )
}
      {/* <section className="hero container">
        <p className="hero-eyebrow">eyebrow text goes here</p>
        <h1>artwork by c leslie</h1>
        <p className="hero-lead">
          description text goes here
        </p>
        <div className="hero-actions">
          <Link to="/gallery" className="btn">
            View gallery
          </Link>
          <Link to="/contact" className="btn btn--outline">
            Contact
          </Link>
        </div>
      </section> */}

      {/* <section className="featured container">
        <h2>featured work</h2>
        <div className="featured-grid">
          {[1, 2, 3].map((n) => (
            <article key={n} className="featured-card">
              <div className="featured-placeholder" aria-hidden="true" />
              <h3>Artwork title {n}</h3>
              <p>Medium · Year</p>
            </article>
          ))}
        </div>
      </section> */}