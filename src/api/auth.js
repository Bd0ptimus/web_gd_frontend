import axios from 'axios';

async function adminLoginCall(email, password) {
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

    let res = await axios.post(process.env.NEXT_PUBLIC_APP_AUTO_AUTH_API_URL, { data: JWT }, {
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

async function userLogin(email, password) {
    console.log('email : ', email, ' password : ', password);
    let res = await axios.post(process.env.NEXT_PUBLIC_APP_BACKEND_URL + '/api/auth/user-login', { email: email, password: password }, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST'

    });

    return res;
}
export default {
    adminLoginCall: adminLoginCall,
    autoLogin: autoLogin,
    userLogin: userLogin,
};