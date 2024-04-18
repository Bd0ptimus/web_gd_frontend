import axios from '../axios'
import axiosRequest from '@/helpers/axiosRequest';
const filesApi = {
    getFile(id) {
        return axiosRequest.get(`/api/file/get-file/${id}`)
    },

    createFile(data) {
        return axiosRequest.post(`/api/file/create-file`, data, {
            credentials: 'include',
            method: 'POST'
        })
    }, 

    updateFile(data) {
        return axiosRequest.put(`/api/file/update-file`, data, {
            credentials: 'include',
            method: 'PUT'
        })
    }
}


export default filesApi;