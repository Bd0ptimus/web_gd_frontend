import styles from './index.module.scss';
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { BsFillTelephoneFill, BsFacebook, BsEnvelopeFill } from 'react-icons/bs';
import Image from 'next/image';


const SchoolMap = dynamic(() => import('@/components/sections/schoolMap'), {
    ssr: false,
});

function Contact() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div>
            <div className={`${styles.pageContainer}`}>
                <div className="container-fluid">
                    <div className={`w-100 d-flex justify-content-center vh-50 ${styles.contactBoxTitle}`}>
                        <div className={`row d-block ${styles.contactRow}`}>
                            <div className="col-12">
                                <h3 className={`text-center ${styles.contactTitle}`}>Liên Hệ</h3>
                            </div>
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`col-12`}
                                    src="/assets/components/underline.png"
                                    width={150}
                                    height={30}
                                    alt="underline" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className={`col-12`}>
                            <div className={styles.formContainer}>
                                <h5>Quý Phụ huynh vui lòng để lại thông tin để được tư vấn miễn phí.</h5>
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="studentName" className={`${styles.formLabel}`}>Họ và tên học sinh</label>
                                        <input type="text" className="form-control" id="studentName"
                                               placeholder="Nhập họ và tên học sinh"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="class" className={`${styles.formLabel}`}>Lớp</label>
                                        <input type="text" className="form-control" id="class"
                                               placeholder="Nhập lớp mà học sinh đang học"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="parentPhone" className={`${styles.formLabel}`}>Số điện thoại phụ huynh</label>
                                        <input type="text" className="form-control" id="parentPhone"
                                               placeholder="Nhập số điện thoại phụ huynh"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="parentEmail" className={`${styles.formLabel}`}>Email phụ huynh</label>
                                        <input type="email" className="form-control" id="parentEmail"
                                               placeholder="Nhập email phụ huynh"/>
                                    </div>
                                    <button type="submit" className={`btn btn-primary ${styles.button}`}>Gửi thông tin
                                    </button>
                                </form>
                            </div>
                            <div className={styles.schoolMapContainer}>
                                {isClient && <SchoolMap/>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={`${styles.contactRow}`}>
                                <div className={`${styles.contactItem}`}>
                                    <div className={`${styles.iconContainer} ${styles.child}`}>
                                        <BsFillTelephoneFill className={`${styles.icon} mt-1 mr-2`}/>
                                    </div>
                                    <div className={`d-flex flex-column`}>
                                        <div className={`${styles.contactLabel}`}>Điện thoại</div>
                                        <div className={`${styles.contactInfo}`}>0876 034 555</div>
                                    </div>
                                </div>
                                <div className={`${styles.contactItem}`}>
                                    <div className={`${styles.iconContainer}  ${styles.child}`}>
                                        <BsEnvelopeFill className={`${styles.icon} mt-1 mr-2`}/>
                                    </div>
                                    <div className={`d-flex flex-column`}>
                                        <div className={`${styles.contactLabel}`}>Email</div>
                                        <div className={`${styles.contactInfo}`} style={{ textDecoration: 'underline' }}>lopon5ien6@gmail.com</div>
                                    </div>
                                </div>
                                <div className={`${styles.contactItem}`}>
                                    <div className={`${styles.iconContainer}  ${styles.child}`}>
                                        <BsFacebook className={`${styles.icon} mt-1 mr-2`}/>
                                    </div>
                                    <div className={`d-flex flex-column`}>
                                        <div className={`${styles.contactLabel}`}>Facebook</div>
                                        <div className={`${styles.contactInfo}`}>Lớp ôn Chất Lượng Lượng cao NTT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
