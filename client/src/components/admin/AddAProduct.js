import React from 'react'
import { Button, Form, Container, Segment } from 'semantic-ui-react'
import {ApiClient} from '../../utils/ApiClient';
import { ToastContainer, toast } from 'react-toastify';

class AddProduct extends React.Component {

  state = {name:'', price: '', quantity: '', submiting: false}

  handleChange = (e) => {
    const {target} = e;
    switch (target.name) {
      case 'name':
        this.setState({ name: target.value })
        break;
      case 'price':
          this.setState({ price: target.value })
          break;
      case 'quantity':
          this.setState({ quantity: target.value })
          break;
      default:

    }
  }

  handleSubmit = e => {
    this.setState({ submiting: true })
    const {name, price, quantity} = this.state;
    if (name, price, quantity) {
      ApiClient.addProduct({name, price, quantity})
        .then(res => {
          toast.info("Product has been successfully added.")
          this.setState({ submiting: false });
        })
        .catch(err => {
          console.log('Error:', err);
          this.setState({ submiting: false });
        });
    }
  }

  render() {
    return (
      <Container>
        <Segment >
          <Form onSubmit={this.handleSubmit} >
            <Form.Field>
              <label>Product name</label>
              <input name='name' type='text' placeholder='Product Name' required onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input name='price' type='number' placeholder='Product Price' required onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Quantity</label>
              <input name='quantity' type='number' placeholder='Quantity' required onChange={this.handleChange} />
            </Form.Field>
            <Button type='submit'>Save</Button>
          </Form>
          <ToastContainer autoClose={3000} />
        </Segment>
      </Container>
    )
  }
}

export default AddProduct
