import { useSelector } from 'react-redux';
import store from '@/store/store';

const useJWT = () => {
    const state = store.getState();
    const jwt = state.system.userJWT;
    return jwt;
} ;

export default useJWT;