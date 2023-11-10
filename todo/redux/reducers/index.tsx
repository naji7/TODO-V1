// import { combineReducers } from 'redux'
import tasks from "./tasks";
import { createStore,combineReducers } from "redux";

const rootReducer = combineReducers({
    tasks
})
// const store = createStore(variables);

export default rootReducer;