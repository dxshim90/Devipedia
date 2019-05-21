import { combineReducers } from "redux";
import alert from "./Alert.js";
import auth from "./Auth.js";
import profile from "./Profile.js";

export default combineReducers({
  alert,
  auth,
  profile
});
