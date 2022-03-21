import HttpService from './HttpService';

export const fetchApi = () => {
    const http = new HttpService();
    const url = "bomber/api/get"
    return http.get(url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const checkMsisdn = (fields) => {
    const http = new HttpService();
    const url = "bomber/bombing"
    return http.post(fields, url).then(data => {
        return data;    
    }).catch((error) => {
        return error;
    });
}

export const deleteApi = (id) => {
    const http = new HttpService();
    const url = "bomber/api/delete/"+id
    return http.get(url).then(data=>{
        return data
    }).catch(err => {
        return err;
    })
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

export const fetchBlacklists = () => {
    const http = new HttpService();
    const url = "bomber/blacklists"
    return http.get(url).then(data=>{
        return data;
    }).catch(err=>{
        return err;
    })
}

export const addBlacklist = (fields) => {
    const http = new HttpService();
    const url = "bomber/blacklist"
    return http.post(fields, url).then(data=>{
        return data;
    }).catch(err=>{
        return err;
    });
}

export const deleteBlacklist = (id) => {
    const http = new HttpService();
    const url = "bomber/blacklist/delete/"+id
    return http.get(url).then(data=>{
        return data;
    }).catch(err=>{
        return err;
    });
}
