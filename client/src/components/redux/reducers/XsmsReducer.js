import * as ActionTypes from '../ActionTypes';

const init = {
    loading: true,
    config_success: false,
    config: null,
    success: false,
    response: null,
    history_success: false,
    history: null,
    profile_success: false,
    profile: null
}

const XsmsReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.XSMS_LOADING:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.LOAD_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                config_success: true,
                config: action.res
            };
        case ActionTypes.LOAD_CONFIG_ERROR:
            return {
                ...state,
                loading: false,
                config_success: false,
            };
        case ActionTypes.LOAD_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                history_success: true,
                history: action.res
            };
        case ActionTypes.LOAD_HISTORY_ERROR:
            return {
                ...state,
                loading: false,
                history_success: false,
            };
        case ActionTypes.SEND_SMS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.res
            };
        case ActionTypes.SEND_SMS_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                response: action.res
            };

        case ActionTypes.LOAD_XSMS_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile_success: true,
                profile: action.res
            };
        case ActionTypes.LOAD_XSMS_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                profile_success: false,
                profile: action.res
            };

        case ActionTypes.CODE_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                profile: { success: false, message: "Unknown error occured." }
            };
        default:
            return state;
    }
};
export default XsmsReducer;
