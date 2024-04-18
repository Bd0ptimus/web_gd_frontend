import useAxiosRequest from '@/helpers/axiosRequest';

async function adminLoginCall(email, password) {
    const axiosRequest = useAxiosRequest();
    const res = await axiosRequest.axiosPost('/api/auth/login' , { email: email, password: password }, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST'

    })

    return {
        errCode: res.errCode,
        message: res.message,
        userData: res.data.user,
        jwt: res.data.jwt
    }
}

async function autoLogin(JWT) {
    let res = await axios.post(process.env.NEXT_PUBLIC_APP_AUTO_AUTH_API_URL, { data: JWT }, {
        headers: {
            'Authorization': 'Bearer ' + JWT,
            'Content-Type': 'application/json',

        },
        credentials: 'include',
        method: 'POST'

    });

    return {
        errCode: res.data.errCode,
        message: res.data.message,
        userData: res.data.userData,
        jwt: res.data.jwt
    }
}

async function userLogin(email, password) {
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