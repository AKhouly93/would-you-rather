import { users, questions, authedUser } from "./reducers";
import { combineReducers } from "redux";

export default  combineReducers({ users, questions, authedUser })