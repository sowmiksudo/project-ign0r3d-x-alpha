import { LoadProfile, UpdateProfile, ChangePassword } from '../../services/ProfileServices';
import * as ActionTypes from '../ActionTypes';
export const LoadProfileAction = (navigate) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.PROFILE_LOADING });
        LoadProfile().then((res) => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOAD_PROFILE_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_PROFILE_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}

export const UpdateProfileAction = (body) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.PROFILE_LOADING });
        UpdateProfile(body).then((res) => {
            if(res.data.success){
                dispatch({ type: ActionTypes.UPDATE_PROFILE_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.UPDATE_PROFILE_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}

export const ChangePasswordAction = (body) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.PROFILE_LOADING });
        ChangePassword(body).then((res) => {
            if(res.data.success){
                dispatch({ type: ActionTypes.CHANGE_PASSWORD_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.CHANGE_PASSWORD_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}
