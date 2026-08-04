import './Contact.css'

export default function Contact() {
  return (
    <div className="page contact container">
      <header className="page-header">
        <h1>Contact</h1>
        <p>
          Commission or collab? Send a message and I&apos;ll get back to you as soon as I can.
        </p>
      </header>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required />
          </div>
          <button type="submit" className="btn">
            Send message
          </button>
        </form>

        <aside className="contact-details">
          <h2>Other ways to reach me</h2>
          <ul>
            <li>
              <strong>Email</strong>
              <br />
              <a href="mailto:hello@example.com">hello@example.com</a>
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
