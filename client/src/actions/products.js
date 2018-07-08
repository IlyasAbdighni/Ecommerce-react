import {GET_PRODUCTS, SEARCH_ITEM} from './types';
import {ApiClient} from '../utils/ApiClient';

export function getProducts() {
  return async dispatch => {
    const res = await ApiClient.productsAll();
    dispatch({ type: GET_PRODUCTS, products: res.data })

  }
}

export function search(item) {
  return async dispatch => {
    const res = await ApiClient.search(item);
    dispatch({ type: SEARCH_ITEM, products: res.data })
  }
}
