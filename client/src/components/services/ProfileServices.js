import HttpService from './HttpService';

export const LoadProfile = () => {
    const http = new HttpService();
    let profileUrl = "user/profile";
    const tokenId = "user-token";
    return http.get(profileUrl, tokenId).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}