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
import {logoutProcessOnCookie} from '@/helpers/commonFunction';

function HeaderCpn({ userName, userLogout, userRole }) {
    const [isMenuOpened, setMenuOpened] = useState(false);
    const [isUserControlPanelOpened, setUserControlPanelOpened] = useState(false);
    const [enableHeader, setEnableHeader] = useState(true)
    const [mainPath, setMainPath] = useState('')
    const router = useRouter()
    // useEffect(() => {
    //     if (router.pathname === '/admin/login') {
    //       setEnableHeader(false);
    //     } else {
    //       setEnableHeader(true);
    //     }
    //     setMainPath(router.pathname.split('/')[1]);
    // }, [router.pathname]);

    useEffect(() => {
        let firstPath = router.pathname.split('/')[1];
        if (firstPath == 'admin') {
            firstPath += `/${router.pathname.split('/')[2]}`
        }
        setMainPath(firstPath);
        setMenuOpened(false);
    }, [router.pathname]);
    
    const handleOpenMenu = () => {
        setMenuOpened(!isMenuOpened);
    }

    function logoClickHandler() {
        router.replace("/");
    }

    function logoutHandler() {
        userLogout();
        logoutProcessOnCookie();
        router.replace("/admin/login");
    }

    return enableHeader && (
        <div>
            <div className={`${styles.headerMain} d-flex justify-content-center`}>
                <div className={`${styles.leftSec} ${styles.headerSec}  d-flex justify-content-center`}>
                    <div className={`${styles.infoSec}  d-flex justify-content-center`}>
                        {/* <FontAwesomeIcon onClick={() => { handleOpenMenu() }} icon={isMenuOpened ? faXmark : faBars} className={` ${styles.fontIcon}`} /> */}
                        <Image
                            onClick={() => logoClickHandler()}
                            src="/logo/logo.png"
                            width={200}
                            height={48}
                            className={`${styles.logo}`}
                            alt="Logo"
                        />
                    </div>
                </div>
                <div className={`${styles.midSec} ${styles.headerSec} d-flex justify-content-start`}>
                    <div className={`${styles.infoSec}  d-flex justify-content-end`}>
                        <MenuCpn path={mainPath} logout={() => logoutHandler()}></MenuCpn>
                    </div>
                </div>

                <div className={`${styles.rightSec} ${styles.headerSec}  d-flex justify-content-center`}>
                    <div className={`${styles.infoSec}  d-flex justify-content-end`}  style={{width:'100%'}}>
                        <div className={`mx-3 my-0 p-2 d-flex justify-content-center ${styles.mbAltIcon}`}>
                            <FontAwesomeIcon onClick={() => { handleOpenMenu() }} icon={isMenuOpened ? faXmark : faBars} className={`mt-1 ${styles.fontIcon}`} />
                        </div>
                    </div>
                </div>
            </div >
            <div style={{ display: isMenuOpened ? 'block' : 'none' }} className={`${styles.mbMenuSec}`}>
                <MenuMbCpn refresh={isMenuOpened} path={mainPath} onClose={() => { handleOpenMenu() }} />
            </div>

        </div>

    );
}

function mapStateToProps(state) {
    return {
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