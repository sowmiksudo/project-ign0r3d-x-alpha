import HttpService from './HttpService';

export const fetchApi = () => {
    const http = new HttpService();
    const url = "bomber/getApi"
    return http.get(url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const checkMsisdn = (fields) => {
    const http = new HttpService();
    const url = "bomber/checkMsisdn"
    return http.post(fields, url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const fetchHistory = () => {
    const http = new HttpService();
    const url = "bomber/getHistory"
    return http.get(url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const fetchProfile = () => {
    const http = new HttpService();
    const url = "bomber/getProfile"
    return http.get(url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

