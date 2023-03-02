import axios from "axios";

export default class HttpService {
        
    
    constructor(){
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.url = "http://localhost:8000";
        } else {
            this.url = decodeURIComponent(escape(window.atob("aHR0cHM6Ly9hcGkubW9qaWJyc20uY29tL2FwaQ==")));
        }
    }

    getHeaders = () => {
        const token = localStorage.getItem("user-token");
        return {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }

    post = (item, endpoint) => {
        return axios({
            method: 'POST',
            url: `${this.url}/${endpoint}`,
            headers: this.getHeaders(),
            data: JSON.stringify(item)
        })
    }

    get = async(endpoint) => {
        return axios({
            method: 'GET',
            url: `${this.url}/${endpoint}`,
            headers: this.getHeaders()
        })
    }
}