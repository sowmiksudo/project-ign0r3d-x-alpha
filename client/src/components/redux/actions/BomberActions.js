import { fetchApi, checkMsisdn, fetchHistory, fetchProfile } from "./../../services/BomberServices"
import * as ActionTypes from '../ActionTypes';

export const LoadApiAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.XSMS_LOADING });
        fetchApi().then((res) => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOAD_API_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_API_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}

export const CheckMsisdnAction = (number) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.XSMS_LOADING });
        checkMsisdn({msisdn:number}).then(res => {
            if(res.data.success){
                dispatch({ type: ActionTypes.CHECK_MSISDN_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.CHECK_MSISDN_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
        
    }
}

export const LoadBombingHistoryAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.XSMS_LOADING });
        fetchHistory().then(res => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOAD_BOMBING_HISTORY_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_BOMBING_HISTORY_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
        
    }
}

export const LoadBomberProfileAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.XSMS_LOADING });
        fetchProfile().then(res => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOAD_BOMBER_PROFILE_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_BOMBER_PROFILE_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
        
    }
}
