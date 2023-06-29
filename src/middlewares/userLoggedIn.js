import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

export function isLoggedInMiddleware(handler) {
    return async (req, res) => {
        const cookies = new Cookies(req.headers.cookie);
        const isLoggedIn = cookies.get('isLoggedIn');
        console.log('check islog in : ', isLoggedIn);
        // const isLoggedIn = JSON.parse(localStorage.getItem('persist:system')).userLoggedIn;
        const router = useRouter();

        if (!isLoggedIn) {
            router.replace('/');
            return;
        }

        return handler(req, res);
    };
}