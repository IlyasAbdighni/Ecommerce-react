import React from "react";
import "./style.css";

import Product from "./Product";
import SelfHeader from "./SelfHeader";

const ProductList = ({ products }) => {
  return (
    <div>
      <SelfHeader productsLength={products.length} />
      <div className="list_items">
        {products.items.map(p => (
          <Product product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
