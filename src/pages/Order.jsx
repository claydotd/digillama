import { useState, useMemo } from 'react'
import artwork from '../artwork.json'
import { artworkImages } from '../artworkImages.js'
import './Order.css'

const DEFAULT_PRICES = {
  A5: 12,
  A6: 8,
  'Greeting Card': 8,
}

const SIZES = ['A5', 'A6', 'Greeting Card']
const DEFAULT_SIZE = 'A5'
const CURRENCY = '£'

function getPrice(work, size) {
  return work.prices?.[size] ?? DEFAULT_PRICES[size]
}

function formatPrice(amount) {
  return `${CURRENCY}${amount.toFixed(2)}`
}

function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, '-')
}

function PieceThumb({ work }) {
  if (artworkImages[work.image]) {
    return (
      <img
        className="order-piece-thumb"
        src={artworkImages[work.image]}
        alt=""
      />
    )
  }
  return <div className="order-piece-thumb order-piece-thumb--missing" aria-hidden="true" />
}

function PieceInfo({ work }) {
  return (
    <span className="order-piece-info">
      <span className="order-piece-title">{work.title}</span>
      {work.series && <span className="order-piece-series">{work.series}</span>}
      <span className="order-piece-prices">
        from {formatPrice(Math.min(...SIZES.map((s) => getPrice(work, s))))}
      </span>
    </span>
  )
}

function formatSizeBreakdown(work, sizes) {
  const counts = {}
  for (const size of sizes) {
    counts[size] = (counts[size] || 0) + 1
  }

  return Object.entries(counts).map(([size, qty]) => {
    const unitPrice = getPrice(work, size)
    const lineTotal = unitPrice * qty
    const qtyLabel = qty === 1 ? '1×' : `${qty}×`
    return `    ${qtyLabel} ${size} (${formatPrice(unitPrice)} each) — ${formatPrice(lineTotal)}`
  })
}

