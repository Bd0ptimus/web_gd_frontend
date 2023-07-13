import actionTypes from '../action/actionTypes';
import * as Constants from '../../config/constants/Constants';


const initState = {
    language: "vi",
    userLoggedIn: false,
    userId: "",
    userName: "",
    userEmail: "",
    userJWT: ""
}
const systemReducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.APP_LANGUAGE_UPDATE:
            return {
                ...state, language: action.langId,
            };
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log('in actionTypes.USER_LOGIN_SUCCESS');

            return {
                ...state,
                userLoggedIn: action.userLoggedIn,
                userId: action.userId,
                userName: action.userName,
                userEmail: action.userEmail,
                userJWT: action.userJWT
            };
        case actionTypes.USER_LOGOUT:
            console.log('in actionTypes.USER_LOGOUT');
            return {
                ...state,
                userLoggedIn: action.userLoggedIn,
                userId: action.userId,
                userName: action.userName,
                userEmail: action.userEmail,
                userJWT: action.userJWT
            };
        default:
            return state;
    }
}

export default systemReducer;