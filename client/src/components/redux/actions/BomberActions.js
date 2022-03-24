import { importApi, addApi, addBlacklist, deleteBlacklist, fetchApi, checkMsisdn, fetchHistory, fetchProfile, deleteApi, fetchBlacklists } from "./../../services/BomberServices"
import * as ActionTypes from '../ActionTypes';
import { useDispatch } from "react-redux";

export const LoadApiAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        fetchApi().then((res) => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.LOAD_API_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_API_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}

export const CheckMsisdnAction = (fields) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        checkMsisdn(fields).then(res => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.CHECK_MSISDN_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.CHECK_MSISDN_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })

    }
}


export const DeleteApiAction = (id) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        deleteApi(id).then(res => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.DELETE_API_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.DELETE_API_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
    }
}


export const LoadBombingHistoryAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        fetchHistory().then(res => {
            if (res.data.success) {
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
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        fetchProfile().then(res => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.LOAD_BOMBER_PROFILE_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_BOMBER_PROFILE_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })

    }
}


export const LoadBlacklistedAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        fetchBlacklists().then(res => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.LOAD_BLACKLIST_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.LOAD_BLACKLIST_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
    }
}

export const AddBlacklistedAction = (fields) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        addBlacklist(fields).then(res => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.ADD_BLACKLIST_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.ADD_BLACKLIST_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
    }
}

export const DeleteBlacklistedAction = (id) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        deleteBlacklist(id).then(res => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.DELETE_BLACKLIST_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.DELETE_BLACKLIST_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
    }
}

export const AddApiAction = (fields) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        addApi(fields).then(res => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.ADD_API_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.ADD_API_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
    }
}


export const ImportApiAction = (config) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.BOMBER_LOADING });
        importApi(config).then(res => {
            if (res.data.success) {
                dispatch({ type: ActionTypes.IMPORT_API_SUCCESS, res: res.data });
            } else {
                dispatch({ type: ActionTypes.IMPORT_API_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, res: error });
        })
    }
}
