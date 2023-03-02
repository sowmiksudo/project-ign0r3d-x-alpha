import HttpService from './HttpService';

export const fetchConfig = () => {
    const http = new HttpService();
    const url = "sms/getConfig"
    return http.get(url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const fetchHistory = () => {
    const http = new HttpService();
    const url = "sms/getHistory"
    return http.get(url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const fetchProfile = () => {
    const http = new HttpService();
    const url = "sms/getProfile"
    return http.get(url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const sendSms = (fields) => {
    const http = new HttpService();
    const url = "sms/sendSingleSms"
    return http.post(fields, url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}