import axios from '../axios'

const filesApi = {
    getFile(id) {
        return axios.get('/api/file/get-file/' + id);
    },

    createFile(data) {
        return axios.post(`/api/file/create-file`, data, {
            credentials: 'include',
            method: 'POST'
        });
    }, 

    updateFile(data) {
        return axios.put(`/api/file/update-file`, data, {
            credentials: 'include',
            method: 'PUT'
        });
    }
}


export default filesApi;