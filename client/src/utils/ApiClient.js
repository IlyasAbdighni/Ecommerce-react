import axios from 'axios';

export const ApiClient = {
  me: () => axios.get('/user/me'),
  login: (email, password) => axios.post('/login', {email, password}),
  register: (email, password) => axios.post('/register', {email, password}),
  homeProducts: () => axios.get('/products/home'),
  productsAll: () => axios.get('/products/all'),
  addProduct: ({name, price, quantity}) => axios.post('/admin/product/add',{name, price, quantity}),
  getAllUsers: () => axios.get('/admin/users'),
  search: (item) => {
    console.log('apiclient: ', item);
    return axios.post('/products/search', {search: item})
  }
}
