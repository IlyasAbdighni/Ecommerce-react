import Auth from '../utils/Auth';
import {AUTH_ERROR} from './types';

export function signoutUser () {
  Auth.deauthenticateUser()
  return {
    type: UNAUTH_USER
  }
}


export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
