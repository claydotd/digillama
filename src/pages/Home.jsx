import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import artwork from '../artwork.json'
import { artworkImages } from '../artworkImages.js'

const FEATURED_COUNT = 5

function shufflePick(items, count) {
  const pool = items.filter((work) => artworkImages[work.image])
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function randomSigned(min, max) {
  const magnitude = randomBetween(min, max)
  return Math.random() < 0.5 ? -magnitude : magnitude
}

export default function Home() {
  const [featured] = useState(() =>
    shufflePick(artwork, FEATURED_COUNT).map((work, index) => ({
      work,
      rotate: randomSigned(7, 20),
      fromRotate: randomSigned(28, 58),
      delay: 0.05 + index * 0.12,
      shiftY: randomBetween(-16, 24),
      size: randomBetween(0.9, 1.12),
    })),
  )
  const [entered, setEntered] = useState(false)
  const [settled, setSettled] = useState({})

  useEffect(() => {
    let innerFrame = 0
    const frame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(innerFrame)
    }
  }, [])

  return (
    <div className="page home">
      <section className="hero container">
        <p className="hero-eyebrow">@digi_llama</p>
        <h1>artwork by catriona</h1>
        <p className="hero-lead">
          Welcome to my digital art gallery! I'm an artist based in Scotland, and I have some prints for sale at Leith Makers. :){' '}
          You can find more of a selection of my work here, and order prints
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

      <section className="home-scatter" aria-label="A few pieces from the gallery">
        {featured.map(({ work, rotate, fromRotate, delay, shiftY, size }) => (
          <Link
            key={work.image}
            to="/gallery"
            className={[
              'home-piece',
              entered ? 'home-piece--in' : '',
              settled[work.image] ? 'home-piece--settled' : '',
            ].join(' ')}
            style={{
              '--rotate': `${rotate}deg`,
              '--from-rotate': `${fromRotate}deg`,
              '--delay': `${delay}s`,
              '--shift-y': `${shiftY}px`,
              '--size': size,
            }}
            onTransitionEnd={(event) => {
              if (event.propertyName !== 'transform') return
              setSettled((prev) =>
                prev[work.image] ? prev : { ...prev, [work.image]: true },
              )
            }}
          >
            <span className="home-piece-frame">
              {artworkImages[work.image] ? (
                <img src={artworkImages[work.image]} alt={work.title} />
              ) : (
                <span className="home-piece-missing" aria-hidden="true" />
              )}
            </span>
            <span className="home-piece-caption">{work.title}</span>
          </Link>
        ))}
      </section>
    </div>
  )
}
