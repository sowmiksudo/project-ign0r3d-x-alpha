import HttpService from './HttpService';

export const RegisterUserService = (credentials) => {
    const http = new HttpService();
    let signupUrl = "user/register";
    return http.post(credentials, signupUrl).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
}
export const LoginUserService = (credentials) => {
    const http = new HttpService();
    let loginUrl = "user/login";
    return http.post(credentials, loginUrl).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
}
export const LogOutUserService = () => {
    const http = new HttpService();
    let loginUrl = "user/logout";
    const tokenId = "user-token";
    localStorage.removeItem("user-token");
    return http.get(loginUrl, tokenId).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
}