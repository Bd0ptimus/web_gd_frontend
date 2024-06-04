import styles from './schedule.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import CustomButton from '@/components/elements/customButton';
import { ssrAxiosGet } from '@/helpers/ssrAxiosRequest';

function Schedule({ data }) {
    const [news, setNews] = useState([]);
    useEffect(() => {
        setNews(data)
    }, [data])
    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} ${styles.classIntroSec} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-center`}>Hệ thống khóa học tại lớp ôn</h1>
                            <h1 className={`${styles.secTitles} text-center`}>chất lượng cao NGUYỄN TẤT THÀNH</h1>
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`col-12 col-xl-4`}
                                    src="/assets/components/underline.png"
                                    width={150}
                                    height={30}
                                    alt="underline" />
                            </div>
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.classContainer} d-md-flex d-block justify-content-start`}>
                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="#" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/home/tieu_hoc.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 3</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Củng cố kiến thức Tiểu học, nâng cao để bồi dưỡng các em thi vào các trường Chuyên, Chất lượng cao.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2  d-flex justify-content-center`}>
                            <Link href="#" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/home/tieu_hoc.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 3</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Củng cố kiến thức Tiểu học, nâng cao để bồi dưỡng các em thi vào các trường Chuyên, Chất lượng cao.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="#" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/home/tieu_hoc.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 3</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Củng cố kiến thức Tiểu học, nâng cao để bồi dưỡng các em thi vào các trường Chuyên, Chất lượng cao.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="#" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/home/tieu_hoc.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 3</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Củng cố kiến thức Tiểu học, nâng cao để bồi dưỡng các em thi vào các trường Chuyên, Chất lượng cao.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="#" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/home/tieu_hoc.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 3</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Củng cố kiến thức Tiểu học, nâng cao để bồi dưỡng các em thi vào các trường Chuyên, Chất lượng cao.</p>
                                </div>

                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    // const newsData = await ssrAxiosGet(context, `/api/public/get-litsing-news`);
    // const data = newsData.data
    const data = {}
    return { props: { data } }
}

export default Schedule;