import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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

  render() {
    const name = this.state.view.name;
    let renders;
    if (name === 'catalog') {
      renders = <ProductList setView={this.setView} />;
    } else if (name === 'details') {
      renders = <ProductDetails view={this.state.view} click={this.setView} add={this.addToCart} />;
    }
    return (
      <div className="container-fluid">
        <Header cartItemCount={this.state.cart.length} />
        {
          renders
        }
      </div>
    );
  }
}
