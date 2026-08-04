import './Order.css'
export default function Order() {
  return (
    <div className="page-order">
      <h1>Order</h1>
      <section className="order-form">
        <h2>Your information</h2>
        <form className="form">
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
            </div>
            <br />
            <h2>Which pieces do you want to order?</h2>
            <div className="piece">
                <input type="checkbox" id="pieces1" name="pieces1" value="north-shore" />
                <label htmlFor="pieces1">North shore</label>
            </div>
            <div className="piece">
                <input type="checkbox" id="pieces2" name="pieces2" value="dogs" />
                <label htmlFor="pieces2">Dogs</label>
            </div>
            <div className="piece">
                <input type="checkbox" id="pieces3" name="pieces3" value="cats" />
                <label htmlFor="pieces3">Cats</label>
            </div>
            <button type="submit" className="btn-order">
            Submit order
          </button>
        </form>
      </section>
    </div>
  )
}