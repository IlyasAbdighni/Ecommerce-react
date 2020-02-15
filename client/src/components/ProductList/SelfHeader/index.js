import React from "react";
import PropTypes from "prop-types";

// import Sort from '../Sort';

const ShelfHeader = props => {
  return (
    <div className="shelf-container-header">
      <span>{props.productsLength} Product(s) found.</span>
      {/* <Sort /> */}
    </div>
  );
};

ShelfHeader.propTypes = {
  productsLength: PropTypes.number.isRequired
};

export default ShelfHeader;
