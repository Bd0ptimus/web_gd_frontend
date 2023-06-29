import AuthApi from '@/api/auth';
export default async function autoAuth(JWT) {
    let res = await AuthApi.autoLogin(JWT);
    // console.log('autoAuth : ', res);

}