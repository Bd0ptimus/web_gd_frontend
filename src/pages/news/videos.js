import styles from './news.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { TikTokEmbed } from 'react-social-media-embed';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import CustomButton from '@/components/elements/customButton';
import { ssrAxiosGet } from '@/helpers/ssrAxiosRequest';

function Videos({ data }) {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        setVideos(data)
    }, [data])
    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-center`}>Video</h1>
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`col-12 col-xl-4`}
                                    src="/assets/components/underline.png"
                                    width={150}
                                    height={30}
                                    alt="underline" />
                            </div>
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.postsContainer} d-md-flex d-block justify-content-start`}>
                        {
                            videos.map((video) => {
                                return (
                                    <div className={`col-lg-3 col-md-6 col-12 p-2`}>
                                        <div className={` p-2 d-block justify-content-center`}>
                                            <div className={`col-12 d-flex justify-content-center`}>
                                                <TikTokEmbed
                                                    url={video?.video_url}
                                                    width={325}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                        {/* <div className={`col-lg-3 col-md-6 col-12 p-2`}>
                            <div className={`${styles.postsSections} p-2 d-block justify-content-center`}>
                                <div className={`col-12 d-flex justify-content-center`}>
                                    <TikTokEmbed
                                        url="https://www.tiktok.com/@loponclc/video/7364388727512255762"
                                        width={350}
                                    />
                                </div>
                            </div>
                        </div> */}

                        {/* <div className={`col-lg-4 col-12 p-md-4 p-2`}>
                            <div className={`${styles.postsSections} p-2 d-block justify-content-center`}>
                                <div className={`col-12 d-flex justify-content-center`}>
                                    <iframe className={`${styles.videosSections}`} width="600" height="550" src="https://www.youtube.com/embed/GagFI25XywI?si=QMDysnsXwmPNPyJ1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                                <div className={`col-12 d-block justify-content-center`}>
                                    <div className={`m-2 d-flex justify-content-start`}>
                                        <p className={`${styles.textContent} text-start`}>Lắng nghe những chia sẻ thú vị từ các học sinh đã trải qua hành trình ôn luyện tại Trung tâm Nguyễn Tất Thành và họ đã vượt qua những thách thức như thế nào để đạt được thành công trong kỳ thi quan trọng.</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    const videosData = await ssrAxiosGet(context, `/api/public/get-litsing-video`);
    const data = videosData?.data
    return { props: { data } }
}

export default Videos;