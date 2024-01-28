import { combineReducers } from "redux";
import AuthReducer from "./auth";
import RegisterReducer  from "./auth";
import ApplicationReducer from "./application";

export default combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    application: ApplicationReducer,
});
