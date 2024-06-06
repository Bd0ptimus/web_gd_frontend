import styles from '../schedule.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import CustomButton from '@/components/elements/customButton';
import { ssrAxiosGet } from '@/helpers/ssrAxiosRequest';
import Tabs from '@/components/elements/tabs';

function TieuHoc({ data }) {
    const [tabSelected, setTabSelected] = useState('3');
    useEffect(() => {
    }, [data])
    const classList = [
        {
            value: '3',
            content: 'Lớp 3'
        },
        {
            value: '4',
            content: 'Lớp 4'
        },
        {
            value: '5',
            content: 'Lớp 5'
        }
    ]
    function tabSelectedHandler (tabValue) {
        setTabSelected(tabValue)
        console.log('tabs selected : ', tabValue)
    }
    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} ${styles.classDetail} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-center`}>Khối tiểu học</h1>
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
                        <div className={`col-12 col-md-8`}>
                            {/* <Tabs variant="underlined" aria-label="Tabs variants" size="lg"
                                color="primary"
                                selectedKey={tabSelected}
                                onSelectionChange={setTabSelected}
                            >
                                <Tab style={{fontSize:20}} key="3" title="Lớp 3" />
                                <Tab style={{fontSize:20}} key="4" title="Lớp 4" />
                                <Tab style={{fontSize:20}} key="5" title="Lớp 5" />
                            </Tabs> */}
                            <Tabs options={classList} response={(e) => tabSelectedHandler(e)} valueSelect={tabSelected}/>


                            <div className={`d-block my-4`}>
                                <div className={`${styles.postParagraphSecTitle}`}>
                                    Các môn học đang được giảng dạy tại trung tâm
                                </div>
                                <div className={`d-flex justify-content-start`}>
                                    <div className={`col-4 col-xl-2 p-1`}>
                                        <div className={`d-block ${styles.classSelectSec} m-1`}>
                                            <div className={`d-flex justify-content-center`}>
                                                <Image
                                                    className={`col-12 ${styles.classImage}`}
                                                    src="/assets/classes/toan.png"
                                                    width={80}
                                                    height={80}
                                                    alt="class" />
                                            </div>
                                            <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                Toán
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`col-4 col-xl-2 p-1`}>
                                        <div className={`d-block ${styles.classSelectSec} m-1`}>
                                            <div className={`d-flex justify-content-center`}>
                                                <Image
                                                    className={`col-12 ${styles.classImage}`}
                                                    src="/assets/classes/van.png"
                                                    width={80}
                                                    height={80}
                                                    alt="class" />
                                            </div>
                                            <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                Ngữ Văn
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`col-4 col-xl-2 p-1`}>
                                        <div className={`d-block ${styles.classSelectSec} m-1`}>
                                            <div className={`d-flex justify-content-center`}>
                                                <Image
                                                    className={`col-12 ${styles.classImage}`}
                                                    src="/assets/classes/tieng_anh.png"
                                                    width={80}
                                                    height={80}
                                                    alt="class" />
                                            </div>
                                            <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                Tiếng Anh
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div className={`d-block my-4`}>
                                <div className={`${styles.postParagraphSecTitle}`}>
                                    Bồi dưỡng lớp X
                                </div>
                                <div className={`${styles.postParagraphSecContent}`}>
                                    Chương trình bồi dưỡng lớp X kế thừa những nội dung quan trọng từ lớp Y, đồng thời bổ sung các phần kiến thức mới mẻ về kiến thức. Lớp ôn chất lượng cao Nguyễn Tất Thành có các lớp X được phân theo từng trình độ từ cơ bản đến nâng cao, tại đó các con được học kiến thức theo lộ trình như sau: Học chắc kiến thức cơ bản, kiến thức nền và những phương pháp giải toán thông dụng. Có sự nâng cao, mở rộng hợp lý tùy theo năng lực và khả năng tiếp thu của học sinh.                                
                                </div>
                            </div>
                        </div>
                        <div className={`col-12 col-md-4`}></div>
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

export default TieuHoc;