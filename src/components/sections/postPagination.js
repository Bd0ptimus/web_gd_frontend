import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import React, { Component, useEffect, useState, useRef } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Input
} from "@nextui-org/react";
import {
    faMagnifyingGlass,
    faCalendarDays,
    faArrowRight,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import styles from './postPagination.module.scss';
import { formatTimeStampToCommonDate } from '@/helpers/commonFunction'
import useAxiosRequest from '@/helpers/axiosRequest';
function PostPagination({ isLoaded, postId }) {
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    useEffect(() => {
        load();
    }, [isLoaded])

    const axiosRequest = useAxiosRequest();

    async function load() {
        let requestUrl = `/api/public/get-post-pagination/${postId}`
        const response = await axiosRequest.axiosGet(requestUrl);
        if (response.success) {
            console.log('get done')
            setNext(response.data?.next)
            setPrevious(response.data?.previous)
        }
    }

    return (
        <div className={`col-12 d-flex justify-content-between ${styles.pageDirect}`}>
            <div className={`col-6 col-lg-4 d-flex justify-content-start`}>
                {
                    previous && (
                        <>
                            <Link href={previous.url ?? '#'} className={`${styles.arrowSec} d-flex justify-content-center mr-2`}>
                                <FontAwesomeIcon className={`${styles.icon}`} icon={faArrowLeft} size="xl" />
                            </Link>
                            <div className={`d-block justify-content-start`}>
                                <p className={`text-start ${styles.title}`}>Tin trước</p>
                                <p className={`text-start ${styles.content}`}>{previous?.listing_title}</p>
                            </div>
                        </>
                    )
                }

            </div>
            <div className={`col-6 col-lg-4 d-flex justify-content-end`}>
                {
                    next && (
                        <>
                            <div className={`d-block justify-content-start`}>
                                <p className={`text-end ${styles.title}`}>Tin kế tiếp</p>
                                <p className={`text-start ${styles.content}`}>{next?.listing_title}</p>
                            </div>
                            <Link href={next.url ?? '#'} className={`${styles.arrowSec} d-flex justify-content-center ml-2`}>
                                <FontAwesomeIcon className={`${styles.icon}`} icon={faArrowRight} size="xl" />
                            </Link>
                        </>
                    )
                }
            </div>
            
        </div>
    );
}

export default PostPagination;
