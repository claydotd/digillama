import './Gallery.css'
import artwork from '../artwork.json'
import { artworkImages } from '../artworkImages.js'

export default function Gallery() {
  return (
    <div className="page gallery container">
      <header className="page-header">
        <h1>Gallery</h1>
        <p>A selection of available originals and prints.</p>
      </header>

      <div className="gallery-grid">
        {artwork.map((work, index) => (
          <article key={`${work.image}-${index}`} className="gallery-item">
            {artworkImages[work.image] ? (
              <img
                className="gallery-image"
                src={artworkImages[work.image]}
                alt={work.title}
              />
            ) : (
              <div
                className="gallery-image gallery-image--missing"
                aria-hidden="true"
              />
            )}
            <div className="gallery-info">
              <h3>{work.title}</h3>
              {work.series && <p className="gallery-series">{work.series}</p>}
              <p>{work.medium}</p>
              {work.notes && <p className="gallery-notes">{work.notes}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