function getPieceTotal(work, sizes) {
  return sizes.reduce((sum, size) => sum + getPrice(work, size), 0)
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function ConstructEmailBody(selectedWorks, selections, form) {
  const { name, email, phone, address, postcode, country, notes } = form

  const lines = [
    'New order request',
    '',
    'CONTACT DETAILS',
    '────────────────',
    `Name:     ${name}`,
    `Email:    ${email}`,
  ]

  if (phone.trim()) lines.push(`Phone:    ${phone}`)

  const addressParts = [address, postcode, country].filter((part) => part.trim())
  if (addressParts.length > 0) {
    lines.push(`Address:  ${addressParts.join(', ')}`)
  }

  lines.push('', 'ORDER', '────────────────')

  let orderTotal = 0

  for (const work of selectedWorks) {
    const slug = slugify(work.title)
    const selection = selections[slug]
    if (!selection) continue

    const pieceTotal = getPieceTotal(work, selection.sizes)
    orderTotal += pieceTotal

    lines.push('')
    lines.push(work.title)
    if (work.series) lines.push(`  Series: ${work.series}`)
    lines.push(`  Quantity: ${selection.quantity}`)
    lines.push('  Sizes:')
    lines.push(...formatSizeBreakdown(work, selection.sizes))
    lines.push(`  Subtotal: ${formatPrice(pieceTotal)}`)
  }

  lines.push('', 'TOTAL', '────────────────', formatPrice(orderTotal))

  if (notes.trim()) {
    lines.push('', 'NOTES', '────────────────', notes.trim())
  }

  return encodeURIComponent(lines.join('\n'))
}

export default function Order() {
  const orderableArtwork = useMemo(
    () => artwork.filter((work) => work.orderable),
    [],
  )

  const [selections, setSelections] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('')
  const [notes, setNotes] = useState('')

  const isFormComplete = useMemo(
    () =>
      name.trim().length > 0 &&
      isValidEmail(email.trim()) &&
      phone.trim().length > 0 &&
      address.trim().length > 0 &&
      postcode.trim().length > 0 &&
      country.trim().length > 0,
    [name, email, phone, address, postcode, country],
  )

  function togglePiece(slug) {
    setSelections((prev) => {
      if (prev[slug]) {
        const next = { ...prev }
        delete next[slug]
        return next
      }
      return { ...prev, [slug]: { quantity: 1, sizes: [DEFAULT_SIZE] } }
    })
  }

  function setQuantity(slug, quantity) {
    const qty = Math.max(1, Math.min(99, quantity))
    setSelections((prev) => {
      const current = prev[slug]
      if (!current) return prev

      const sizes = [...current.sizes]
      while (sizes.length < qty) sizes.push(DEFAULT_SIZE)
      while (sizes.length > qty) sizes.pop()

      return { ...prev, [slug]: { quantity: qty, sizes } }
    })
  }

  function setSize(slug, index, size) {
    setSelections((prev) => {
      const current = prev[slug]
      if (!current) return prev

      const sizes = [...current.sizes]
      sizes[index] = size
      return { ...prev, [slug]: { ...current, sizes } }
    })
  }

  const total = useMemo(() => {
    let sum = 0
    for (const [slug, { sizes }] of Object.entries(selections)) {
      const work = orderableArtwork.find((w) => slugify(w.title) === slug)
      if (!work) continue
      for (const size of sizes) {
        sum += getPrice(work, size)
      }
    }
    return sum
  }, [selections, orderableArtwork])

  const selectedCount = Object.keys(selections).length
  const canSubmit = isFormComplete && selectedCount > 0

  const selectedWorks = orderableArtwork.filter((work) => selections[slugify(work.title)])
  const availableWorks = orderableArtwork.filter((work) => !selections[slugify(work.title)])

  return (
    <div className="page order container">
      <header className="page-header">
        <h1>Order</h1>
        <p>Select the pieces you&apos;d like to order, choose a size for each copy, and submit your request.</p>
      </header>

      <form className="order-form" onSubmit={(e) => e.preventDefault()}>
        <section className="order-section">
          <h2>Your information</h2>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="postcode">Post Code</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>
        </section>

        <section className="order-section">
          <h2>Choose your pieces</h2>
          {orderableArtwork.length === 0 ? (
            <p className="order-empty">No pieces are available to order right now.</p>
          ) : availableWorks.length === 0 ? (
            <p className="order-empty">All available pieces have been added.</p>
          ) : (
            <ul className="order-pieces">
              {availableWorks.map((work) => {
                const slug = slugify(work.title)

                return (
                  <li key={slug} className="order-piece">
                    <button
                      type="button"
                      className="order-piece-select"
                      onClick={() => togglePiece(slug)}
                      aria-label={`Add ${work.title}`}
                    >
                      <PieceThumb work={work} />
                      <PieceInfo work={work} />
                      <span className="order-piece-check" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <section className="order-section">
          <h2>Selected</h2>
          {selectedCount === 0 ? (
            <p className="order-empty">no pieces selected.</p>
          ) : (
            <ul className="order-selected-pieces">
              {selectedWorks.map((work) => {
                const slug = slugify(work.title)
                const selection = selections[slug]

                return (
                  <li key={slug} className="order-piece order-piece--selected">
                    <button
                      type="button"
                      className="order-piece-select"
                      onClick={() => togglePiece(slug)}
                      aria-label={`Remove ${work.title}`}
                    >
                      <PieceThumb work={work} />
                      <PieceInfo work={work} />
                      <span className="order-piece-check" aria-hidden="true">
                        ×
                      </span>
                    </button>

                    {selection && (
                      <div className="order-piece-options">
                        <div className="order-quantity">
                          <label htmlFor={`qty-${slug}`}>Quantity</label>
                          <div className="order-quantity-controls">
                            <button
                              type="button"
                              className="order-qty-btn"
                              onClick={() => setQuantity(slug, selection.quantity - 1)}
                              disabled={selection.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              id={`qty-${slug}`}
                              className="order-qty-input"
                              min={1}
                              max={99}
                              value={selection.quantity}
                              onChange={(e) => setQuantity(slug, parseInt(e.target.value, 10) || 1)}
                            />
                            <button
                              type="button"
                              className="order-qty-btn"
                              onClick={() => setQuantity(slug, selection.quantity + 1)}
                              disabled={selection.quantity >= 99}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <ul className="order-size-list">
                          {selection.sizes.map((size, index) => (
                            <li key={index} className="order-size-row">
                              <label htmlFor={`size-${slug}-${index}`}>
                                Copy {index + 1}
                              </label>
                              <select
                                id={`size-${slug}-${index}`}
                                value={size}
                                onChange={(e) => setSize(slug, index, e.target.value)}
                              >
                                {SIZES.map((s) => (
                                  <option key={s} value={s}>
                                    {s} — {formatPrice(getPrice(work, s))}
                                  </option>
                                ))}
                              </select>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>
        <section className="order-section">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={5}
                placeholder="Add any notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </section>
        {selectedCount > 0 && (
          <section className="order-total" aria-live="polite">
            <span className="order-total-label">Total</span>
            <span className="order-total-amount">{formatPrice(total)}</span>
          </section>
        )}
        <p><em>Please note, this is a mock-up only. The form is not yet functional, but will be connected to backend functionality once the site is ready to officially go live.</em></p>
        <button
          type="button"
          className="btn-order"
          disabled={!canSubmit}
          onClick={() => {
            if (!canSubmit) return
            window.location.href = `mailto:hello@analoguegonedigital.co.uk?subject=${encodeURIComponent('Order request')}&body=${ConstructEmailBody(selectedWorks, selections, {
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim(),
              address: address.trim(),
              postcode: postcode.trim(),
              country: country.trim(),
              notes,
            })}`
          }}
        >
          Request Order
        </button>
      </form>
    </div>
  );
}
