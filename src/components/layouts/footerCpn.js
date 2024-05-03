import styles from './footer.module.scss';
import { BsFillTelephoneFill, BsFacebook, BsEnvelopeFill } from 'react-icons/bs';
import { AiOutlineLogout } from "react-icons/ai";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Component, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic'
import { connect } from 'react-redux';
import {Tooltip} from "@nextui-org/react";

import {logoutProcessOnCookie} from '@/helpers/commonFunction';
import * as actions from "@/store/action";

function FooterCpn({userLoggedIn, userName, userLogout}) {
    const [enableFooter, setEnableFooter] = useState(true)
    const FooterMap = dynamic(() => import('@/components/sections/footerMap'), {
        ssr: false,
      })
    const router = useRouter()
    useEffect(() => {
        if (router.pathname === '/admin/login') {
            setEnableFooter(false);
        } else {
            setEnableFooter(true);
        }
    }, [router.pathname]);

    function logoutHandler() {
        userLogout();
        logoutProcessOnCookie();
        router.replace("/admin/login");
    }
    
    return enableFooter && (
        <>
            <footer className={`${styles.footerMain} footer self-end dark:bg-white bg-zinc-900 px-0 py-2 border-t-2`}>
                <div className={`row d-flex justify-content-center p-0 ${styles.footerMainSec} mx-0`}>
                    <div className={`col-md-3 col-12 col-sm-6 d-flex justify-content-center ${styles.mainContentSec}`}>
                        <div className={`mx-1 mx-sm-2 mx-md-3 my-2 my-md-5 d-block ${styles.mainContent}`}>
                            <div className="d-flex justify-content-start" style={{height:100}}>
                                <Image
                                    onClick={() => logoClickHandler()}
                                    src="/logo/logo.png"
                                    width={68}
                                    height={68}
                                    style={{height:74, width: 68, padding:0}}
                                    alt="Logo"
                                />
                            </div>
                            <div className={`d-block justify-content-center`}>
                                <p className={` ${styles.footerTextList}`}>
                                    Lớp ôn Chất lượng cao Nguyễn Tất Thành 
                                </p>
                                <p className={` ${styles.footerTextList}`}>
                                    Lớp ôn luyện cho học sinh vào các trường chất lượng cao các khối 3-12
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-3 col-12 col-sm-6 d-flex justify-content-center ${styles.mainContentSec}`}>
                        <div className={`mx-1 mx-sm-2 mx-md-3 my-2 my-md-5 d-block ${styles.mainContent}`}>
                            <div className="d-flex justify-content-start mb-3">
                                <b className={` ${styles.footerText}`}>Địa chỉ</b>
                            </div>
                            <div className={`d-block justify-content-center my-3`}>
                                <p className={` ${styles.footerText}`}>
                                    Toà D3 - Trường Đại học Sư Phạm Hà Nội, 136 Xuân Thuỷ - Cầu Giấy - Hà Nội
                                </p>
                            </div>
                            <div className={`d-block justify-content-center my-3`} style={{height: 120}}>
                                <FooterMap/>
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-3 col-12 col-sm-6 d-flex justify-content-center ${styles.mainContentSec}`}>
                        <div className={`mx-1 mx-sm-2 mx-md-3 my-2 my-md-5 d-block ${styles.mainContent}`}>
                            <div className="d-flex justify-content-start mb-3">
                                <b className={` ${styles.footerText}`}>Kết nối với chúng tôi</b>
                            </div>
                            <div className={`d-block justify-content-center my-3`}>
                                <p className={` ${styles.footerText} d-flex justify-content-start`}>
                                    <BsFillTelephoneFill className={`${styles.footerIcon} mt-1 mr-2`}/> 0876 034 555
                                </p>
                            </div>
                            <div className={`d-block justify-content-center my-3`}>
                                <p className={` ${styles.footerText} d-flex justify-content-start`}>
                                    <BsEnvelopeFill className={`${styles.footerIcon} mt-1 mr-2`}/> lopon5len6@gmail.com
                                </p>
                            </div>
                            <div className={`d-block justify-content-center my-3`}>
                                <p className={` ${styles.footerText} d-flex justify-content-start`}>
                                    <BsFacebook className={`${styles.footerIcon} mt-1 mr-2`}/> Lớp ôn Chất lượng cao NTT
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-3 col-12 col-sm-6 d-flex justify-content-center ${styles.mainContentSec}`}>
                        <div className={`mx-1 mx-sm-2 mx-md-3 my-2 my-md-5 d-block ${styles.mainContent}`}>
                            <div className="d-flex justify-content-start mb-3">
                                <b className={` ${styles.footerText}`}>Trang</b>
                            </div>
                            <div className={`d-block justify-content-center my-3`}>
                                <Link href='/' className={` ${styles.footerLink} d-flex justify-content-start`}>
                                    Giới thiệu
                                </Link>
                            </div>
                            <div className={`d-block justify-content-center my-3`}>
                                <Link href='/' className={` ${styles.footerLink} d-flex justify-content-start`}>
                                    Lịch học
                                </Link>
                            </div>
                            <div className={`d-block justify-content-center my-3`}>
                                <Link href='/' className={` ${styles.footerLink} d-flex justify-content-start`}>
                                    Tin tức
                                </Link>
                            </div>
                            <div className={`d-block justify-content-center my-3`}>
                                <Link href='/' className={` ${styles.footerLink} d-flex justify-content-start`}>
                                    Tra cứu
                                </Link>
                            </div>
                            {
                                userLoggedIn ? (
                                    <>
                                        <div className={`d-flex justify-content-center my-3`} style={{fontSize:12}}>
                                            <p className='m-0'>Admin : {userName ?? ''}</p>&nbsp;/&nbsp;
                                            <Link href='/' className={`d-flex justify-content-start`} onClick={(e) => {
                                                e.preventDefault();
                                                logoutHandler()
                                            }}>
                                                Đăng xuất
                                            </Link>
                                        </div>
                                        
                                    </>

                                    
                                ) : (
                                        <div className={`d-flex justify-content-center my-3`} style={{fontSize:12}}>
                                            <p className='m-0'>Bạn là Admin? </p>&nbsp;/&nbsp;

                                            <Link href='/' className={`d-flex justify-content-start`} onClick={(e) => {
                                                e.preventDefault();
                                                router.replace("/admin/login");
                                            }}>
                                                Đăng nhập
                                            </Link>
                                        </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={`row d-flex justify-content-center p-0 ${styles.footerCopyrightSec} mx-0`}>
                    <div className={`d-flex justify-content-center ${styles.copyrightContent}`}>
                        <p className={`text-center  ${styles.copyrightText}`}>
                            Copyright 2024 by Lớp ôn Chất lượng cao Nguyễn Tất Thành
                        </p>
                    </div>
                </div>
            </footer> 
        </>
    );
}

function mapStateToProps(state) {
    return {
        userName: state.system.userName,
        userRole: state.system.userRole,
        userLoggedIn: state.system.userLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userLogout: () => dispatch(actions.userLogout()),

    };
}

export default connect(mapStateToProps, mapDispatchToProps) (FooterCpn);