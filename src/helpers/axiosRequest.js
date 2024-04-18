import axios from '../axios'
import { useSelector } from 'react-redux';
import Router from 'next/router';

const refactorResponse = (rawData) => {
    return rawData.data
}
const checkTokenIsInvalid = (rawData) => {
    if (rawData.status == 401) {
        Router.push(`/admin/login`);
    }
}
const useAxiosRequest = () => {
    const jwt = useSelector((state) => state.system.userJWT); 
    const axiosRequest = {
        async axiosGet(path, addOn = {}) {
            if (!addOn.method || addOn.method != 'GET') {
                addOn.method = 'GET'
            }
            addOn.credentials = 'include',
            addOn.headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            }
            // const response = await axios.get(path, header);
            let response = {}
            try {
                response = await axios.get(path, addOn)
            }catch (e) {
                response = e.response
            }
            checkTokenIsInvalid(response);
            return refactorResponse(response);
        },
    
        async axiosPost(path, data = {}, addOn = {}) {
            if (!addOn.method || addOn.method != 'POST') {
                addOn.method = 'POST'
            }
            addOn.credentials = 'include',
            addOn.headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            }
            let response = {}
            try {
                response =  await axios.post(path, data, addOn)
            }catch (e) {
                response = e.response
            }
            checkTokenIsInvalid(response);
            return refactorResponse(response);
        },
    
        async axiosPut(path, data = {}, addOn = {}) {
            if (!addOn.method || addOn.method != 'PUT') {
                addOn.method = 'PUT'
            }
            addOn.credentials = 'include',
            addOn.headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            }

            let response = {}
            try {
                response =  await axios.put(path, data, addOn)
            }catch (e) {
                response = e.response
            }
            checkTokenIsInvalid(response);
            return refactorResponse(response);
        },

        async axiosDelete(path, addOn = {}) {
            if (!addOn.method || addOn.method != 'DELETE') {
                addOn.method = 'DELETE'
            }
            addOn.credentials = 'include',
            addOn.headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            }
            let response = {}
            try {
                response =  await axios.delete(path, addOn)
            }catch (e) {
                response = e.response
            }
            checkTokenIsInvalid(response);
            return refactorResponse(response);
        }
    }
    return axiosRequest;
}

export default useAxiosRequest;
