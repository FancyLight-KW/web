import { combineReducers } from "redux";
import user from "./user";
import message from './message_reducer';

const rootReducer = combineReducers({
  user, message,
});

export default rootReducer;
