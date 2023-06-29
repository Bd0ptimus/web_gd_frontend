'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
// import Cookies from 'universal-cookie';
import { setCookie } from 'cookies-next';
import styles from './index.module.scss'
import AuthApi from '../../../api/auth';
import * as actions from "../../../store/action";

function Login({ lang, changeLoginState }) {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwShowned, setPwShowned] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter()
    if (isLoggedIn) {
        router.push("/admin/products/productCategoryManager");
        return
    }

    function showPwHandler() {
        setPwShowned(!pwShowned);
    }


    function handleResponse(res) {
        console.log(res);
        if (res.errCode != 0) {
            toast.warning(`${res.message}`, {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            toast.success(`${res.message}`, {
                position: toast.POSITION.TOP_RIGHT
            });
            const userData = res.userData.user;
            changeLoginState({
                userId: userData.id,
                userName: userData.name,
                userEmail: userData.email,
                jwt: res.jwt
            });
            setCookie('isLoggedIn', true, {
                maxAge: 60 * 60 * 24 * 30,
            })
            setCookie('JWT', res.jwt, {
                maxAge: 60 * 60 * 24 * 30,
            })
            setIsLoggedIn(true);
        }
    }

    function submitHandler() {
        if (email == '' || pw == '') {
            toast.warning("Vui lòng nhập đầy đủ thông tin!", {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            AuthApi.loginCall(email, pw).then((p) => handleResponse(p)).catch((e) => console.log(e))
        }
    }

    return (
        <div className={`d-flex justify-content-center ${styles.loginMain}`}>
            <div className={`d-block justify-content-center  ${styles.formSec}`}>
                <div className={`d-flex justify-content-center`}>
                    <Image
                        src="/logo/logo_vert.webp"
                        width={200}
                        height={200}
                        alt="Logo"
                    />
                </div>
                <h6><FormattedMessage id="auth.login"></FormattedMessage></h6>
                <div className={`form-floating ${styles.inputSec}`}>
                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label><FormattedMessage id="userParams.email"></FormattedMessage></label>
                </div>
                <div className={`form-floating ${styles.inputSec}`}>
                    <input onChange={(e) => { setPw(e.target.value) }} type={!pwShowned ? `password` : `text`} className="form-control" id="floatingPassword" placeholder="Password" />
                    <label ><FormattedMessage id="userParams.password"></FormattedMessage></label>
                </div>


                <div className="checkbox d-flex justify-content-center">
                    <label>
                        <input type="checkbox" value="remember-me" onClick={() => showPwHandler()} /> <FormattedMessage id="auth.showPw"></FormattedMessage>
                    </label>
                </div>
                <div className="d-flex justify-content-center">
                    <div onClick={() => submitHandler()} className={`${styles.loginBtn} d-flex justify-content-center`}><FormattedMessage id="auth.login"></FormattedMessage></div>
                </div>
            </div>
            <ToastContainer />

        </div>
    );
}

function mapStateToProps(state) {
    return { lang: state.system.language };
}

function mapDispatchToProps(dispatch) {
    return {
        changeLoginState: (userData) => dispatch(actions.changeUserLoginState(userData)),
    };
}

// export async function getServerSideProps(context) {
//     // Apply the middleware to this route
//     return isLoggedInMiddleware(async () => {
//         // This code will only execute if isLoggedIn is true
//         return {
//             props: {},
//         };
//     })(context.req, context.res);
// }

export default connect(mapStateToProps, mapDispatchToProps)(Login);