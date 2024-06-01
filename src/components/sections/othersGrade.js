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
function OthersGrade({ isLoaded, classCode}) {
    const [gradeList, setGradeList] = useState([]);

    useEffect(() => {
        loadGradeList();
    }, [classCode])

    const axiosRequest = useAxiosRequest();

    async function loadGradeList() {
        let requestUrl = `/api/public/get-grades-list/${classCode}`
        const response = await axiosRequest.axiosGet(requestUrl);
        if (response.success) {
            console.log('get done')
            setGradeList(response.data)
        }
    }


    return (
        <div className={`col-12 d-block ${styles.searchPostSec}  p-3`}>
            <div className={`col-12 d-block mb-4`}>
                <h5 className={`${styles.searchTitle}`}>Các lớp học khác</h5>
            </div>
            <div className={`col-12 d-block mb-4`}>
                {
                    gradeList.map((grade, index) => {
                        return (
                            <Link href={grade?.url ?? '#'} className={`col-12 d-block my-3 ${styles.postSearchResultLink}`} key={index}>
                                <p className={`${styles.postsSearchedTitle}`}>{grade?.listing_title}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default OthersGrade;
