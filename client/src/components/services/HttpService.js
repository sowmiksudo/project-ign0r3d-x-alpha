export default class HttpService {
    url = "http://localhost:8000/api";
    postData = async (item, added_url, tokenId = "") => {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = this.postRequestOptions(token, item);
        return fetch(this.url + "/" + added_url, requestOptions).then(
            response => response.json()
        )
    }
    getData = async (added_url, tokenId = "") => {
        const token = await localStorage.getItem(tokenId);
        const requestOptions = this.getRequestOptions(token);
        return fetch(this.url + "/" + added_url, requestOptions).then(
            (response) => {
                if (response.status !== 200) {
                    throw {
                        "success": false,
                        "error": "Status not OK."
                    }
                } else {
                    return response.json()
                }
            }
        )
    }
    getRequestOptions = (token) => {
        let requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            }
        }
        return requestOptions;
    }
    postRequestOptions = (token, item) => {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item)
        }
        return requestOptions;
    }
}