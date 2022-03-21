import HttpService from './HttpService';

export const fetchApp = () => {
    const http = new HttpService();
    const url = "batchInfo"
    return http.get(url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}