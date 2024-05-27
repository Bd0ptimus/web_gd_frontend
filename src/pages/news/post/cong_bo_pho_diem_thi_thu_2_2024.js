import styles from '../news.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import CustomButton from '@/components/elements/customButton';
import { ssrAxiosGet } from '@/helpers/ssrAxiosRequest';
import SearchPosts from '@/components/sections/searchPosts';
import {
    faMagnifyingGlass,
    faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostPagination from '@/components/sections/postPagination';
function CongBoDiemThiThu2Nam2024({ data }) {
    const [news, setNews] = useState([]);
    useEffect(() => {
        setNews(data)
        console.log('data news : ', news, 'data : ', data)
    }, [data])
    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} ${styles.postDetail} d-lg-flex d-block justify-content-center`}>
                    <div className={`col-12 col-lg-9`}>
                        <div className={`d-block justify-content-start`}>
                            <div className={`col-12 d-block justify-content-start mb-4 `}>
                                <h1 className={`${styles.postTitle} text-start`}>LỚP ÔN CLC NGUYỄN TẤT THÀNH CÔNG BỐ PHỔ ĐIỂM VÀ ĐÁP ÁN KỲ THI THỬ VÀO LỚP 6 LẦN II NĂM 2024</h1>
                                {/* underline */}
                            </div>
                            <div className={`col-12 d-flex justify-content-start mb-4 ${styles.postParagraphSecContent}`}>
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <p className={`my-0 mx-3`}>08-05-2024</p>                       
                            </div>
                        </div>
                        <hr />
                        <div className={`${styles.postsContainer} d-block justify-content-start`}>
                            <div className={`${styles.postParagraphSecTitle}`}>
                                Theo phổ điểm mới được công bố, phần lớn thí sinh thi thử đạt từ 14 điểm đến 22 điểm.
                            </div>
                            <div className={`${styles.postParagraphSecContent}`}>
                                Ngày 22/5, lớp ôn CLC Nguyễn Tất Thành công bố phổ điểm và đáp án kỳ thi thử vào lớp 6 lần II năm 2024. Đây là kỳ thi do lớp ôn tổ chức trực tiếp ngày 12/5, giúp thí sinh làm quen với cấu trúc, cách thức thi của bài thi tuyển sinh lớp 6 năm 2024.
                            </div>
                            <div className={`${styles.postParagraphSecContent}`}>
                                Số lượng thí sinh trả lời đạt 14 đến 22 điểm chiếm tỷ trọng cao nhất.
                            </div>
                            <div className={`${styles.postParagraphSecContent}`}>
                                Qua thống kê, hơn 100 thí sinh tham gia thi thử với đầy đủ 3 môn thi. Phân tích kết quả cho thấy, tổng thể bài thi đạt chất lượng tốt, có độ tin cậy cao, bao phủ được toàn bộ yêu cầu về mục tiêu đề ra.                            
                            </div>
                        </div>

                        <div className={`${styles.postsContainer} d-block justify-content-start`}>
                            <div className={`${styles.postParagraphSecTitle}`}>
                            Phổ điểm có hình chuông với đỉnh phổ ở khoảng 16,6 đến 22 điểm, thể hiện tính phân loại cao nhằm đánh giá năng lực tuyển sinh lớp 6.
                            </div>
                            <div className={`${styles.postParagraphSecContent}`}>
                                Dựa trên kết quả làm bài của thí sinh, lớp ôn đã phân tích phổ điểm của bài thi của 3 môn thi như sau:                            
                            </div>
                            <div className={`col-12 d-flex justify-content-center ${styles.postParagraphSecImage}`}>
                                <Image
                                    className={`${styles.paragraphImage}`}
                                    src="/assets/posts/cong_bo_diem_thi_thu_2_2024/pho_diem_thi_thu_toan.jpg"
                                    width={1024}
                                    height={1024}
                                    alt="Post picture" />
                            </div>
                            <div className={`${styles.postParagraphSecContent} d-flex justify-content-start`}>
                                <b>Đề thi môn Toán : </b> <Link href="http://bit.ly/44WcqPv">Click để xem</Link>
                            </div>
                            <div className={`${styles.postParagraphSecContent} d-flex justify-content-start`}>
                                <b>Đáp án đề thi môn Toán : </b> <Link href="https://bit.ly/4bQKcb6">Click để xem</Link>
                            </div>
                            <div className={`${styles.postParagraphSecContent}`}>
                                Đề thi thử vào lớp 6 của lớp ôn CLC Nguyễn Tất Thành được thiết kế minh họa theo cấu trúc và nội dung của một bài thi tuyển sinh lớp 6 thật, gồm có 3 môn: Toán, Tiếng Việt, Tiếng Anh.                            
                            </div>
                            <div className={`${styles.postParagraphSecContent}`}>
                                Trong đó, phần thi môn Toán học gồm 8 câu hỏi trắc nghiệm và 2 câu hỏi tự luận (45 phút); phần thi môn Tiếng Việt gồm 10 câu hỏi tự luận và trắc nghiệm (45 phút); phần thi môn Tiếng Anh gồm 25 câu hỏi trắc nghiệm và câu hỏi tự luận (30 phút).                             
                            </div>
                            <div className={`col-12 d-flex justify-content-center ${styles.postParagraphSecImage}`}>
                                <Image
                                    className={`${styles.paragraphImage}`}
                                    src="/assets/posts/cong_bo_diem_thi_thu_2_2024/pho_diem_thi_thu_tieng_viet.jpg"
                                    width={1024}
                                    height={1024}
                                    alt="Post picture" />
                            </div>
                            <div className={`${styles.postParagraphSecContent} d-flex justify-content-start`}>
                                <b>Đề thi môn Tiếng Việt : </b> <Link href="https://bit.ly/4auND6h">Click để xem</Link>
                            </div>
                            <div className={`${styles.postParagraphSecContent} d-flex justify-content-start`}>
                                <b>Đáp án đề thi môn Tiếng Việt : </b> <Link href="https://bit.ly/4dTMWWW">Click để xem</Link>
                            </div>
                            <div className={`${styles.postParagraphSecContent}`}>
                                Với phổ điểm trên đây, thí sinh có thể tự tin dựa vào đó để đánh giá năng lực của mình, qua đó đưa ra quyết định thi tuyển vào trường THCS mong muốn.                             
                            </div>
                            <div className={`col-12 d-flex justify-content-center ${styles.postParagraphSecImage}`}>
                                <Image
                                    className={`${styles.paragraphImage}`}
                                    src="/assets/posts/cong_bo_diem_thi_thu_2_2024/pho_diem_thi_thu_tieng_anh.jpg"
                                    width={1024}
                                    height={1024}
                                    alt="Post picture" />
                            </div>
                            <div className={`${styles.postParagraphSecContent} d-flex justify-content-start`}>
                                <b>Đề thi môn Tiếng Anh : </b> <Link href="https://bit.ly/4bQjijS">Click để xem</Link>
                            </div>
                            <div className={`${styles.postParagraphSecContent} d-flex justify-content-start`}>
                                <b>Đáp án đề thi môn Tiếng  Anh : </b> <Link href="https://bit.ly/3yvSJSJ">Click để xem</Link>
                            </div>
                            <div className={`col-12 d-flex justify-content-center ${styles.postParagraphSecImage}`}>
                                <Image
                                    className={`${styles.paragraphImage}`}
                                    src="/assets/posts/cong_bo_diem_thi_thu_2_2024/pho_diem_thi_thu_tong_diem.jpg"
                                    width={1024}
                                    height={1024}
                                    alt="Post picture" />
                            </div>
                            <div className={`${styles.postParagraphSecContent}`}>
                                Theo Lớp ôn CLC Nguyễn Tất Thành, năm 2024 lớp ôn đã tổ chức 2 kỳ thi thử vào lớp 6 với mục đích đánh giá năng lực học sinh, qua đó giúp các em học sinh đưa ra quyết định thi tuyển vào các trường THCS CLC trên địa bàn.                            
                            </div>
                        </div>
                        <hr/>
                        <div className={`${styles.postsContainer} d-flex justify-content-center`}>
                            <PostPagination isLoaded="true" postId="2"/>
                        </div>
                    </div>
                    <div className={`col-12 col-lg-3 d-block justify-content-start mx-lg-3 mx-0 my-0`}>
                        <SearchPosts isLoaded="true"/>

                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    // const newsData = await ssrAxiosGet(context, `/api/public/get-litsing-news`);
    const data = {}
    return { props: { data } }
}

export default CongBoDiemThiThu2Nam2024;