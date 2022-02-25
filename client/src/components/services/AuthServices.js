import HttpService from './HttpService';
export const RegisterUserService = (credentials) => {
    const http = new HttpService();
    let signupUrl = "user/register";
    return http.postData(credentials, signupUrl).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
}
export const LoginUserService = (credentials) => {
    const http = new HttpService();
    let loginUrl = "user/login";
    return http.postData(credentials, loginUrl).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
}
export const LogOutUserService = () => {
    const http = new HttpService();
    let loginUrl = "user/logout";
    const tokenId = "user-token";
    return http.getData(loginUrl, tokenId).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
}