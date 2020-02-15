import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import products from "./product";
import cartReducer from "./cart/reducer";
import totalReducer from "./total/reducer";

export default combineReducers({
  auth,
  user,
  products,
  cart: cartReducer,
  total: totalReducer
});
