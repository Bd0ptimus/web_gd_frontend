import Link from 'next/link';
import Image from 'next/image';
import React, { Component, useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
    faX,
    faChevronDown,
    faChevronUp
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
function MenuMbCpn({ userLoggedIn, closeMenu, userRole, logout, expireDate, onClose, path, refresh}) {
    const [expireString, setExpireString] = useState('');
    const [menuNews, setMenuNews] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    useEffect(() => {
        setCurrentPath(path)
    }, [path])

    useEffect(() => {
        setMenuNews(false)
    }, [refresh])
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
            case 'news':
                setMenuNews(!menuNews);
                break;
        }
    }

    function getMenuOpen(index) {
        switch (index) {
            case 'news':
                return menuNews;
                break;
        }
    }

    return (
        <div className={`${styles.menuMain} d-block justify-content-center p-4`}>
            <div className={`d-flex justify-content-end`}>
                <FontAwesomeIcon icon={faX} style={{color:'#656565'}} onClick={() => onClose()}/>
            </div>
            <div className={`d-flex justify-content-start mt-2 mb-5`}>
            <Image
                            onClick={() => logoClickHandler()}
                            src="/logo/logo.png"
                            width={200}
                            height={85}
                            className={`${styles.logo}`}
                            alt="Logo"
                        />
            </div>
            {/* <div className={`${styles.menuElement} d-flex justify-content-start`}>
                <Link href='/' className={`${styles.menuLink} ${currentPath === '/' || currentPath === '' ? styles.pageSelected : ''}`}>
                    <p className={`mx-1 my-0`}>Trang chủ</p>
                </Link>
            </div>
            <div className={`${styles.devider}`}></div> */}
            <div className={`${styles.menuElement} d-flex justify-content-between`} onClick={() => setMenuOpen('news')}>
                <Link href='#' className={`${styles.menuLink} ${currentPath === '/news' || currentPath === 'news' ? styles.pageSelected : ''}`}>
                    <p className={`mx-1 my-0`}>Tin tức</p>
                </Link>
                {
                    menuNews ? (
                        <FontAwesomeIcon icon={faChevronUp}/>
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown}/>
                    )
                }
            </div>
            {
                menuNews && (
                    <>
                        <div className={`${styles.menuElement} d-flex justify-content-start`}>
                            <Link href='/news/posts' className={`${styles.menuLink} ${styles.menuSubLink}`}>
                                <p className={`mx-1 my-0`}>Bài viết</p>
                            </Link>
                        </div>
                        <div className={`${styles.menuElement} d-flex justify-content-start`}>
                            <Link href='/news/videos' className={`${styles.menuLink} ${styles.menuSubLink}`}>
                                <p className={`mx-1 my-0`}>Video</p>
                            </Link>
                        </div>
                    </>
                )
            }
            <div className={`${styles.devider}`}></div>
            <div className={`${styles.menuElement} d-flex justify-content-start`}>
                <Link href='/search' className={`${styles.menuLink} ${currentPath === 'search' ? styles.pageSelected : ''}`}>
                    <p className={`mx-1 my-0`}>Tra cứu SBD, kết quả thi</p>
                </Link>
            </div>
            {
                userRole === Constants.ROLE_ADMIN && (
                    <>
                    <div className={`${styles.devider}`}></div>
                    <div className={`${styles.menuElement} d-flex justify-content-start`}>
                        <Link href='/admin/result' className={`${styles.menuLink}  ${currentPath === 'admin/result' ? styles.pageSelected : ''}`}>
                            <p className={`mx-1 my-0`}>Quản lý kết quả thi</p>
                        </Link>
                    </div>
                    </>
                    
                )
            }
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