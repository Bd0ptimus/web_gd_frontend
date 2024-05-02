import Link from 'next/link';
import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
    faCaretDown,
    faCaretUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';

import styles from './menu.module.scss';
import { MENUS } from '../../data/menuList';
import * as Constants from '@/config/constants/Constants';
function MenuCpn({ path, userRole }) {
    const router = useRouter();
    const [menuAccount, setMenuAccount] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    useEffect(() => {
        setCurrentPath(path)
    }, [path])


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
        <div className={`${styles.menuMain}  justify-content-center`}>
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:105}}>
                    <Link href='/' className={`${styles.menuLink} ${currentPath === '/' || currentPath === '' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Trang chủ</p>
                    </Link>
                </div>
            </div>
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:105}}>
                    <Link href='/' className={`${styles.menuLink} ${path === 'intro' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Giới thiệu</p>
                    </Link>
                </div>
            </div>
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:100}}>
                    <Link href='/' className={`${styles.menuLink} ${path === 'schedule' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Lịch học</p>
                    </Link>
                </div>
            </div>
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:80}}>
                    <Link href='/' className={`${styles.menuLink} ${path === 'news' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Tin tức</p>
                    </Link>
                </div>
            </div>
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:85}}>
                    <Link href='/search' className={`${styles.menuLink} ${path === 'search' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Tra cứu</p>
                    </Link>
                </div>
            </div>
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:85} }>
                    <Link href='/' className={`${styles.menuLink} ${path === '/contact' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Liên hệ</p>
                    </Link>
                </div>
            </div>
            {
                userRole === Constants.ROLE_ADMIN && (
                    <>
                        <div className={`d-block justify-content-center`}>
                            <div className={`${styles.menuElement} d-flex justify-content-center`} style={{ width: 150 }}>
                                <Link href='/admin/result' className={`${styles.menuLink} ${path === '/contact' ? styles.pageSelected : ''}`}>
                                    <p className={`m-0`}>Quản lý kết quả thi</p>
                                </Link>
                            </div>
                        </div>
                    </>
                )
            }
            {/* <div className={`d-block justify-content-center`} onMouseEnter={() => setMenuOpen('account')} onMouseLeave={() => setMenuOpen('account')}>
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
            </div> */}
            
        </div>
    );
}

function mapStateToProps(state) {
    return {
        userRole: state.system.userRole,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuCpn);