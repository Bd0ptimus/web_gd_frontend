import React, { Component, useState } from 'react';
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

function HeaderCpn({ isLoggedIn, userName, userLogout }) {
    const [isMenuOpened, setMenuOpened] = useState(false);
    const [isUserControlPanelOpened, setUserControlPanelOpened] = useState(false);
    const router = useRouter()

    const handleOpenMenu = () => {
        setMenuOpened(!isMenuOpened);
    }

    function logoClickHandler() {
        router.replace("/");

    }

    function logoutHandler() {
        console.log('logoutHandler');
        userLogout();

        setCookie('isLoggedIn', false, {
            maxAge: 60 * 60 * 24 * 30,
        })
        setCookie('JWT', '', {
            maxAge: 60 * 60 * 24 * 30,
        })

    }

    function usernameLoginSection(isLoggedIn) {
        if (isLoggedIn) {
            return (
                <div className={`d-block justify-content-center`}>
                    <div className={`${styles.usernameLoginSec} d-flex justify-content-end`} onClick={() => setUserControlPanelOpened(!isUserControlPanelOpened)}>
                        <p>{userName}</p>  <FontAwesomeIcon icon={faCaretDown} />
                    </div>

                    <div className={`${styles.userControlPanel}`} style={{ display: isUserControlPanelOpened ? 'block' : 'none' }}>
                        <ul>
                            <li><FontAwesomeIcon icon={faCartShopping} className={`${styles.controlPanelIcon}`} />Đơn hàng</li>
                            <li onClick={() => logoutHandler()} ><FontAwesomeIcon icon={faArrowRightFromBracket} className={`${styles.controlPanelIcon}`} />Đăng xuất </li>
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

    return (
        <div>
            <div className={`${styles.headerMain} d-block justify-content-center`}>
                <div className={`${styles.headerSubTop} d-flex justify-content-between`}>
                    <div className={`${styles.rightSec} ${styles.headerSec}  d-flex justify-content-center`} style={{ width: '100%', }}>
                        <div className={`${styles.infoSec}  d-flex justify-content-start`}>
                            <FontAwesomeIcon onClick={() => { handleOpenMenu() }} icon={isMenuOpened ? faXmark : faBars} className={` ${styles.fontIcon}`} />
                            <MenuCpn></MenuCpn>

                        </div>
                    </div>
                </div>
                <div className={`${styles.headerMainTop} d-flex justify-content-between`}>
                    <div className={`${styles.leftSec} ${styles.headerSec} d-flex justify-content-start`}>
                        <div className={`${styles.infoSec}  d-flex justify-content-start`}>
                            {/* <FontAwesomeIcon onClick={() => { handleOpenMenu() }} icon={isMenuOpened ? faXmark : faBars} className={` ${styles.fontIcon}`} /> */}

                            <Image
                                onClick={() => logoClickHandler()}
                                src="/logo/logo.webp"
                                width={500}
                                height={500}
                                className={`${styles.logo}`}
                                alt="Logo"
                            />

                        </div>
                    </div>

                    <div className={`${styles.midSec} ${styles.headerSec}  justify-content-center`}>
                        <div className={`${styles.infoSec}  d-flex justify-content-around`}>
                            <div className={`d-block`}>
                                <p className={`${styles.infoText}`}> Tỷ giá:</p>
                                <p className={`${styles.infoText}`}> USD/VND : 23,672.50 VND</p>
                                <p className={`${styles.infoText}`}> USD/RUB : 90,53 RUB </p>
                            </div>
                            <div className={`d-block`}>
                                <p className={`${styles.infoText}`}> Giá cước tham khảo:</p>
                                <p className={`${styles.infoText}`}> Theo cân : 15$/Kg</p>
                                <p className={`${styles.infoText}`}> Bảo hiểm : 10% </p>

                            </div>
                        </div>
                    </div>

                    <div className={`${styles.rightSec} ${styles.headerSec}  d-flex justify-content-center`}>
                        <div className={`${styles.infoSec}  d-flex justify-content-end`}>

                            {
                                usernameLoginSection(isLoggedIn)
                            }

                        </div>

                    </div>
                </div>

                {/* <div className={`${styles.headerMainSec} d-flex justify-content-start`}>
                    <MenuPcCpn></MenuPcCpn>
                </div> */}

            </div >
            <div style={{ display: isMenuOpened ? 'block' : 'none' }} className={`${styles.mbMenuSec}`}>
                <MenuMbCpn closeMenu={handleOpenMenu}></MenuMbCpn>

            </div>
        </div>

    );
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.system.userLoggedIn,
        userName: state.system.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(actions.userLogout()),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCpn);