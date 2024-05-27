import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import React, { Component, useEffect, useState, useRef } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Input
} from "@nextui-org/react";
import {
    faMagnifyingGlass,
    faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import styles from './searchPosts.module.scss';
import { formatTimeStampToCommonDate } from '@/helpers/commonFunction'
import useAxiosRequest from '@/helpers/axiosRequest';
function SearchPosts({ isLoaded }) {
    const [q, setq] = useState('');
    const [posts, setPosts] = useState([]);
    const [postsSearched, setPostsSearched] = useState([]);

    useEffect(() => {
        loadNewPosts();
    }, [isLoaded])

    const axiosRequest = useAxiosRequest();

    async function loadNewPosts() {
        let requestUrl = `/api/public/get-litsing-news?type=new_posts`
        const response = await axiosRequest.axiosGet(requestUrl);
        if (response.success) {
            console.log('get done')
            setPosts(response.data)
        }
    }

    async function searchPosts() {
        let requestUrl = `/api/public/get-litsing-news?type=search_posts`
        if (q && q != '') {
            requestUrl = requestUrl + `&q=${q}`
        }

        const response = await axiosRequest.axiosGet(requestUrl);
        if (response.success) {
            setPostsSearched(response.data)
        }
    }

    const qInputDown = (e) => {
        if (e.key === 'Enter') {
            searchPosts()
        }
    }

    return (
        <div className={`col-12 d-block ${styles.searchPostSec}  p-3`}>
            <div className={`col-12 d-block mb-4`}>
                <h5 className={`${styles.searchTitle}`}> Tìm kiếm</h5>
                <Input
                    type="text"
                    variant="bordered"
                    placeholder='Tìm kiếm'
                    value={q}
                    onChange={(e) => setq(e.target.value)}
                    onKeyDown={(e) => qInputDown(e)}
                    endContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                />
            </div>
            <hr />
            {postsSearched.length > 0 && (
                <>
                    <h5 className={`${styles.searchTitle}`}> Kết quả tìm kiếm</h5>
                    <div className={`col-12 d-block mb-4`}>
                        {
                            postsSearched.map((post, index) => {
                                return (
                                    <Link href={post.url ?? '#'} className={`col-12 d-block my-3 ${styles.postSearchResultLink}`} key={index}>
                                        <p className={`${styles.postsSearchedTitle}`}>{post.listing_title}</p>
                                        <div className={`d-flex justify-content-start ${styles.postSearchedCreatedAt}`}>
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                            <p className={`px-2`}>{formatTimeStampToCommonDate(post.created_at)}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </>

            )}

            {
                postsSearched.length == 0 && (
                    <div className={`col-12 d-block mb-4`}>
                        <h5 className={`${styles.searchTitle}`}> Bài viết mới</h5>
                        {
                            posts.map((post, index) => {
                                return (
                                    <Link href={post.url ?? '#'} className={`col-12 d-block my-3 ${styles.postSearchResultLink}`} key={index}>
                                        <p className={`${styles.postsSearchedTitle}`}>{post.listing_title}</p>
                                        <div className={`d-flex justify-content-start ${styles.postSearchedCreatedAt}`}>
                                            <FontAwesomeIcon icon={faCalendarDays} />
                                            <p className={`px-2`}>{formatTimeStampToCommonDate(post.created_at)}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                )
            }
            
        </div>
    );
}

export default SearchPosts;
