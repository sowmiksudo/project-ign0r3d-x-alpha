import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from "./ProfileReducer";
const RootReducer = combineReducers({
    auth: AuthReducer,
    user: ProfileReducer,
});
export default RootReducer;