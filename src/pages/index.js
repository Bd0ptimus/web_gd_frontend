import styles from './index.module.scss';
import Image from 'next/image';
import { TikTokEmbed } from 'react-social-media-embed';

import CustomButton from '@/components/elements/customButton';
import {ssrAxiosGet} from "@/helpers/ssrAxiosRequest";
import Link from 'next/link';

function Home({ teachers }) {
    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} ${styles.introSec} d-flex justify-content-start`}>
                    <div className={` ${styles.textSection} d-block justify-md-content-center justify-content-center`}>
                        {/* <p className={`${styles.firstTitle}`}>
                            Thông tin tuyển sinh
                        </p>

                        <p className={`${styles.secondTitle}`}>
                            Đợt 1 - năm học 2024 - 2025
                        </p>

                        <div className={`d-block`}>
                            <div className={`d-flex justify-content-start mx-2 my-2`} style={{height:28}}>
                                <div className={`${styles.numberStep} d-flex justify-content-center`}>
                                    <p className={`${styles.numberCore} text-center`}>1</p>
                                </div>
                                <div className={`${styles.textStep}`}>
                                    <p className={`${styles.content} ${styles.contentTitle}`}>Thời gian đăng ký</p>
                                    <p className={`${styles.content} ${styles.contentSecondTitle}`}>16/04 - hết 19/05/2024</p>
                                </div>
                            </div>
                            <div className={`d-flex justify-content-start mx-2`}>
                                <div className={`${styles.verticalArrow}`}></div>
                            </div>
                            <div className={`d-flex justify-content-start mx-2  my-2`} style={{height:28}}>
                                <div className={`${styles.numberStep} d-flex justify-content-center`}>
                                    <p className={`${styles.numberCore} text-center`}>2</p>
                                </div>                                <div className={`${styles.textStep}`}>
                                    <p className={`${styles.content}  ${styles.contentTitle}`}>Đối tượng</p>
                                    <p className={`${styles.content}  ${styles.contentSecondTitle}`}>Từ lớp 3 - lớp 12</p>
                                </div>
                            </div>
                            <div className={`d-flex justify-content-start mx-2`}>
                                <div className={`${styles.verticalArrow}`}></div>
                            </div>
                            <div className={`d-flex justify-content-start mx-2 my-2`} style={{height:28}}>
                                <div className={`${styles.numberStep} d-flex justify-content-center`}>
                                    <p className={`${styles.numberCore} text-center`}>3</p>
                                </div>
                                <div className={`${styles.textStep}`}>
                                    <p className={`${styles.content}  ${styles.contentTitle}`}>Thời gian kiểm tra</p>
                                    <p className={`${styles.content}  ${styles.contentSecondTitle}`}>25 - 28/05/2024</p>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>

            </div>

            <div className={`w-100 d-flex justify-content-center ${styles.introQualityContainer}`}>
                <div className={`${styles.contentSectionContainer} ${styles.introQualitySec} d-block d-md-flex justify-content-between`}>
                    <div className={`col-12 col-md-4 ${styles.leftSec} d-flex justify-content-center justify-content-md-start`}>
                        <Image
                            className={`${styles.imageComp}`}
                            src="/assets/home/intro_quality.png"
                            width={400}
                            height={540}
                            alt="Logo" />
                        <div className={` d-flex justify-content-center ${styles.decorIcon}  ${styles.decorIcon1}`}>
                            <div className={`col-6 d-block justify-content-start ml-1 mt-2`}>
                                <p className={`${styles.titleContent} m-0 text-start`}>10 điểm</p>
                                <p className={`${styles.textContent} m-0 text-start`}>Toán</p>
                            </div>
                            <Image
                            className={`col-5 ${styles.img}`}
                            src="/assets/home/calculator.png"
                            width={40}
                            height={40}
                            alt="Logo" />
                        </div>
                        <div className={` d-flex justify-content-center ${styles.decorIcon} ${styles.decorIcon2}`}>
                            <div className={`col-6 d-block justify-content-start ml-1 mt-2`}>
                                <p className={`${styles.titleContent} m-0 text-start`}>9 điểm</p>
                                <p className={`${styles.textContent} m-0 text-start`}>Văn</p>
                            </div>
                            <Image
                            className={`col-5 ${styles.img}`}
                            src="/assets/home/document.png"
                            width={40}
                            height={40}
                            alt="Logo" />
                        </div>
                        <div className={`col-12 ${styles.decorSec}`}>

                        </div>
                    </div>

                    <div className={`col-12 col-md-7 col-lg-8 ${styles.rightSec}`}>
                        <div className={`d-block justify-content-center mb-4 mt-2`}>
                            <h1 className={`${styles.secTitles} text-md-start text-center`}>Giới thiệu về lớp ôn Chất lượng cao Nguyễn Tất Thành</h1>
                            <div className={`d-flex justify-content-center justify-content-xl-start`}>
                                <Image
                                    className={`col-12 col-xl-4`}
                                    src="/assets/components/underlineOrange.png"
                                    width={150}
                                    height={30}
                                    alt="underline" />
                            </div>

                            {/* underline */}
                        </div>
                        <p  className={`${styles.textContent} text-start`}>
                            Lớp ôn Chất lượng cao Nguyễn Tất Thành là một điểm đến lý tưởng cho các bạn học sinh chuẩn bị cho những kỳ thi quan trọng. Với đội ngũ giáo viên giàu kinh nghiệm và phương pháp giảng dạy chuyên nghiệp, chúng tôi cam kết trang bị cho học sinh những kiến thức và kỹ năng vững chắc, giúp học sinh tự tin vượt qua mọi thách thức trong hành trình học tập.
                        </p>
                        <p  className={`${styles.textContent} text-start`}>Chúng tôi không chỉ tập trung vào việc truyền đạt kiến thức một cách hiệu quả mà còn khuyến khích sự phát triển toàn diện cho học sinh, từ khả năng tư duy, logic đến kỹ năng làm việc nhóm và giao tiếp. Với một môi trường học tập tích cực và đầy động lực, lớp ôn Chất lượng cao Nguyễn Tất Thành sẽ là nơi tạo ra những học sinh tự tin, đam mê và thành công.</p>
                        <div className={`d-flex justify-content-start`}>
                            <CustomButton buttonText='Xem thêm' url='/intro' textColor='white' backgroundColor='#fc7d3a'/>
                        </div>
                    </div>

                </div>
            </div>

            <div className={`w-100 d-flex justify-content-center ${styles.introCoursesContainer}`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-xl-start justify-content-center mx-3 mx-md-2 mx-lg-0`}>
                        <div className={`col-lg-12 col-12 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-xl-center text-center`}>Hệ thống khoá học tại lớp ôn Chất lượng cao Nguyễn Tất Thành</h1>
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.scrollList} d-flex justify-content-start justify-content-xl-center`}>
                        <Link href="/schedule/tieu_hoc" className={`d-block ${styles.courseDetailSec}`}>
                            <Image
                            className={`${styles.imageComp}`}
                            src="/assets/home/tieu_hoc.png"
                            width={400}
                            height={540}
                            alt="Logo" />
                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Khối tiểu học</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start`}>Xây dựng nền tảng, nâng cao kiến thức Tiểu học để bồi dưỡng học sinh thi vào các trường THCS Chuyên, Chất lượng cao.</p>
                            </div>

                        </Link>

                        <Link href="/schedule/thcs" className={`d-block ${styles.courseDetailSec}`}>
                            <Image
                            className={`${styles.imageComp}`}
                            src="/assets/home/thcs_2.jpg"
                            width={400}
                            height={540}
                            alt="Logo" />
                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Khối trung học cơ sở</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start`}>Củng cố kiến thức nền tảng, đưa ra phương hướng và kế hoạch phù hợp với năng lực học sinh, giúp các em đặt mục tiêu trúng tuyển vào trường Chuyên, Chất lượng cao.</p>
                            </div>

                        </Link>

                        <Link href="/schedule/thpt_2" className={`d-block ${styles.courseDetailSec}`}>
                            <Image
                            className={`${styles.imageComp}`}
                            src="/assets/home/thpt_2.jpg"
                            width={282}
                            height={180}
                            alt="Logo" />
                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Khối trung học phổ thông</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start `}>Đánh giá năng lực, đưa ra định hướng và ôn luyện kiến thức cho học sinh bám sát theo cấu trúc đề thi THPT Quốc gia.</p>
                            </div>

                        </Link>

                        <Link href="/schedule/thpt?class=tsa" className={`d-block ${styles.courseDetailSec}`}>
                            <Image
                            className={`${styles.imageComp}`}
                            src="/assets/home/tsa_1.JPG"
                            width={282}
                            height={180}
                            alt="Logo" />
                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Luyện thi TSA</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start `}>Ôn luyện kiến thức cho học sinh bám sát cấu trúc đề thi Đánh giá tư duy, giúp các em đạt mục tiêu xét tuyển vào các trường đại học.</p>
                            </div>

                        </Link>
                    </div>

                    <div className={`d-flex justify-content-center my-4`}>
                        <CustomButton buttonText='Tìm hiểu thêm' url='/schedule' textColor='black' backgroundColor='white'/>
                    </div>
                </div>
            </div>

            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-center`}>Phụ huynh & học sinh nghĩ gì về lớp ôn</h1>
                            <h1 className={`${styles.secTitles} text-center`}>Chất lượng cao Nguyễn Tất Thành</h1>

                            {/* underline */}
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`col-12 col-xl-4`}
                                    src="/assets/components/underlineOrange.png"
                                    width={150}
                                    height={30}
                                    alt="underline" />
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.scrollList} d-flex justify-content-start justify-content-xl-center`}>
                        <div className={`d-block ${styles.videoSec}`}>
                            <TikTokEmbed
                                url="https://www.tiktok.com/@loponclc/video/7361469576527219976"
                                width={320}
                            />
                        </div>
                        <div className={`d-block ${styles.videoSec}`}>
                            <TikTokEmbed
                                url="https://www.tiktok.com/@loponclc/video/7361067770454248722"
                                width={320}
                            />
                        </div>
                        <div className={`d-block ${styles.videoSec}`}>
                            <TikTokEmbed
                                url="https://www.tiktok.com/@loponclc/video/7362889818461834514"
                                width={320}
                            />
                        </div>
                        <div className={`d-block ${styles.videoSec}`}>
                            <TikTokEmbed
                                url="https://www.tiktok.com/@loponclc/video/7368830050512276754"
                                width={320}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-md-center text-center`}>
                                <a href="/teachers" style={{textDecoration:'none', color: 'inherit'}}>
                                    Đội ngũ giáo viên
                                </a>
                            </h1>
                            <h1 className={`${styles.secTitles} text-md-center text-center`}>KINH NGHIỆM - TÀI NĂNG - TÂM HUYẾT</h1>
                            <div className={`d-flex justify-content-center justify-content-xl-center`}>
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

                    <div className={`${styles.scrollList} d-flex justify-content-start justify-content-lg-center`}>
                            {
                                teachers.map((teacher, index) => {
                                    return (
                                        <Link href={`/teachers/detail/${teacher.id}`} style={{textDecoration:'none'}}>
                                            <div className={`d-block ${styles.teacherSec} p-1`}>
                                                <div key={index} className="teacher-card">
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`${styles.imageComp}`}
                                                            src={`/${teacher.file_url}`}
                                                            width={230}
                                                            height={180}
                                                            alt={teacher.name}
                                                        />
                                                    </div>
                                                    <div className={`m-2 d-flex justify-content-start`}>
                                                        <p className={`${styles.titleContent} text-start`}>{teacher.name}</p>
                                                    </div>
                                                    <div className={`m-2 d-flex justify-content-start`}>
                                                        <p className={`${styles.textContent} text-start`}>{teacher.short_description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            }
                    </div>
                    <div className={`d-flex justify-content-center my-4`}>
                        <CustomButton buttonText='Đội ngũ giáo viên' url='/teachers' textColor='white'
                                      backgroundColor='#fc7d3a'/>
                    </div>
                </div>
            </div>

            {/* <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-center`}>Tin tức</h1>
                        </div>
                    </div>


                </div>
            </div> */}
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await ssrAxiosGet(context, '/api/teachers/list?limit=4')
    const teachers = res?.data.data ?? []
    return {props: {teachers}}
}

export default Home;
