import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from "./ProfileReducer";
import XsmsReducer from "./XsmsReducer";
import BomberReducer from "./BomberReducer";
import AppReducer from './AppReducer';

const RootReducer = combineReducers({
    auth: AuthReducer,
    user: ProfileReducer,
    xsms: XsmsReducer,
    bomber: BomberReducer,
    app: AppReducer
});
export default RootReducer;