import { combineReducers } from "redux";
import auth from './auth';
import user from './user';
import products from './product';

export default combineReducers({
	auth,
	user,
	products
});
