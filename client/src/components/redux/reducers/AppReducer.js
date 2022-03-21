import * as ActionTypes from '../ActionTypes';
const initState = {
    loading: true,
    success: false,
    app: null
};
const AppReducer = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_APP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                app:action.res
            }
        case ActionTypes.LOAD_APP_ERROR:
            return {
                ...state,
                loading: false,
                success: false
            }
        case ActionTypes.CODE_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                app: "There seems to be a problem, please refresh your browser",
            };
        default:
            return state;
    }
};
export default AppReducer;
