import * as ActionTypes from '../ActionTypes';

const initState = {
    loading: true,
    success: false,
    profile: null
}

const ProfileReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.PROFILE_LOADING:
            return {
                ...state,
                loading:true
            };
        case ActionTypes.LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                profile: action.res
            };
        case ActionTypes.LOAD_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                profile: action.res
            };
        case ActionTypes.CODE_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                profile: "Something went wrong!"
            };
        default:
            return state;
    }
};
export default ProfileReducer;
