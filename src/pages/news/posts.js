import styles from './news.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import CustomButton from '@/components/elements/customButton';
import { ssrAxiosGet } from '@/helpers/ssrAxiosRequest';

function Posts({ data }) {
    const [news, setNews] = useState([]);
    useEffect(() => {
        setNews(data)
        console.log('data news : ', news, 'data : ', data)
    }, [data])
    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            {
                                !news.length ? (
                                    <h1 className={`${styles.secTitles} text-center`}>Không có bài viết nào</h1>

                                ) : (
                                    <h1 className={`${styles.secTitles} text-center`}>Tin tức</h1>

                                )
                            }
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.postsContainer} d-md-flex d-block justify-content-start`}>
                        {
                            news.map((item, index) => {
                                return (
                                    <div className={`col-md-6 col-12 p-md-4 p-2`} key={index}>
                                        <div className={`${styles.postsSections} p-2 d-md-flex d-block justify-content-center`}>
                                            <div className={`col-12 col-md-3 d-flex justify-content-center`}>
                                                <Image
                                                    className={`${styles.imgListing}`}
                                                    src={item.listing_image}
                                                    width={400}
                                                    height={400}
                                                    alt="Post picture" />
                                            </div>
                                            <div className={`col-12 col-md-9 d-block justify-content-center`}>
                                                <div className={`m-2 d-flex justify-content-start`}>
                                                    <p className={`${styles.titleContent} text-start`}>{item.listing_title}</p>
                                                </div>

                                                <div className={`m-2 d-flex justify-content-start`}>
                                                    <p className={`${styles.textContent} text-start`}>{item.listing_content}</p>
                                                </div>
                                                <div className={`m-2 d-flex justify-content-start`}>
                                                    <Link href={item.url} className={`${styles.watchmore} d-flex justify-content-center`}>
                                                        <p className={`m-0 w-100`}>Xem thêm</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    const newsData = await ssrAxiosGet(context, `/api/public/get-litsing-news`);
    const data = newsData.data
    return { props: { data } }
}

export default Posts;