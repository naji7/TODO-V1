// import { combineReducers } from 'redux'
import tasks from "./tasks";
import { createStore, combineReducers } from "redux";
import User from "./user";

const rootReducer = combineReducers({
  tasks,
  User,
});
// const store = createStore(variables);

export default rootReducer;
