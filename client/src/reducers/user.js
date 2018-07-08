import {AUTHENTICATE_USER} from '../actions/types';

export default function authenticatedUser(state = {}, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {...state, error: '', authenticated: true, user: action.user}
    default:
      return state;

  }
}
