import React, { Component, useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';
import {
    faCartShopping,
    faArrowRightFromBracket,
    faCaretDown,
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { setCookie } from 'cookies-next';

import styles from './header.module.scss';
import MenuCpn from '../sections/menuCpn';
import MenuMbCpn from '../sections/menuMbCpn';
import * as actions from "@/store/action";

function HeaderCpn({ isLoggedIn, userName, userLogout, userRole }) {
    const [isMenuOpened, setMenuOpened] = useState(false);
    const [isUserControlPanelOpened, setUserControlPanelOpened] = useState(false);
    const [enableHeader, setEnableHeader] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (router.pathname === '/admin/login') {
          setEnableHeader(false);
        } else {
          setEnableHeader(true);
        }
    }, [router.pathname]);

    const handleOpenMenu = () => {
        setMenuOpened(!isMenuOpened);
    }

    function logoClickHandler() {
        router.replace("/");
    }

    function logoutHandler() {
        userLogout();

        setCookie('isLoggedIn', false, {
            maxAge: 60 * 60 * 24 * 30,
        })
        setCookie('JWT', '', {
            maxAge: 60 * 60 * 24 * 30,
        })
        setCookie('roleUser', null, {
            maxAge: 60 * 60 * 24 * 30,
        })
        router.replace("/admin/login");

    }

    function usernameLoginSection(isLoggedIn) {
        if (isLoggedIn) {
            return (
                <div className={`d-block justify-content-center ${styles.usernameHeader}`}>
                    <div className={`${styles.usernameLoginSec} d-flex justify-content-start`} onClick={() => setUserControlPanelOpened(!isUserControlPanelOpened)}>
                        <p>{userName}</p>
                        {/* <FontAwesomeIcon icon={faCaretDown} /> */}
                    </div>

                    <div className={`${styles.userControlPanel}`} style={{ display: isUserControlPanelOpened ? 'block' : 'none' }}>
                        <ul>
                            <li className={`d-flex justify-content-center`}><FontAwesomeIcon icon={faCartShopping} className={`${styles.controlPanelIcon}`} />Đơn hàng</li>
                            <li className={`d-flex justify-content-center`} onClick={() => logoutHandler()} ><FontAwesomeIcon icon={faArrowRightFromBracket} className={`${styles.controlPanelIcon}`} />Đăng xuất </li>
                        </ul>
                    </div>
                </div>

            );
        } else {
            return (
                <div className={`${styles.usernameLoginSec} d-flex justify-content-end`}>
                    <Link href="/admin/login" style={{ textDecoration: 'none', }}>Đăng nhập</Link>
                </div>
            );
        }
    }

    return enableHeader && (
        <div>
            <div className={`${styles.headerMain} d-block justify-content-center`}>
                <div className={`${styles.headerSubTop} d-flex justify-content-between`}>
                    <div className={`${styles.rightSec} ${styles.headerSec}  d-flex justify-content-center`} style={{ width: '100%', }}>
                        <div className={`${styles.infoSec}  d-flex justify-content-start`}>
                            <FontAwesomeIcon onClick={() => { handleOpenMenu() }} icon={isMenuOpened ? faXmark : faBars} className={` ${styles.fontIcon}`} />
                            <MenuCpn logout={() => logoutHandler()}></MenuCpn>

                        </div>
                    </div>
                </div>
                <div className={`${styles.headerMainTop} d-flex justify-content-between`}>
                    <div className={`${styles.leftSec} ${styles.headerSec} d-flex justify-content-start`}>
                        <div className={`${styles.infoSec}  d-flex justify-content-start`}>
                            <FontAwesomeIcon onClick={() => { handleOpenMenu() }} icon={isMenuOpened ? faXmark : faBars} className={`mt-1 ${styles.fontIcon}`} />
                            <p className={`${styles.appName} mt-2`}>App Hỗ Trợ Quét КИЗ</p>
                            {/* <Image
                                        onClick={() => logoClickHandler()}
                                        src="/logo/logo.webp"
                                        width={500}
                                        height={500}
                                        className={`${styles.logo}`}
                                        alt="Logo"
                                    /> */}

                        </div>
                    </div>
                </div>
            </div >
            <div style={{ display: isMenuOpened ? 'block' : 'none' }} className={`${styles.mbMenuSec}`}>
                <MenuMbCpn logout={() => logoutHandler()} closeMenu={handleOpenMenu}></MenuMbCpn>
            </div>

        </div>

    );
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.system.userLoggedIn,
        userName: state.system.userName,
        userRole: state.system.userRole
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(actions.userLogout()),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCpn);