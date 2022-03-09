import * as ActionTypes from '../ActionTypes';
const initState = {
    loading: true,
    success: false,
    response: null
};
const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.RESTART_AUTH_RESPONSE:
            return {
                ...state,
                loading:false,
                success: false
            };
        case ActionTypes.AUTH_LOADING:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.res
            };
        case ActionTypes.SIGNUP_ERROR:
            return {
                ...state,
                success: false,
                loading: false,
                response: action.res,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.res
            };
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                success: false,
                loading: false,
                response: action.res,
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.res,
            };
        case ActionTypes.LOGOUT_ERROR:
            return {
                ...state,
                success: false,
                loading: false,
                authResponse: action.res,
            };
        case ActionTypes.CODE_ERROR:
            return {
                ...state,
                loading:false,
                success: false,
                response: "There seems to be a problem, please refresh your browser",
            };
        default:
            return state;
    }
};
export default AuthReducer;
