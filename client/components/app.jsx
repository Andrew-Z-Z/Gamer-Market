import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckOut from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };

    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }, this.getCartItems));
  }

  setView(name, params) {
    this.setState(
      {
        view: {
          name: name,
          params: params
        }
      }
    );
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(items => this.setState({ cart: items }))
      .catch(err => this.setState({ message: err.message }));
  }

  addToCart(product) {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', init)
      .then(response => response.json())
      .then(addedProduct => this.setState(state => {
        const newCart = state.cart.concat(addedProduct);
        return { cart: newCart };
      }))
      .catch(err => this.setState({ message: err.message }));
  }

  removeFromCart(cartItemId) {
    const init = {
      method: 'DELETE'
    };
    fetch(`/api/cart/${cartItemId}`, init)
      .then(() => this.setState(state => {
        const newCart = state.cart.filter(item => item.cartItemId !== cartItemId);
        return { cart: newCart };
      }))
      .catch(err => console.error(err));
  }

  placeOrder(userInfo) {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    };
    fetch('/api/orders', init)
      .then(response => response.json())
      .then(placedOrder => this.setState(
        { cart: [], view: { name: 'catalog', params: {} } }
      ))
      .catch(err => this.setState({ message: err.message }));
  }

  render() {
    const name = this.state.view.name;
    let renders;
    if (name === 'catalog') {
      renders = <ProductList setView={this.setView} />;
    } else if (name === 'details') {
      renders = <ProductDetails view={this.state.view} click={this.setView} add={this.addToCart} />;
    } else if (name === 'cart') {
      renders = <CartSummary click={this.setView} cartArray={this.state.cart} remove={this.removeFromCart} />;
    } else if (name === 'checkout') {
      renders = <CheckOut click={this.placeOrder} cartArray={this.state.cart} back={this.setView} />;
    }
    return (
      <div className="container-fluid">
        <Header cartItemCount={this.state.cart.length} click={this.setView} />
        {
          renders
        }
      </div>
    );
  }
}
