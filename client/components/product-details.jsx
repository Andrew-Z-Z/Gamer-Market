import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const productId = this.props.view.params.productId;
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(product => this.setState({ product: product }))
      .catch(err => console.error(err));
  }

  render() {
    const product = this.state.product;
    if (!product) return null;
    return (
      <div className="container">
        <div className="row my-4">
          <button className="btn btn-outline-success" onClick={() => this.props.click('catalog', {})} >Back to Catalog</button>
        </div>
        <div className="row">
          <img src={product.image} alt={product.name} className="img-thumbnail col-4"/>
          <div className="col-8">
            <p className="h4">{product.name}</p>
            <p> {'$' + (product.price / 100).toFixed(2)} </p>
            <p> {product.shortDescription} </p>
            <button className="btn btn-primary" onClick={() => this.props.add(product)} >Add To Cart</button>
          </div>
        </div>
        <div className="row">
          <p> {product.longDescription} </p>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
