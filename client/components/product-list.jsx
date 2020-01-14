import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => this.setState({ products: products }))
      .catch(err => console.error(err));
  }

  render() {
    const products = this.state.products;
    return (
      <div className="container">
        <ProductListItem items={products} click={this.props.setView} />
      </div>
    );
  }
}

export default ProductList;
