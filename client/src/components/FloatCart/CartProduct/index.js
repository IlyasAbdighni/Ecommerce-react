import React, { Component } from "react";
import PropTypes from "prop-types";

import Thumb from "../../share/Thumb";
import { formatPrice } from "../../share/utils";

class CartProduct extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    removeProduct: PropTypes.func.isRequired,
    changeProductQuantity: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      isMouseOver: false
    };
  }

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  handleOnIncrease = () => {
    const { changeProductQuantity } = this.props;
    const { product } = this.state;
    product.quantity = product.quantity + 1;
    changeProductQuantity(product);
  };

  handleOnDecrease = () => {
    const { changeProductQuantity } = this.props;
    const { product } = this.state;
    product.quantity = product.quantity - 1;
    changeProductQuantity(product);
  };

  render() {
    const { removeProduct } = this.props;
    const { product } = this.state;

    const classes = ["item"];

    if (!!this.state.isMouseOver) {
      classes.push("item--mouseover");
    }

    return (
      <div className={classes.join(" ")}>
        <div
          className="item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeProduct(product)}
        />
        <Thumb
          classes="item__thumb"
          src="https://f0.pngfuel.com/png/981/639/white-shopping-cart-illustration-png-clip-art.png"
          alt={product.title}
        />
        <div className="item__details">
          <p className="title">{product.title}</p>
          <p className="desc">
            {`${product.availableSizes[0]} | ${product.style}`} <br />
            Quantity: {product.quantity}
          </p>
        </div>
        <div className="item__price">
          <p>{`${product.currencyFormat}  ${formatPrice(product.price)}`}</p>
          <div>
            <button
              onClick={this.handleOnDecrease}
              disabled={product.quantity === 1 ? true : false}
              className="change-product-button"
            >
              -
            </button>
            <button
              onClick={this.handleOnIncrease}
              className="change-product-button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
