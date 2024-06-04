import styles from './index.module.scss';
import Image from 'next/image';

import CustomButton from '@/components/elements/customButton';
import Home from "@/pages";

function Intro() {
    return (
        <div className={`${styles.pageContainer}`}>
            <div className="container-fluid">
                <div className={`w-100 d-flex justify-content-center vh-50 ${styles.introBoxTitle}`}>
                    <div className={`row d-block ${styles.introRow}`}>
                        <div className="col-12">
                            <h3 className={`text-center ${styles.introTitle}`}>Giới thiệu</h3>
                        </div>
                        <Image
                            className={`col-12`}
                            src="/assets/components/underline.png"
                            width={150}
                            height={30}
                            alt="underline" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div
                    className={`d-flex flex-column flex-md-row justify-content-between ${styles.dashedHr} ${styles.allContent}`}>
                    <div className="col-12 col-md-4">
                        <Image
                            className={`${styles.imgIntro}`}
                            src="/assets/home/intro_quality.png"
                            width={486}
                            height={520}
                            alt="Class" />
                    </div>
                    <div className={`col-12 col-md-7 ${styles.contentIntro}`}>
                        <div className="d-flex flex-column">
                            <div className={styles.introDivHeader}>
                                <h3 className={`mb-5 ${styles.header}`}>
                                    Về lớp ôn luyện Chất Luong cao Nguyễn Tất Thành
                                </h3>
                            </div>
                            <div
                                className={`${styles.typography}`}
                            >
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book.
                                </p>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`d-flex flex-column flex-md-row justify-content-between ${styles.dashedHr} ${styles.allContent}`}>
                    <div className={`col-12 col-md-4 ${styles.order2}`}>
                        <Image
                            className={`${styles.imgIntro}`}
                            src="/assets/home/tieu_hoc.png"
                            width={486}
                            height={520}
                            alt="Class" />
                    </div>
                    <div className={`col-12 col-md-7 ${styles.contentIntro} ${styles.order1}`}>
                        <div className="d-flex flex-column">
                            <div className={styles.introDivHeader}>
                                <h3 className={`mb-5 ${styles.header}`}>
                                    Về lớp ôn luyện Chất Luong cao Nguyễn Tất Thành
                                </h3>
                            </div>
                            <div
                                className={`${styles.typography}`}
                            >
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book.
                                </p>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`d-flex flex-column flex-md-row justify-content-between ${styles.allContent}`}>
                    <div className="col-12 col-md-4">
                        <Image
                            className={`${styles.imgIntro}`}
                            src="/assets/home/thpt.png"
                            width={486}
                            height={520}
                            alt="Class" />
                    </div>
                    <div className={`col-12 col-md-7 ${styles.contentIntro}`}>
                        <div className="d-flex flex-column">
                            <div className={styles.introDivHeader}>
                                <h3 className={`mb-5 ${styles.header}`}>
                                    Về lớp ôn luyện Chất Luong cao Nguyễn Tất Thành
                                </h3>
                            </div>
                            <div
                                className={`${styles.typography}`}
                            >
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book.
                                </p>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Intro;
