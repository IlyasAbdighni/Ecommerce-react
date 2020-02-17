import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Thumb from "../../share/Thumb";
import { formatPrice } from "../../share/utils";
import { addProduct } from "../../../reducers/cart/actions";

const Product = ({ product, addProduct }) => {
  product.quantity = 1;

  let formattedPrice = formatPrice(product.price, product.currencyId);

  let productInstallment;

  if (product.installments) {
    const installmentPrice = product.price / product.installments;

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }

  return (
    <div
      className="shelf-item"
      onClick={() => addProduct(product)}
      data-sku={product.sku}
    >
      {product.isFreeShipping && (
        <div className="shelf-stopper">Free shipping</div>
      )}
      <Thumb
        classes="shelf-item__thumb"
        src={product.image.url}
        alt={product.image.title}
      />
      <div className="item_infor">
        <p className="shelf-item__title">{product.name}</p>
        <p>
          <span>Prices: $</span>
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
          {productInstallment}
        </p>
        <p>Total Products: {product.quantity}</p>
      </div>
      <p className="shelf-item__buy-btn">ADD TO CARD</p>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(Product);
