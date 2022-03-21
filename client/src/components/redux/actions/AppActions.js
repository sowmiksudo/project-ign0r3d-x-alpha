import { fetchApp } from '../../services/AppServices';
import * as ActionTypes from '../ActionTypes';
export const LoadAppAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.APP_LOADING });
        fetchApp().then((res) => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOAD_APP_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_APP_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}