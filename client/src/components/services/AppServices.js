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

export const postFeedback = (fields) => {
    const http = new HttpService();
    const url = "feedback"
    return http.post(fields, url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}