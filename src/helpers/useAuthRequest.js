import { connect } from 'react-redux';

const useAuthRequest = () => {
    const authRequest = {
        doLogout () {
            // userLogout();

            setCookie('isLoggedIn', false, {
                maxAge: 60 * 60 * 24 * 30,
            })
            setCookie('JWT', '', {
                maxAge: 60 * 60 * 24 * 30,
            })
            setCookie('roleUser', null, {
                maxAge: 60 * 60 * 24 * 30,
            })
        }
    }

    return authRequest
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(actions.userLogout()),

    };
}

export default (useAuthRequest);
