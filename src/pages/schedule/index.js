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
                                    src="/assets/components/underlineOrange.png"
                                    width={150}
                                    height={30}
                                    alt="underline" />
                            </div>
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.classContainer} d-md-flex d-block justify-content-start`}>
                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/tieu_hoc?class=3" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop3.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 3</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Chương trình đào tạo cung cấp những kiến thức cơ bản và kỹ năng làm bài quan trọng.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2  d-flex justify-content-center`}>
                            <Link href="/schedule/tieu_hoc?class=4" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop4.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 4</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Chương trình đào tạo gồm hầu hết những nội dung quan trọng nhất của Khối Tiểu học, với lượng kiến thức vượt trội.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/tieu_hoc?class=5" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop5.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 5</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Củng cố kiến thức Tiểu học, nâng cao nền tảng để bồi dưỡng học sinh thi vào các trường THCS Chuyên, Chất lượng cao.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/thcs?class=6" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop6.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 6</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Cung cấp những kiến thức kế thừa từ lớp 5, cung cấp những kiến thức mới mới của lớp 6.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/thcs?class=7" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop7.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 7</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}> Cung cấp những kiến thức cơ bản và nâng cao, giúp học sinh làm quen với lượng kiến thức của khối THCS.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/thcs?class=8" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop8.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 8</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Chương trình đào tạo cung cấp hầu hết những nội dung quan trọng nhất của Khối THCS với lượng kiến thức vượt trội.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/thcs?class=9" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop9.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 9</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}> Nâng cao nền tảng kiến thức, bồi dưỡng học sinh thi vào các trường Chuyên, Chất lượng cao.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/thpt?class=10" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop10.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 10</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}> Xây dựng nền tảng kiến thức của khối THPT, cho học sinh làm quen với cấu trúc đề thi THPT Quốc Gia.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/thpt?class=11" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop11.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 11</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>Chương trình đào tạo cung cấp hầu hết nội dung quan trọng nhất của bậc THPT, tập trung xây dựng nền tảng cho học sinh.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/thpt?class=12" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/lop12.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Lớp 12</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}>  Đánh giá năng lực, đưa ra định hướng và ôn luyện kiến thức cho học sinh bám sát theo cấu trúc đề thi THPT Quốc gia.</p>
                                </div>

                            </Link>
                        </div>

                        <div className={`col-12 col-md-3 d-block p-2 d-flex justify-content-center`}>
                            <Link href="/schedule/thpt?class=tsa" className={`d-block ${styles.courseDetailSec}`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/schedule/tsa.png"
                                    width={400}
                                    height={540}
                                    alt="Logo" />
                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.titleContent} text-start`}>Luyện thi TSA</p>
                                </div>

                                <div className={`m-2 d-flex justify-content-start`}>
                                    <p className={`${styles.textContent} text-start`}> Ôn luyện kiến thức cho học sinh bám sát cấu trúc đề thi Đánh giá tư duy, giúp các em đạt mục tiêu xét tuyển vào các trường đại học.</p>
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