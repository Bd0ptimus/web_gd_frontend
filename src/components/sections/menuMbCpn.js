import Link from 'next/link';
import React, { Component, useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineHome, AiOutlineLock, AiOutlineMail, AiFillFacebook  } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';
import { RiMessage2Line } from 'react-icons/ri';
import { BsTelephone, BsWhatsapp } from 'react-icons/bs';


import styles from './menuMb.module.scss';
import { MENUS } from '../../data/menuList';
import FooterCpn from '@/components/layouts/footerCpn';
import * as Constants from '@/config/constants/Constants';
function MenuMbCpn({ userLoggedIn, closeMenu, userRole, logout, expireDate }) {
    const [expireString, setExpireString] = useState('');

    useEffect(() => {
        const date = new Date(expireDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        setExpireString(formattedDate)
    })
    return (
        <div className={`${styles.menuMain} d-block justify-content-center`}>
            {/* <FontAwesomeIcon onClick={() => { closeMenu() }} icon={faXmark} size="2xl" style={{ marginTop: 5, marginLeft: 5, }} /> */}

            {/* {
                MENUS.map((menu, index) => {
                    if (userLoggedIn && userRole == Constants.ROLE_ADMIN) {
                        if (!menu.isParent) {
                            return (
                                <div className={`${styles.menuElement} d-flex justify-content-center`} key={menu.translationId}>
                                    <Link href={menu.path} className={`${styles.menuLink}`}>
                                        <FormattedMessage id={menu.translationId} />
                                    </Link>
                                </div>
                            );
                        }

                    } else {
                        if (!menu.forAdmin) {
                            return (
                                <div className={`${styles.menuElement} d-flex justify-content-center`} key={menu.translationId}>
                                    <Link href={menu.path} className={`${styles.menuLink}`}>
                                        <FormattedMessage id={menu.translationId} />
                                    </Link>
                                </div>
                            );
                        }
                    }


                })
            } */}
            <div className={`${styles.menuElement} d-flex justify-content-center`}>
                <Link href='/' className={`${styles.menuLink}`}>
                    <p className={`m-1`}>Quét КИЗ</p>
                </Link>
            </div>
            {
                userRole === Constants.ROLE_ADMIN && (
                    <div className={`${styles.menuElement} d-flex justify-content-center`}>
                        <Link href='/admin/account' className={`${styles.menuLink}`}>
                            <p className={`m-1`}>Quản lý tài khoản</p>
                        </Link>
                    </div>
                )
            }
            {
                userRole === Constants.ROLE_USER && (
                    <>
                        <div className={`${styles.menuElement} d-flex justify-content-center`}>
                            <Link href='/' className={`${styles.menuLink}`}>
                                <p className={`m-1`}>Hết hạn ngày : {(expireString)}</p>
                            </Link>
                        </div>
                        <div className={`${styles.menuElement} d-flex justify-content-center`}>
                            <Link href='/extend' className={`${styles.menuLink}`}>
                                <p className={`m-1`}>Gia Hạn</p>
                            </Link>
                        </div>
                    </>                    
                )
            }
            <div className={`${styles.menuElement} d-flex justify-content-center`}>
                <div className={`${styles.menuLink}`} onClick={() => logout()}>
                    <p className={`m-1`}>Đăng Xuất</p>
                </div>
            </div>
            <hr></hr>
            <div className={`d-block justify-content-center mb-3`}>
                <div className={`${styles.infoText} d-flex justify-content-center`}>
                    <span >
                        <span className={`${styles.infoHeader}`}>Designed:</span > TrongNguyen
                    </span>
                </div>
                <div className={`${styles.infoText} d-flex justify-content-center`}>
                    <div className={`${styles.icon}`}>
                        <AiOutlineMail />
                    </div>
                    <span>
                        <span className={`${styles.infoHeader}`}>Email:</span> nvt.702@gmail.com
                    </span>
                </div>
                <div className={`${styles.infoText} d-flex justify-content-center`}>
                    <div className={`${styles.icon}`}>
                        <AiFillFacebook />
                    </div>
                    <span>
                        <span className={`${styles.infoHeader}`}>Facebook:</span> <Link href="https://www.facebook.com/nvt3591?mibextid=LQQJ4d">Trongnguyen</Link>

                    </span>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        userLoggedIn: state.system.userLoggedIn,
        userRole: state.system.userRole,
        expireDate: state.system.expireDate
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuMbCpn);