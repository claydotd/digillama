import './Gallery.css'

const placeholderWorks = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `Artwork title ${i + 1}`,
  medium: 'Medium',
  year: '2026',
  price: '£000',
}))

export default function Gallery() {
  return (
    <div className="page gallery container">
      <header className="page-header">
        <h1>Gallery</h1>
        <p>
          A selection of available originals and prints. Replace these
          placeholders with your own images and details.
        </p>
      </header>

      <div className="gallery-grid">
        {placeholderWorks.map((work) => (
          <article key={work.id} className="gallery-item">
            <div className="gallery-image" aria-hidden="true" />
            <div className="gallery-info">
              <h3>{work.title}</h3>
              <p>
                {work.medium} · {work.year}
              </p>
              <p className="gallery-price">{work.price}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
