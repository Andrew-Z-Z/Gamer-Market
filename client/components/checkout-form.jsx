import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const targetId = event.target.id;
    const targetValue = event.target.value;
    this.setState(state => {
      state.user[targetId] = targetValue;
      return { user: state.user };
    });
  }

  render() {
    const cartArray = this.props.cartArray;
    let totalPrice = 0;
    if (cartArray) {
      cartArray.forEach(element => { totalPrice += parseInt(element.price, 10); });
    }
    const flexClass = ' d-flex justify-content-between align-items-center';
    return (
      <div className="container">
        <div>
          <p className="h3 my-3">Check Out</p>
          <p className="my-4"> {`Total Price: $${(totalPrice / 100).toFixed(2)}`} </p>
        </div>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Your Name" id="name" onChange={this.handleChange} required/>
          </div>
          <div className="form-group">
            <label>Credit Card Number</label>
            <input type="text" className="form-control" placeholder="Credit Card Number" id="creditCard" onChange={this.handleChange} required/>
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <textarea className="form-control" rows="5" id="shippingAddress" onChange={this.handleChange} required></textarea>
          </div>
          <div className={'form-group' + flexClass}>
            <div className={'cursor' + flexClass} onClick={() => this.props.back('catalog', {})}>
              <i className="fas fa-chevron-left mr-1"></i>
              <p className="m-0 text-muted">Continue Shopping</p>
            </div>
            <button type="submit" className="btn btn-outline-primary" onClick={() => this.props.click(this.state.user)}>Check Out</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
