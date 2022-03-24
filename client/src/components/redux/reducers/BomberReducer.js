import * as ActionTypes from '../ActionTypes';

const init = {
    loading: true,
    api_success: false,
    apis: null,
    history_success: false,
    history: null,
    profile_success: false,
    profile: null,
    check_success: false,
    check_response: null,
    delete: null,
    blacklist: null,
    add_blacklist: null,
    delete_blacklist: null,
    add_api:null,
    import:null
}

const XsmsReducer = (state = init, action) => {
    switch (action.type) {
        case ActionTypes.BOMBER_LOADING:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.LOAD_API_SUCCESS:
            return {
                ...state,
                loading: false,
                api_success: true,
                apis: action.res
            };
        case ActionTypes.LOAD_API_ERROR:
            return {
                ...state,
                loading: false,
                api_success: false,
            };
        case ActionTypes.LOAD_BOMBING_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                history_success: true,
                history: action.res
            };
        case ActionTypes.LOAD_BOMBING_HISTORY_ERROR:
            return {
                ...state,
                loading: false,
                history_success: false,
            };
        case ActionTypes.CHECK_MSISDN_SUCCESS:
            return {
                ...state,
                loading: false,
                check_success: true,
                check_response: action.res
            };
        case ActionTypes.CHECK_MSISDN_ERROR:
            return {
                ...state,
                loading: false,
                check_success: false,
                check_response: action.res
            };

        case ActionTypes.LOAD_BOMBER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile_success: true,
                profile: action.res
            };
        case ActionTypes.LOAD_BOMBER_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                profile_success: false,
                profile: action.res
            };
        case ActionTypes.DELETE_API_SUCCESS:
            return {
                ...state,
                loading: false,
                delete: action.res
            };
        case ActionTypes.DELETE_API_ERROR:
            return {
                ...state,
                loading: false,
                delete: action.res
            };

        case ActionTypes.LOAD_BLACKLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                blacklist: action.res
            };
        case ActionTypes.LOAD_BLACKLIST_ERROR:
            return {
                ...state,
                loading: false,
                blacklist: action.res
            };

        case ActionTypes.ADD_BLACKLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                add_blacklist: action.res
            };
        case ActionTypes.ADD_BLACKLIST_ERROR:
            return {
                ...state,
                loading: false,
                add_blacklist: action.res
            };

        case ActionTypes.DELETE_BLACKLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                delete_blacklist: action.res
            };
        case ActionTypes.DELETE_BLACKLIST_ERROR:
            return {
                ...state,
                loading: false,
                delete_blacklist: action.res
            };
        case ActionTypes.ADD_API_SUCCESS:
            return {
                ...state,
                loading: false,
                add_api: action.res
            };
        case ActionTypes.ADD_API_ERROR:
            return {
                ...state,
                loading: false,
                add_api: action.res
            };
        case ActionTypes.IMPORT_API_SUCCESS:
            return {
                ...state,
                loading: false,
                import: action.res
            };
        case ActionTypes.IMPORT_API_ERROR:
            return {
                ...state,
                loading: false,
                import: action.res
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
