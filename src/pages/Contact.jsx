import { useMemo, useState } from 'react'
import './Contact.css'

const CONTACT_EMAIL = 'hello@analoguegonedigital.co.uk'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const isFormComplete = useMemo(
    () =>
      name.trim().length > 0 &&
      isValidEmail(email.trim()) &&
      subject.length > 0 &&
      message.trim().length > 0,
    [name, email, subject, message],
  )

  function handleSubmit(e) {
    e.preventDefault()
    if (!isFormComplete) return

    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n')

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="page contact container">
      <header className="page-header">
        <h1>Contact</h1>
        <p>
          Want to order one of my originals or commission a piece? Send a message and I&apos;ll get back to you as soon as I can.
        </p>
      </header>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              required
              aria-required="true"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              aria-required="true"
            />
          </div>

          <div className="form-field">
            <label htmlFor="subject">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              aria-required="true"
            >
              <option value="">Select a subject</option>
              <option value="Order request">Order request</option>
              <option value="Commission request">Commission request</option>
              <option value="Other">General enquiry</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me what you're looking for..."
              required
              aria-required="true"
            />
          </div>

          <p className="contact-form-hint">
            {isFormComplete
              ? 'The button below will open your email client with your message ready to send.'
              : 'Please fill in all fields to send your message.'}
          </p>

          <button type="submit" className="btn" disabled={!isFormComplete}>
            Send message
          </button>
        </form>

        <aside className="contact-details">
          <h2>Other ways to reach me</h2>
          <ul>
            <li>
              <strong>Email</strong>
              <br />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <strong>Instagram</strong>
              <br />
              <a
                href="https://www.instagram.com/digi_llama/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @digi_llama
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
