import axios from '../axios'

const requestsApi = {
    createRequests(body) {
        console.log('test addProducts api : ', body);
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        return axios.post(`/api/request/create-request`, body, {
            headers: headers,
            credentials: 'include',
            method: 'POST'
        });
    },

    getAllRequests() {
        return axios.get('/api/request/get-all-request');

    },

    updateRequestStatus(body, JWT) {
        console.log('test addProducts api : ', body, ' - ', JWT);
        const headers = {

            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT,
        }
        return axios.put(`/api/request/update-request-status`, body, {
            headers: headers,
            credentials: 'include',
            method: 'PUT'
        });
    },

    getRequestData(requestCode) {
        return axios.get('/api/request/find-request/' + requestCode);

    }
}


export default requestsApi;