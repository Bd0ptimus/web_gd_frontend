import { AiOutlineHome, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';
import { RiMessage2Line } from 'react-icons/ri';
import { BsTelephone, BsWhatsapp } from 'react-icons/bs';

import styles from './footer.module.scss';

function FooterCpn() {
    return (
        <>

            <div className={`${styles.footerMain}`}>
                <div className='d-block justify-content-center'>


                    <div className={`${styles.footerContent}`}>
                        <div className={`${styles.contentCol} d-block justify-content-center`}>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <AiOutlineHome />
                                </div>
                                <span>
                                    <span style={{ fontWeight: 700 }}>Trụ sở:</span> 91 Nguyễn Chí Thanh, Đống Đa, Hà Nội
                                </span>
                            </div>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <AiOutlineHome />
                                </div>
                                <span>
                                    <span style={{ fontWeight: 700 }}>Văn phòng đại diện tại Nga:</span> Thành phố Mátxcơva, Quận thành phố Timiryazevsky Đại lộ Dmitrovsky, Tòa 1, Văn phòng 418
                                </span>
                            </div>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <AiOutlineMail />
                                </div>
                                <span>
                                    <span style={{ fontWeight: 700 }}>Email:</span> info@htk.asia
                                </span>
                            </div>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <TbWorld />
                                </div>
                                <span>
                                    <span style={{ fontWeight: 700 }}>Website:</span> https://htk-asia.com
                                </span>
                            </div>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <BsWhatsapp />
                                </div>
                                <span>
                                    <span style={{ fontWeight: 700 }}>Whatsapp:</span> +(84) 963 840 005
                                </span>
                            </div>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <BsTelephone />
                                </div>
                                <span>
                                    <span style={{ fontWeight: 700 }}>Điện thoại(Vi):</span> +(84) 963 840 005
                                </span>
                            </div>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <BsTelephone />
                                </div>
                                <span>
                                    <span style={{ fontWeight: 700 }}>Điện thoại(Nga):</span> +7 977 800 32-99
                                </span>
                            </div>
                        </div>
                        <div className={`${styles.contentCol} d-block justify-content-center`}>
                            <div className={`${styles.childContent}`} style={{ fontWeight: 700 }}>About us</div>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <AiOutlineLock />
                                </div>
                                <span>
                                    Chính sách bảo mật
                                </span>
                            </div>
                            <div className={`${styles.childContent}`}>
                                <div className={`${styles.icon}`}>
                                    <CgNotes />
                                </div>
                                <span>
                                    Điều khoản sử dụng
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.copyRight}`}>HTK ASIA &copy; 2020 All Rights Reserved </div>
            </div >
        </>
    );
}

export default FooterCpn;