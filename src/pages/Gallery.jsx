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
            <div className="gallery-image-box">
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
            </div>
            <div className="gallery-info">
              <p classname="gallery-title-medium"><span className="gallery-title">{work.title}</span> <span className="gallery-medium">{work.medium}</span></p>
              {work.series && <p className="gallery-series">{work.series}</p>}
              {work.notes && <p className="gallery-notes">{work.notes}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
