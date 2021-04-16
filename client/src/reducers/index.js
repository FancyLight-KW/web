import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import message from './message_reducer';

const rootReducer = combineReducers({
  user,
  auth,
  message,
});

export default rootReducer;
