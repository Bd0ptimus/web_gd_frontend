import axios from 'axios';

async function loginCall(email, password) {
    const res = await axios.post(process.env.NEXT_PUBLIC_APP_AUTH_API_URL, { email: email, password: password });
    return {
        errCode: res.data.errCode,
        message: res.data.message,
        userData: res.data.userData,
        jwt: res.data.jwt
    }
}

async function autoLogin(JWT) {
    console.log('test JWT: ', ' - ', JWT);
    console.log('auto login ready : ');

    let res = await axios.post('http://localhost:3000/api/auth/auto-login', { data: JWT }, {
        headers: {
            'Authorization': 'Bearer ' + JWT,
            'Content-Type': 'application/json',

        },
        credentials: 'include',
        method: 'POST'

    });
    console.log('auto login : ', res);

    return {
        errCode: res.data.errCode,
        message: res.data.message,
        userData: res.data.userData,
        jwt: res.data.jwt
    }
}

export default {
    loginCall: loginCall,
    autoLogin: autoLogin,
};