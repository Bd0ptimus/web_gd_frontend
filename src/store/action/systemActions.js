import actionTypes from './actionTypes';

export const changeSystemLanguage = (langId) => ({
    type: actionTypes.APP_LANGUAGE_UPDATE,
    langId: langId,
});

export const changeUserLoginState = (userData) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userLoggedIn: true,
    userId: userData.userId,
    userName: userData.userName,
    userEmail: userData.userEmail,
    userJWT: userData.jwt,
    userRole: userData.userRole,
});

export const userLogout = () => ({
    type: actionTypes.USER_LOGOUT,
    userLoggedIn: false,
    userId: '',
    userName: '',
    userEmail: '',
    userJWT: '',
    userRole: null,
});
