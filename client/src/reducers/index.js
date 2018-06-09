import { combineReducers } from "redux";

export default combineReducers({
	auth: () => ({ authenticated: true })
});
