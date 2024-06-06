import styles from './teacherDetail.module.scss';
import Image from 'next/image';
import CustomButton from '@/components/elements/customButton';
import { ssrAxiosGet } from "@/helpers/ssrAxiosRequest";

function TeacherDetail({ teacher }) {
    return (
        <div className={`${styles.pageContainer}`}>
            <div className="container-fluid">
                <div className={`w-100 d-flex justify-content-center vh-50 ${styles.introBoxTitle}`}>
                    <div className={`row ${styles.introRow}`}>
                        <div className="col-12">
                            <h3 className={`text-center ${styles.introTitle}`}>Đội ngũ giáo viên</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-around">
                    <div className="col-12 col-md-5 col-lg-4 mt-4 d-flex justify-content-center">
                        <div className={`d-flex flex-column justify-content-center ${styles.customCard}`}>
                                <Image
                                    className={`${styles.imgTeacher}`}
                                    src={`/${teacher.file_url}`}
                                    width={348}
                                    height={448}
                                    alt="Teacher" />
                            <div className={`${styles.bulletSection}`}>
                                <h1 className={`${styles.titleTeacher}`}> {`${teacher.name}`}</h1>
                                <div className={`${styles.bulletPoint}`}>
                                    {teacher.bullet_point && teacher.bullet_point.map((point, index) => {
                                            return (
                                                <li key={index}>{point}</li>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-7 mt-4 d-flex flex-column justify-content-start ">
                        <div className={`${styles.teachingSection}`}>
                            <h1 className={`${styles.sectionTitle}`}>Phương châm giảng dạy </h1>
                            <div className={`${styles.content}`}>
                                <p>
                                    {teacher.motto}
                                </p>
                            </div>
                            <div className={`${styles.quoteSection}`}>
                                <p className={`${styles.coolicon}`}> " </p>
                                <p>
                                    {teacher.quote}
                                </p>
                            </div>
                            <div className={`${styles.content}`}>
                                <p>
                                    {teacher.description}
                                </p>
                            </div>
                        </div>
                        <div className={`${styles.teachingSection}`}>
                            <h1 className={`${styles.sectionTitle}`}>Quan điểm giảng dạy </h1>
                            <div className={`${styles.content}`}>
                                <p>
                                    {teacher.viewpoint}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export async function getServerSideProps(context) {
    const id = context.query.id;
    const res = await ssrAxiosGet(context, `/api/teachers/${id}`);
    const teacher = res?.data?.data ?? [];
    return {props: {teacher}};
}

export default TeacherDetail;
