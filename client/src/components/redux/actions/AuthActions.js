import * as ActionTypes from '../ActionTypes';
import { RegisterUserService, LoginUserService, LogOutUserService } from '../../services/AuthServices';

export const RegisterAction = (credentials, navigate) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        dispatch({ type: ActionTypes.AUTH_LOADING });
        RegisterUserService(credentials).then((res) => {
            if(res.data.success){
                dispatch({ type: ActionTypes.SIGNUP_SUCCESS, res: res.data });
                navigate("/user")
            } else {
                dispatch({ type: ActionTypes.SIGNUP_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}
export const LoginAction = (credentials, navigate) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        dispatch({ type: ActionTypes.AUTH_LOADING });
        LoginUserService(credentials).then((res) => {
            const token = res.data.token
            if(res.data.success){
                localStorage.setItem('user-token', token)
                dispatch({ type: ActionTypes.LOGIN_SUCCESS, res: res.data });
                navigate('/user');
            } else {
                dispatch({ type: ActionTypes.LOGIN_ERROR, res: res.data });
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}
export const LogoutAction = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.RESTART_AUTH_RESPONSE });
        LogOutUserService().then((res) => {
            if(res.data.success){
                dispatch({ type: ActionTypes.LOGOUT_SUCCESS, res:res.data.data })
            }  else {
                dispatch({ type: ActionTypes.LOGOUT_ERROR, res: res.data })
            }
        }, error => {
            dispatch({ type: ActionTypes.CODE_ERROR, error })
        })
    }
}
