import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import React, { Component, useEffect, useState, useRef } from 'react';
import { BsInfoCircle  } from 'react-icons/bs';
import {formatTimeStampToCommonDate} from '@/helpers/commonFunction';
import styles from './searchResult.module.scss';
import {roundToCustomDecimal} from '@/helpers/commonFunction'
function SearchResult (props) {
    function caculateTotalScore(math, literature, english) {
        typeof math === 'string' ? math = 0 : math = parseFloat(math);
        typeof literature === 'string' ? literature = 0 : literature = parseFloat(literature);
        typeof english === 'string' ? english = 0 : english = parseFloat(english);

        return roundToCustomDecimal(math + literature + english, 2);
    }

    return (
        <Modal
            show = {props.show}
            onHide = {props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{borderRadius:20}}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='m-2'>
                        Kết quả tra cứu
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`row d-md-flex d-block m-2 mt-1 pb-4 pt-1 ${styles.topSec}`}>
                    <div className={`d-md-flex d-block`}>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Họ tên
                            </div>
                            <div className={`text-md-start text-end ${styles.resultContent}`}>
                                {props.name}
                            </div>
                        </div>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                 Số báo danh
                            </div>
                            <div className={`text-md-start text-end  ${styles.resultContent}`}>
                                {props.studentId}
                            </div>
                        </div>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Ngày sinh
                            </div>
                            <div className={`text-md-start text-end  ${styles.resultContent}`}>
                                {props.birthday}
                            </div>
                        </div>
                        
                    </div>
                    <div className={`d-md-flex d-block`}>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Phòng thi
                            </div>
                            <div className={`text-md-start text-end  ${styles.resultContent}`}>
                                {props.room}
                            </div>
                        </div>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Địa điểm thi
                            </div>
                            <div className={`text-md-start text-end  ${styles.resultContent}`}>
                                {props.location}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row d-md-flex d-block m-2 py-4`}>
                    <div className={`d-md-flex d-block`}>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Điểm toán
                            </div>
                            <div className={`text-md-start text-end  ${styles.resultContent}`}>
                                {props.math}
                            </div>
                        </div>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Điểm Văn
                            </div>
                            <div className={`text-md-start text-end ${styles.resultContent}`}>
                                {props.literature}
                            </div>
                        </div>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Điểm Tiếng Anh
                            </div>
                            <div className={`text-md-start text-end ${styles.resultContent}`}>
                                {props.english}
                            </div>
                        </div>
                    </div>
                    <div className={`d-md-flex d-block`}>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Tổng điểm
                            </div>
                            <div className={`text-md-start text-end ${styles.resultContent}`}>
                                { caculateTotalScore(props.math, props.literature, props.english) }
                            </div>
                        </div>
                        <div className={`d-md-block d-flex justify-content-md-start justify-content-between col-md-4 col-12 my-3`}>
                            <div className={`text-start ${styles.resultLabel}`}>
                                Chi tiết bài thi
                            </div>
                            <div className={`text-md-start text-end ${styles.resultContent}`}>
                                <a href={props.linkExam} target="_blank" rel="noreferrer"> Click để xem </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`d-flex justify-content-start m-2 p-2 ${styles.infoSec}`}>
                    <div className='text-start my-1' style={{width: 16, height: 16, marginRight: 10}}>
                        <BsInfoCircle />
                    </div>
                    <div className={`text-start ${styles.textContent}`} style={{height: 16}}>
                        Tổng = Điểm Toán + Điểm Văn + Điểm Anh
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SearchResult;
