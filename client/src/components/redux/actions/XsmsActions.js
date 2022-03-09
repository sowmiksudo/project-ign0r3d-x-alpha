import { fetchConfig, sendSms, fetchHistory, fetchProfile } from "./../../services/XsmsServices"
import * as ActionTypes from '../ActionTypes';

export const LoadConfigAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.XSMS_LOADING });
        fetchConfig().then((res) => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOAD_CONFIG_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_CONFIG_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}

export const SendMessageAction = (fields) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.XSMS_LOADING });
        sendSms(fields).then(res => {
            if(res.data.success){
                dispatch({ type: ActionTypes.SEND_SMS_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.SEND_SMS_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
        
    }
}

export const LoadHistoryAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.XSMS_LOADING });
        fetchHistory().then(res => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOAD_HISTORY_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_HISTORY_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
        
    }
}

export const LoadSmsProfileAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.XSMS_LOADING });
        fetchProfile().then(res => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOAD_XSMS_PROFILE_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_XSMS_PROFILE_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
        
    }
}
