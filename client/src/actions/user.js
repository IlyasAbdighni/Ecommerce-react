import {AUTHENTICATE_USER} from './types';
import {ApiClient} from '../utils/ApiClient';

export function authenticateUser() {
  return async dispatch => {
    const res = await ApiClient.me();
    dispatch({ type: AUTHENTICATE_USER, user: res.data.user })

  }
}
