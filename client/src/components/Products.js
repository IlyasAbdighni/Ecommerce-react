import React from 'react';
import {Container, Segment, Input} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Items from './item-list/Items';
import {getProducts, search} from '../actions/products';

class Products extends React.Component {

  state = {
    products: [],
    success: false,
    loading: true
  }

  componentDidMount() {
    this.props.dispatch(getProducts());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.products && nextProps.products.success) {
      this.setState({ products: nextProps.products.products, loading: false, success: nextProps.products.products })
    }
  }

  handleSearch = (e) => {
    const item = e.target.value
    if(item == '') {
      this.props.dispatch(getProducts());
    } else {
        this.props.dispatch(search(item));
    }
  }

  render() {
    const {products, loading} = this.state;
    return (
      <Container>
        <Segment loading={loading} >
        <Input name='search' onChange={this.handleSearch} fluid icon='search' placeholder='Search...' style={{ marginBottom: '50px', marginTop: '30px' }} />
        {loading ? null : <Items products={products} />}
        </Segment>
      </Container>
    )
  }
}

export default connect(({products}) => ({ products: products.products }))(Products);
