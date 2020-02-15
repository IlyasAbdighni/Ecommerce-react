import React from "react";
import { Container, Segment, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { getProducts, search } from "../actions/products";
import ProductList from "./ProductList";

export const PRODUCT_LIST = {
  length: 5,
  items: [
    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      currencyId: 1,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: true
    },

    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      currencyId: 2,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: true
    },
    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      currencyId: 3,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: false
    },
    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      currencyId: 2,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: true
    },
    {
      quantity: 1,
      name: "T-shirt",
      price: 5,
      currencyId: 3,
      image: {
        title: "T-shirt",
        url: "https://i.stack.imgur.com/xskB0.jpg"
      },
      isFreeShipping: false
    }
  ]
};
class Products extends React.Component {
  state = {
    products: [],
    success: false,
    loading: true
  };

  componentDidMount() {
    this.props.dispatch(getProducts());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products && nextProps.products.success) {
      this.setState({
        products: nextProps.products.products,
        loading: false,
        success: nextProps.products.products
      });
    }
  }

  handleSearch = e => {
    const item = e.target.value;
    if (item == "") {
      this.props.dispatch(getProducts());
    } else {
      this.props.dispatch(search(item));
    }
  };

  render() {
    const { products, loading } = this.state;
    return (
      <Container>
        <Segment loading={loading}>
          <Input
            name="search"
            onChange={this.handleSearch}
            fluid
            icon="search"
            placeholder="Search..."
            style={{ marginBottom: "50px", marginTop: "30px" }}
          />
          <ProductList products={PRODUCT_LIST} />
        </Segment>
      </Container>
    );
  }
}

export default connect(({ products }) => ({ products: products.products }))(
  Products
);
