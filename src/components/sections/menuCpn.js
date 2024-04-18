import Link from 'next/link';
import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
    faCaretDown,
    faCaretUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './menu.module.scss';
import { MENUS } from '../../data/menuList';
import * as Constants from '@/config/constants/Constants';
function MenuCpn({ userLoggedIn, userRole, expireDate, userName, logout }) {
    const [menu1, setMenu1] = useState(false);
    const [menuAccount, setMenuAccount] = useState(false);
    const [expireString, setExpireString] = useState('');
    useEffect(() => {
        const date = new Date(expireDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        setExpireString(formattedDate)
    })

    function setMenuOpen(index) {
        switch (index) {
            case 'account':
                setMenuAccount(!menuAccount);
                break;
        }
    }

    function getMenuOpen(index) {
        switch (index) {
            case 'account':
                return menuAccount;
                break;
        }
    }

    return (
        <div className={`${styles.menuMain}  justify-content-end`}>
            {/* {

                MENUS.map((menu, index) => {
                    if (userLoggedIn && userRole == Constants.ROLE_ADMIN) {
                        if (menu.isParent) {

                            return (
                                <div className={`${styles.menuElement} d-block justify-content-center`} key={menu.translationId}>
                                    <div className={`${styles.menuLink}`} onClick={() => setMenuOpen(menu.id)}>
                                        <FormattedMessage id={menu.translationId} />&nbsp;
                                        <FontAwesomeIcon icon={getMenuOpen(menu.id) ? faCaretUp : faCaretDown} />

                                    </div>

                                    <div className={` justify-content-center`} style={{ display: getMenuOpen(menu.id) ? 'block' : 'none', backgroundColor: 'white', }}>
                                        {
                                            menu.childs.map((child, i) => {
                                                return (<div className={`d-flex justify-content-center`}>
                                                    <Link href={child.path} className={`${styles.menuLink}`}>
                                                        <FormattedMessage id={child.translationId} />
                                                    </Link>
                                                </div>);
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        } else {
                            if (!menu.isSubmenu) {
                                return (
                                    <div className={`${styles.menuElement} d-flex justify-content-center`} key={menu.translationId}>
                                        <Link href={menu.path} className={`${styles.menuLink}`}>
                                            <FormattedMessage id={menu.translationId} />
                                        </Link>
                                    </div>);
                            }

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
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`}>
                    <Link href='/' className={`${styles.menuLink}`}>
                        <p className={`m-1`}>Quét КИЗ</p>
                    </Link>
                </div>
            </div>
            {
                userRole === Constants.ROLE_ADMIN && (
                    <>
                        <div className={`d-block justify-content-center`}>
                            <div className={`${styles.menuElement} d-flex justify-content-center`}>
                                <Link href='/admin/account' className={`${styles.menuLink}`}>
                                    <p className={`m-1`}>Quản lý tài khoản</p>
                                </Link>
                            </div>
                        </div>
                    </>
                )
            }
            {
                userRole === Constants.ROLE_USER && (
                    <div className={`d-block justify-content-center`}>
                        <div className={`${styles.menuElement} d-flex justify-content-center`}>
                            <div className={`${styles.menuLink}`}>
                                <p className={`m-1`}>Hết hạn ngày : {(expireString)}</p>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className={`d-block justify-content-center`} onMouseEnter={() => setMenuOpen('account')} onMouseLeave={() => setMenuOpen('account')}>
                <div className={`${styles.menuElement} d-flex justify-content-center`}>
                    <div className={`${styles.menuLink} d-flex justify-content-between`} >
                        <p className={`m-1`}>Tài khoản : {userName}</p>
                        <FontAwesomeIcon className={`mt-1`} icon={getMenuOpen('account') ? faCaretUp : faCaretDown} />
                    </div>
                </div>
                {
                    menuAccount === true && (
                        <div className={`${styles.subMenuGroup} d-block justify-content-center`} >
                            {
                                userRole === Constants.ROLE_USER && (
                                    <Link href='/extend' className={`${styles.subMenuLink} d-flex justify-content-center`}>
                                        <p className={`m-1 p-2 w-100`}>Gia Hạn</p>
                                    </Link>
                                )
                            }
                            <div className={`${styles.subMenuLink} d-flex justify-content-center`} onClick={() => logout()}>
                                <p className={`m-1 p-2 w-100`}>Đăng Xuất</p>
                            </div>
                        </div>
                    )
                }
            </div>
            
        </div>
    );
}

function mapStateToProps(state) {
    return {
        userLoggedIn: state.system.userLoggedIn,
        userRole: state.system.userRole,
        expireDate: state.system.expireDate,
        userName: state.system.userName
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCpn);