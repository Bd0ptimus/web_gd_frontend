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
    const [menuNews, setMenuNews] = useState(false);
    const [menuSchedule, setMenuSchedule] = useState(false);
    const [menuIntro, setMenuIntro] = useState(false);

    const [currentPath, setCurrentPath] = useState('');
    useEffect(() => {
        setCurrentPath(path)
    }, [path])


    function setMenuOpen(index) {
        switch (index) {
            case 'news':
                setMenuNews(!menuNews);
                break;
            case 'schedule':
                setMenuSchedule(!menuSchedule);
                break;
            case 'intro':
                setMenuIntro(!menuIntro);
                break;
        }
    }

    function getMenuOpen(index) {
        switch (index) {
            case 'news':
                return menuNews;
                break;
            case 'schedule':
                return menuSchedule;
                break;
        }
    }

    return (
        <div className={`${styles.menuMain}  justify-content-center`}>
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:80}}>
                    <Link href='/' className={`${styles.menuLink} ${path === '' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Trang chủ</p>
                    </Link>
                </div>
            </div>

            <div className={`d-block justify-content-center ${styles.submenuDropdown}`} onMouseEnter={() => setMenuOpen('intro')} onMouseLeave={() => setMenuOpen('intro')}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:100}}>
                    <Link href='/intro' className={`${styles.menuLink} ${path === 'intro' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Giới thiệu</p>
                    </Link>
                </div>
                { 
                    menuIntro && (
                        <div className={`${styles.subMenuGroup} ${styles.subMenuGroup2} ${styles.subMenuGroupSchedule} d-block justify-content-center`} >
                            <Link href='/intro' className={`${styles.subMenuLink} d-flex justify-content-center`}>
                                <p className={`m-1 p-2 w-100`}>Về lớp ôn</p>
                            </Link>
                            <Link href='/teachers' className={`${styles.subMenuLink} d-flex justify-content-center`}>
                                <p className={`m-1 p-2 w-100`}>Đội ngũ giáo viên</p>
                            </Link>
                        </div>
                    )

                }
            </div>

            <div className={`d-block justify-content-center ${styles.submenuDropdown}`} onMouseEnter={() => setMenuOpen('schedule')} onMouseLeave={() => setMenuOpen('schedule')}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:100}}>
                    <Link href='/schedule' className={`${styles.menuLink} ${path === 'schedule' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Lịch học</p>
                    </Link>
                </div>
                { 
                    menuSchedule && (
                        <div className={`${styles.subMenuGroup} ${styles.subMenuGroup2} ${styles.subMenuGroupSchedule} d-block justify-content-center`} >
                            <Link href='/schedule/tieu_hoc' className={`${styles.subMenuLink} d-flex justify-content-center`}>
                                <p className={`m-1 p-2 w-100`}>Tiểu học</p>
                            </Link>
                            <Link href='/schedule/thcs' className={`${styles.subMenuLink} d-flex justify-content-center`}>
                                <p className={`m-1 p-2 w-100`}>Trung học cơ sở</p>
                            </Link>
                            <Link href='/schedule/thpt' className={`${styles.subMenuLink} d-flex justify-content-center`}>
                                <p className={`m-1 p-2 w-100`}>Trung học phổ thông</p>
                            </Link>
                        </div>
                    )

                }
            </div>

            <div className={`d-block justify-content-center`} onMouseEnter={() => setMenuOpen('news')} onMouseLeave={() => setMenuOpen('news')}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:80}}>
                    <div href='#' className={`${styles.menuLink} ${path === 'news' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Tin tức</p>
                    </div>
                </div>
                { 
                    menuNews && (
                        <div className={`${styles.subMenuGroup}  ${styles.subMenuGroup2} ${styles.subMenuGroupSchedule} d-block justify-content-center`} >
                            <Link href='/news/posts' className={`${styles.subMenuLink} d-flex justify-content-center`}>
                                <p className={`m-1 p-2 w-100`}>Bài viết</p>
                            </Link>
                            <Link href='/news/videos' className={`${styles.subMenuLink} d-flex justify-content-center`}>
                                <p className={`m-1 p-2 w-100`}>Video</p>
                            </Link>
                        </div>
                    )

                }
            </div>
            
            
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:190}}>
                    <Link href='/search' className={`${styles.menuLink} ${path === 'search' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Tra cứu SBD, kết quả thi</p>
                    </Link>
                </div>
            </div>
            {
                userRole === Constants.ROLE_ADMIN && (
                    <>
                        <div className={`d-block justify-content-center`}>
                            <div className={`${styles.menuElement} d-flex justify-content-center`} style={{ width: 150 }}>
                                <Link href='/admin/result' className={`${styles.menuLink} ${path === 'admin/result' ? styles.pageSelected : ''}`}>
                                    <p className={`m-0`}>Quản lý kết quả thi</p>
                                </Link>
                            </div>
                        </div>
                    </>
                )
            }
            <div className={`d-block justify-content-center`}>
                <div className={`${styles.menuElement} d-flex justify-content-center`} style={{width:85} }>
                    <Link href='/contact' className={`${styles.menuLink} ${path === 'contact' ? styles.pageSelected : ''}`}>
                        <p className={`m-0`}>Liên hệ</p>
                    </Link>
                </div>
            </div>
            
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