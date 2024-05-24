import styles from './index.module.scss';
import Image from 'next/image';
import CustomButton from '@/components/elements/customButton';
import {ssrAxiosGet} from "@/helpers/ssrAxiosRequest";

function Teachers({teachers}) {
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
                <div className="row">
                    {
                        teachers.map((teacher, index) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-3 mb-3 mt-4 d-flex justify-content-center ">
                                    <div className={`d-flex flex-column ${styles.customCard}`}>
                                        <Image
                                            className={`mb-3 ${styles.imgTeacher}`}
                                            src={`/${teacher.file_url}`}
                                            width={234}
                                            height={200}
                                            alt="Teacher" />
                                        <div className={`${styles.infoTeacher}`}>
                                            <h5 className={`${styles.titleTeacher}`}> {`${teacher.name}`}</h5>
                                            <p className={`${styles.introTeacher}`}>
                                                {teacher.short_description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    );
}

export async function getServerSideProps(context) {
    const res = await ssrAxiosGet(context, '/api/teachers/list')
    const teachers = res?.data.data ?? []
    return {props: {teachers}}
}

export default Teachers;
