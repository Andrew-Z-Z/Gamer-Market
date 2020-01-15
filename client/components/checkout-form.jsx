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
    return (
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
        <div className="form-group">
          <button type="submit" className="btn btn-outline-primary" onClick={() => this.props.click(this.state.user)}>Check Out</button>
        </div>
      </form>
    );
  }
}

export default CheckoutForm;
