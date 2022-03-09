import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from "./ProfileReducer";
import XsmsReducer from "./XsmsReducer";
import BomberReducer from "./BomberReducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
    user: ProfileReducer,
    xsms: XsmsReducer,
    bomber: BomberReducer
});
export default RootReducer;