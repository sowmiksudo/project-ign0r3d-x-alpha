import { LoadProfile } from '../../services/ProfileServices';
import * as ActionTypes from '../ActionTypes';
export const LoadProfileAction = () => {
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
