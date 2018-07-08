import {GET_PRODUCTS, SEARCH_ITEM} from '../actions/types';

export default function products(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, error: null, products: action.products, success: true};
    case SEARCH_ITEM:
      return {...state, error: null, products: action.products, success: true}
    default:
      return state;
  }
}
