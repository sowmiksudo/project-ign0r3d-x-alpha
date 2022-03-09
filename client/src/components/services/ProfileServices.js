import HttpService from './HttpService';

export const LoadProfile = () => {
    const http = new HttpService();
    let endpoint = "user/profile";
    return http.get(endpoint).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const UpdateProfile = (body) => {
    const http = new HttpService();
    let url = "user/profile/saveName";
    return http.post(body, url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}