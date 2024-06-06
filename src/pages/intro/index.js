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
                            src="/assets/components/underlineOrange.png"
                            width={150}
                            height={30}
                            alt="underline" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div
                    className={`d-flex flex-column flex-md-row justify-content-between ${styles.dashedHr} ${styles.allContent}`}>
                    <div className={`col-12 ${styles.contentIntro}`}>
                        <div className="d-flex flex-column">
                            <div className={styles.introDivHeader}>
                                <h3 className={`mb-5 ${styles.header}`}>
                                    Về lớp ôn Chất lượng cao Nguyễn Tất Thành
                                </h3>
                            </div>
                            <div
                                className={`${styles.typography}`}
                            >
                                <p>
                                    Lớp ôn CLC Nguyễn Tất Thành được sáng lập vào năm 2022 bởi ông Đỗ Bá Hoài Giao, một người đã dành mọi tâm huyết và đam mê của mình dành cho giáo dục, với mục tiêu mang đến môi trường học tập chất lượng cao và hiệu quả cho học sinh. Trong thời gian ngắn, lớp ôn CLC Nguyễn Tất Thành đã nhanh chóng khẳng định vị trí của mình trong lòng phụ huynh và học sinh nhờ vào chương trình đào tạo bài bản, đội ngũ giáo viên tận tâm và cơ sở vật chất hiện đại.
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
                            src="/assets/intro/intro1.png"
                            width={486}
                            height={520}
                            alt="Class" />
                    </div>
                    <div className={`col-12 col-md-7 ${styles.contentIntro} ${styles.order1}`}>
                        <div className="d-flex flex-column">
                            <div className={styles.introDivHeader}>
                                <h3 className={`mb-5 ${styles.header}`}>
                                    Quy mô lớp ôn Chất lượng cao Nguyễn Tất Thành
                                </h3>
                            </div>
                            <div
                                className={`${styles.typography}`}
                            >
                                <p>
                                    Lớp ôn CLC Nguyễn Tất Thành hiện đang có khoảng 1000 học sinh theo học, được hỗ trợ bởi đội ngũ  gần 50 giáo viên và trợ giảng. Địa điểm học đặt tại tòa D7, Trường Đại học Sư phạm Hà Nội, số 136 Xuân Thủy, Cầu Giấy, Hà Nội. Với hơn 10 phòng học được trang bị đầy đủ máy chiếu, điều hòa và các thiết bị hiện đại khác, học sinh luôn có môi trường học tập thoải mái và tiện nghi.                                </p>
                                <p>
                                    Lớp ôn CLC Nguyễn Tất Thành khẳng định thương hiệu của mình với các chương trình ôn luyện thi vào lớp 6 và lớp 10 các trường Chuyên, Chất lượng cao trên địa bàn Hà Nội. Trong 2 năm hình hình thành và phát triển, lớp ôn có gần 1000 học sinh đỗ vào các trường THCS và THPT Chuyên,  Chất lượng cao.
                                </p>
                                <p>
                                    Năm 2024,  Lớp ôn CLC Nguyễn Tất Thành đã phát triển thêm mảng học online dành cho học sinh ở xa mà vẫn có nhu cầu theo học. Năm học 2023 – 2024, Lớp ôn đã tổ chức 40 lớp học trực tiếp và 6 lớp học trực tuyến.                                 </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`d-flex flex-column flex-md-row justify-content-between  ${styles.dashedHr} ${styles.allContent}`}>
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
                                    Chương trình đào tạo
                                </h3>
                            </div>
                            <div
                                className={`${styles.typography}`}
                            >
                                <p>
                                    Xác định hướng đi của mình ngay từ ngày đầu thành lập,  Lớp ôn CLC Nguyễn Tất Thành cung cấp các khóa học đa dạng từ tiểu học đến trung học phổ thông, với mục tiêu bồi dưỡng cho các em học sinh thi vào các trường Chuyên, Chất lượng cao trên địa bàn thành phố.
                                </p>
                                <p>
                                    Các chương trình đào tạo tại Lớp ôn CLC Nguyễn Tất Thành như sau:
                                </p>

                                <p style={{fontWeight:600}}>
                                    Khối Tiểu Học (Lớp 3 đến lớp 5)
                                </p>
                                <p>
                                    Môn học: Toán, Tiếng Việt, Tiếng Anh
                                </p>
                                <p>
                                    Luyện thi vào 6 các trường Chuyên, Chất lượng cao
                                </p>
                                <p>
                                    Đối với khối Tiểu học, chương trình đào tạo được xây dựng chuẩn Bộ Giáo dục và Đào tạo, kết hợp với tài liệu riêng phù hợp với mức độ nhận thức và tư duy của từng học sinh. Học sinh được củng cố kiến thức cơ bản và luyện giải các dạng bài tập nâng cao, chuẩn bị tốt cho các kỳ thi vào các trường Chuyên, Chất lượng cao.
                                </p>

                                <p style={{fontWeight:600}}>
                                    Khối Trung Học Cơ Sở (Lớp 6 đến lớp 9)
                                </p>
                                <p>
                                    Môn học: Toán, Ngữ văn, Tiếng Anh
                                </p>
                                <p>
                                    Luyện thi vào 10 các trường Chuyên, Chất lượng cao
                                </p>
                                <p>
                                    Tương tự khối Tiểu học, chương trình đào tạo của Khối THCS cũng được xây dựng chuẩn Bộ Giáo dục và Đào tạo, học sinh học theo tài liệu riêng, luyện giải các dạng bài cơ bản và nâng cao. Đặc biệt, lớp ôn còn định hướng ôn tập các dạng đề thi vào trường chất lượng cao như Nguyễn Tất Thành, Chuyên Sư phạm, Chuyên Ngoại Ngữ.
                                </p>

                                <p style={{fontWeight:600}}>
                                    Khối Trung Học Phổ Thông (Lớp 10 đến lớp 12)
                                </p>
                                <p>
                                    Môn học: Toán, Vật lý, Hóa học, Ngữ văn, Anh, Ôn thi đánh giá TSA
                                </p>
                                <p>
                                    Ôn thi THPT Quốc gia
                                </p>
                                <p>
                                    Đối với khối 12, lớp ôn tập trung dạy trước chương trình lớp 12 và ôn luyện theo các chuyên đề bám sát thi THPT Quốc Gia. Học sinh được định hướng thi đánh giá tư duy của ĐH Bách khoa Hà Nội với các bài test theo từng chủ đề. Đối với khối 10 và 11, chương trình bám sát yêu cầu đạt và phát triển năng lực học sinh, định hướng thi đánh giá năng lực khoa học.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`d-flex flex-column flex-md-row justify-content-between ${styles.allContent}`}>
                    <div className={`col-12 col-md-4 ${styles.order2}`}>
                        <Image
                            className={`${styles.imgIntro}`}
                            src="/assets/intro/intro3.png"
                            width={486}
                            height={520}
                            alt="Class" />
                    </div>
                    <div className={`col-12 col-md-7 ${styles.contentIntro} ${styles.order1}`}>
                        <div className="d-flex flex-column">
                            <div
                                className={`${styles.typography}`}
                            >
                                <p>
                                    Lớp ôn CLC Nguyễn Tất Thành luôn tự hào với thành tích nổi bật của học sinh trong các kỳ thi. Tỷ lệ học sinh đỗ vào các trường THCS, THPT chất lượng cao luôn ở mức cao, là minh chứng rõ ràng cho chất lượng đào tạo và sự nỗ lực không ngừng của đội ngũ giáo viên. Các học sinh không chỉ đạt được kết quả cao trong học tập mà còn phát triển tư duy toàn diện, sẵn sàng cho những thử thách học thuật ở các cấp học cao hơn.                                
                                </p>
                                <p>
                                    Bên cạnh đó, Lớp ôn CLC Nguyễn Tất Thành nhận được rất nhiều phản hồi tích cực từ  quý phụ huynh và học sinh, được đánh giá cao về chất lượng chương trình đào tạo, sự nhiệt tình của giáo viên và phương pháp giảng dạy thú vị, tạo hứng thú học tập cho học sinh. Thành tích học tập của học sinh sau khi tham gia học tại đây thường rất cao, góp phần khẳng định uy tín của lớp ôn.
                                </p>
                                <p>
                                    Quy trình đăng ký học đơn giản và thuận tiện. Học sinh có nhu cầu học tập tại lớp ôn có thể liên hệ qua Fanpage hoặc số điện thoại của trung tâm. Học sinh sẽ được học thử một buổi trước khi vào học chính thức và có bài kiểm tra đánh giá đầu vào cho các bạn lớp 4-5.
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
