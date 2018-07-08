import { AUTHENTICATE_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types'

export default function authReducer (state = {}, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {...state, error: '', authenticated: true, user: action.user}
    case UNAUTH_USER:
      return {...state, authenticated: false, user: null}
    case AUTH_ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}
