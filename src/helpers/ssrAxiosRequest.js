import axios from '../axios'
import Router from 'next/router';
import cookie from 'cookie';
import * as Constants from '@/config/constants/Constants';

const refactorResponse = (rawData) => {
    return rawData.data
}
const checkTokenIsInvalid = (context, rawData) => {
    if (rawData.response && rawData.response.status == 401) {
        const { res } = context;
        res.writeHead(302, { Location: '/admin/login' });
        res.end();
    }
}
const getJWT = (context) => {
    try {
        const { req } = context;
        const cookies = req.headers.cookie;
        const parsedCookies = cookie.parse(cookies || '');
        const jwt = parsedCookies['JWT'];
        return jwt;
    } catch (e) {
        return ''
    }

}

export async function ssrAxiosGet(context, path, addOn = {}) {
    const jwt = getJWT(context)
    if (!addOn.method || addOn.method != 'GET') {
        addOn.method = 'GET'
    }
    addOn.credentials = 'include',
    addOn.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
    }
    // const response = await axios.get(path, header);
    try {
        const response = await axios.get(path, addOn)
        return refactorResponse(response);
    } catch (e) {
        checkTokenIsInvalid(context, e)
        return null
    }
}

export async function ssrAxiosPost(context, path, data = {}, addOn = {}) {
    const jwt = getJWT(context)
    if (!addOn.method || addOn.method != 'POST') {
        addOn.method = 'POST'
    }
    addOn.credentials = 'include',
    addOn.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
    }
    try {
        const response = await axios.post(path, data, addOn)
        return refactorResponse(response);
    } catch (e) {
        checkTokenIsInvalid(e)
        return null
    }
}

export async function ssrAxiosPut(context, path, data = {}, addOn = {}) {
    const jwt = getJWT(context)
    if (!addOn.method || addOn.method != 'PUT') {
        addOn.method = 'PUT'
    }
    addOn.credentials = 'include',
    addOn.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
    }
    try {
        const response = await axios.put(path, data, addOn)
        return refactorResponse(response);
    } catch (e) {
        checkTokenIsInvalid(e)
        return null
    }
}

export async function ssrAxiosDelete(context, path, addOn = {}) {
    const jwt = getJWT(context)
    if (!addOn.method || addOn.method != 'DELETE') {
        addOn.method = 'DELETE'
    }
    addOn.credentials = 'include',
    addOn.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt,
    }
    try {
        const response = await axios.delete(path, addOn)
        return refactorResponse(response);
    } catch (e) {
        checkTokenIsInvalid(e)
        return null
    }
}

