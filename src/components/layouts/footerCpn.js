import styles from './footer.module.scss';
import { BsTelephone, BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Component, useState, useEffect } from 'react';

function FooterCpn() {
    const [enableHeader, setEnableHeader] = useState(false)

    const router = useRouter()
    useEffect(() => {
        if (router.pathname === '/admin/login') {
          setEnableHeader(false);
        } else {
          setEnableHeader(true);
        }
    }, [router.pathname]);
    return enableHeader && (
        <>
            <footer className={`${styles.footerMain} footer self-end dark:bg-white bg-zinc-900 px-4 py-2 border-t-2`}>
                <div className="container py-4">
                    <div className={`${styles.childContent} d-flex justify-content-center`}>
                        <p className="text-center">
                            Dịch vụ tạo КИЗ, làm giấy chứng nhận, quản lý sàn, chụp ảnh, design thẻ, quảng cáo nội sàn, ngoại sàn...
                        </p>
                    </div>
                    <div className={`${styles.childContent} d-flex justify-content-center`}>
                        <p className="text-center my-0 mx-2">
                            Liên hệ:
                        </p>
                        <BsTelephone />
                        <p className="text-center my-0 mx-2">
                             <a href="tel:+79859817817">+7 (985) 981 78 17</a>
                        </p>
                    </div>
                    <hr></hr>
                    <div className={`${styles.childContent} d-flex justify-content-center`}>
                        <p style={{ fontSize: 12 }}>Designed by <Link href="https://www.facebook.com/nvt3591?mibextid=LQQJ4d">Trongnguyen</Link></p>
                        
                    </div>
                </div>
            </footer> 
        </>
    );
}

export default FooterCpn;