import styles from './index.module.scss';
import Image from 'next/image';

import CustomButton from '@/components/elements/customButton';

function Home({ children }) {
    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} ${styles.introSec} d-flex justify-content-start`}>
                    <div className={` ${styles.textSection} d-block justify-md-content-center justify-content-center`}>
                        <p className={`${styles.firstTitle}`}>
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
                        </div>
                        
                    </div>
                </div>

            </div>

            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} ${styles.introQualitySec} d-block d-md-flex justify-content-between`}>
                    <div className={`col-12 col-md-4 ${styles.leftSec} d-flex justify-content-center justify-content-md-start`}>
                        <Image
                            className={`${styles.imageComp}`}
                            src="/assets/home/intro_quality.png"
                            width={400}
                            height={540}
                            alt="Logo" />
                    </div>

                    <div className={`col-12 col-md-7 col-lg-8 ${styles.rightSec} m-2`}>
                        <div className={`d-block justify-content-center mb-4 mt-2`}>
                            <h1 className={`${styles.secTitles} text-md-start text-center`}>Giới thiệu về lớp ôn Chất lượng cao Nguyễn Tất Thành</h1>
                            {/* underline */}
                        </div>
                        <p  className={`${styles.textContent} text-start`}>
                            Lớp ôn Chất lượng cao Nguyễn Tất Thành là một điểm đến lý tưởng cho các bạn học sinh chuẩn bị cho những kỳ thi quan trọng. Với đội ngũ giáo viên giàu kinh nghiệm và phương pháp giảng dạy chuyên nghiệp, chúng tôi cam kết trang bị cho học sinh những kiến thức và kỹ năng vững chắc, giúp học sinh tự tin vượt qua mọi thách thức trong hành trình học tập. 
                        </p>
                        <p  className={`${styles.textContent} text-start`}>Chúng tôi không chỉ tập trung vào việc truyền đạt kiến thức một cách hiệu quả mà còn khuyến khích sự phát triển toàn diện cho học sinh, từ khả năng tư duy, logic đến kỹ năng làm việc nhóm và giao tiếp. Với một môi trường học tập tích cực và đầy động lực, lớp ôn Chất lượng cao Nguyễn Tất Thành sẽ là nơi tạo ra những học sinh tự tin, đam mê và thành công.</p>
                        <div className={`d-flex justify-content-start`}>
                            <CustomButton buttonText='Xem thêm' url='/' textColor='white' backgroundColor='#01A7E3'/>
                        </div>
                    </div>

                </div>
            </div>

            <div className={`w-100 d-flex justify-content-center ${styles.introCoursesContainer}`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-md-start justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-md-6 col-12 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-md-start text-center`}>Hệ thống khoá học tại lớp ôn Chất lượng cao Nguyễn Tất Thành</h1>
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.scrollList} d-flex justify-content-start justify-content-md-center`}>
                        <div className={`d-block ${styles.courseDetailSec}`}>
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
                                <p className={`${styles.textContent} text-start`}>Củng cố kiến thức Tiểu học, nâng cao để bồi dưỡng các em thi vào các trường Chuyên, Chất lượng cao.</p>
                            </div>

                        </div>

                        <div className={`d-block ${styles.courseDetailSec}`}>
                            <Image
                            className={`${styles.imageComp}`}
                            src="/assets/home/thcs.png"
                            width={400}
                            height={540}
                            alt="Logo" />
                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Khối trung học cơ sở</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start`}>Củng cố kiến thức Tiểu học, nâng cao để bồi dưỡng các em thi vào các trường Chuyên, Chất lượng cao.</p>
                            </div>

                        </div>

                        <div className={`d-block ${styles.courseDetailSec}`}>
                            <Image
                            className={`${styles.imageComp}`}
                            src="/assets/home/thpt.png"
                            width={282}
                            height={180}
                            alt="Logo" />
                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Khối trung học phổ thông</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start `}>Củng cố kiến thức Tiểu học, nâng cao để bồi dưỡng các em thi vào các trường Chuyên, Chất lượng cao.</p>
                            </div>

                        </div>
                    </div>

                    <div className={`d-flex justify-content-center my-4`}>
                        <CustomButton buttonText='Tìm hiểu thêm' url='/' textColor='black' backgroundColor='white'/>
                    </div>
                </div>
            </div>

            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-center`}>Phụ huynh & học sinh nghĩ gì về lớp ôn Chất lượng cao Nguyễn Tất Thành</h1>
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.scrollList} d-flex justify-content-start justify-content-lg-center`}>
                        <div className={`d-block ${styles.videoSec}`}>
                            <iframe width="280" height="550" src="https://www.youtube.com/embed/GagFI25XywI?si=QMDysnsXwmPNPyJ1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                        <div className={`d-block ${styles.videoSec}`}>
                            <iframe width="280" height="550" src="https://www.youtube.com/embed/GagFI25XywI?si=QMDysnsXwmPNPyJ1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                        <div className={`d-block ${styles.videoSec}`}>
                            <iframe width="280" height="550" src="https://www.youtube.com/embed/GagFI25XywI?si=QMDysnsXwmPNPyJ1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-md-start text-center`}>Đội ngũ giáo viên</h1>
                            <h1 className={`${styles.secTitles} text-md-start text-center`}>KINH NGHIỆM - TÀI NĂNG - TÂM HUYẾT</h1>
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.scrollList} d-flex justify-content-start justify-content-lg-center`}>
                        <div className={`d-block ${styles.teacherSec} p-1`}>
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/teachers/le_thi_thanh_huyen.jpg"
                                    width={230}
                                    height={180}
                                    alt="Logo" />
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Lê Thị Thanh Huyền</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start`}>Với hơn 10 năm kinh nghiệm trong lĩnh vực giảng dạy toán học tại Trường THPT Lý Thường Kiệt, Hà Nội, bà đã thể hiện sự nhiệt huyết và sự cam kết cao đối với việc truyền đạt kiến thức cho học sinh.</p>
                            </div>

                        </div>

                        <div className={`d-block ${styles.teacherSec} p-1`}>
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/teachers/nguyen_thi_ha_phuong.jpg"
                                    width={230}
                                    height={180}
                                    alt="Logo" />
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Nguyễn Thị Hà Phương</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start`}>Với hơn 10 năm kinh nghiệm trong lĩnh vực giảng dạy toán học tại Trường THPT Lý Thường Kiệt, Hà Nội, bà đã thể hiện sự nhiệt huyết và sự cam kết cao đối với việc truyền đạt kiến thức cho học sinh.</p>
                            </div>

                        </div>

                        <div className={`d-block ${styles.teacherSec} p-1`}>
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/teachers/tran_thi_thuy_loan.jpg"
                                    width={230}
                                    height={180}
                                    alt="Logo" />
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Trần Thúy Loan</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start`}>Với hơn 10 năm kinh nghiệm trong lĩnh vực giảng dạy toán học tại Trường THPT Lý Thường Kiệt, Hà Nội, bà đã thể hiện sự nhiệt huyết và sự cam kết cao đối với việc truyền đạt kiến thức cho học sinh.</p>
                            </div>

                        </div>

                        <div className={`d-block ${styles.teacherSec} p-1`}>
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`${styles.imageComp}`}
                                    src="/assets/teachers/vu_thi_ngoc_minh.jpg"
                                    width={230}
                                    height={180}
                                    alt="Logo" />
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.titleContent} text-start`}>Vũ Ngọc Minh</p>
                            </div>

                            <div className={`m-2 d-flex justify-content-start`}>
                                <p className={`${styles.textContent} text-start`}>Với hơn 10 năm kinh nghiệm trong lĩnh vực giảng dạy toán học tại Trường THPT Lý Thường Kiệt, Hà Nội, bà đã thể hiện sự nhiệt huyết và sự cam kết cao đối với việc truyền đạt kiến thức cho học sinh.</p>
                            </div>

                        </div>
                    </div>

                    <div className={`d-flex justify-content-center my-4`}>
                        <CustomButton buttonText='Đội ngũ giáo viên' url='/' textColor='white' backgroundColor='#01A7E3'/>
                    </div>
                </div>
            </div>

            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-center`}>Tin tức</h1>
                            {/* underline */}
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps() {
    const data = {}
    return { props: { data } }
}

export default Home;