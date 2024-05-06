import React, { Component, useEffect, useState, useRef } from 'react';
import { Modal} from 'react-bootstrap';
import {
    Button,
} from "@nextui-org/react";
import {
    faCheck,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { BsCalendar2Week, BsChevronDown   } from 'react-icons/bs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

import useAxiosRequest from '@/helpers/axiosRequest';
import styles from './uploadStudentInfoErrorModal.module.scss';
import {formatTimeStampToCommonDate} from '@/helpers/commonFunction';
import * as Constants from '@/config/constants/Constants';
function UploadStudentInfoErrorModal(props) {
    const [infos, setInfos] = useState([]);
    const axiosRequest = useAxiosRequest();

    useEffect(() => {
        setupInfos()
    }, [props.infos])

    const infoChoiceOptions = {
        KEEP_OLD: 'keep_old',
        OVERRIDE_NEW: 'override_new'
    }

    const infoChoosenHandler = (id, option) => {
        props.infos[id].choice = option
        setupInfos()
        updateInfoHandler(id, option)
    }

    const allChoosenHandler = (option) => {
        const students = [];
        Object.values(props.infos).forEach(student => {
            student.choice = option
            students.push(student)
        })
        setInfos(students)
        bulkUpdateInfoHandler(option)
        // updateInfoHandler(id, option)
    }

    const setupInfos = () => {
        const students = [];
        Object.values(props.infos).forEach(student => {
            students.push(student)
        })
        setInfos(students)
    }

    const bulkUpdateInfoHandler = async (option) => {
        try {
            let optionIndex = ''

            switch (option) {
                case infoChoiceOptions.KEEP_OLD:
                    optionIndex = 'old';
                    break;
                case infoChoiceOptions.OVERRIDE_NEW:
                    optionIndex = 'new';
                    break;
            }
            let bulkData = []
            infos.forEach(info => {
                let dataUpdate = {}
                const keys = Object.keys(info.data);
                keys.forEach((key) => {
                    dataUpdate[key] = info.data[key][optionIndex];
                })
                dataUpdate.id = info?.id ?? '' 
                bulkData.push(dataUpdate)
            })
            const response = await axiosRequest.axiosPost('/api/student-information/bulk-update', {
                info: bulkData
            });

            if (response.success) {
                props.onModalSuccess('Update dữ liệu thành công')
            } else {
                props.onModalWarning('Đã xảy ra lỗi, vui lòng thử lại')
            }
        } catch (e) {
            console.error(e)
            props.onModalWarning('Đã xảy ra lỗi, vui lòng thử lại')
        }
    }

    const updateInfoHandler = async (id, option) => {
        try {
            const info = props.infos[id];
            let optionIndex = ''
    
            switch(option) {
                case infoChoiceOptions.KEEP_OLD:
                    optionIndex = 'old';
                    break;
                case infoChoiceOptions.OVERRIDE_NEW:
                    optionIndex = 'new';
                    break;
            }
    
            let dataUpdate = {}
            const keys = Object.keys(info.data);
            keys.forEach((key) => {
                dataUpdate[key] = info.data[key][optionIndex];
            })
    
            const response = await axiosRequest.axiosPost('/api/student-information/update', {
                ...dataUpdate,
                id: info.id
            });

            if (response.status == Constants.RESPONSE_STATUS.SUCCESS) {
                props.onModalSuccess('Update dữ liệu thành công')
            } else {
                props.onModalWarning('Đã xảy ra lỗi, vui lòng thử lại')
            }
        } catch (e) {
            console.error(e)
            props.onModalWarning('Đã xảy ra lỗi, vui lòng thử lại')
        }
    }

    return (
        <Modal
            show = {props.show}
            onHide = {props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable='true'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4 className="text-danger">(! Lỗi ) Phát hiện chồng chéo dữ liệu khi tải lên</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`m-3 p-0 d-block d-md-flex justify-content-start`}>
                    <div className={`col-12 col-sm-6 col-md-6 p-2`}>
                        <div className={`d-flex justify-content-start`}>
                            <b className={`mx-2`}>Năm thi : </b>
                            <p>{props.year}</p>
                        </div>
                    </div>
                    <div className={`col-12 col-sm-6 col-md-6 p-2`}>
                        <div className={`d-flex justify-content-end`}>
                            <b className={`mx-2`}>Kỳ thi : </b>
                            <p>{props.exam}</p>
                        </div>
                    </div>
                </div>
                <div className={`m-3 p-0 d-block d-md-flex justify-content-end`}>
                    <Button size="sm" variant="flat" className={`m-2`} onClick={() => allChoosenHandler(infoChoiceOptions.KEEP_OLD)}>
                        Giữ lại toàn bộ dữ liệu cũ
                    </Button>
                    <Button color="success" size="sm" variant="flat" className={`m-2`} onClick={() => allChoosenHandler(infoChoiceOptions.OVERRIDE_NEW)}>
                        Ghi đè toàn bộ dữ liệu mới
                    </Button>
                </div>
                <div className={`m-3 p-0 d-block justify-content-center`}>
                    {
                        infos.map((item) => {
                            return (
                                <div className={`my-3 p-0 d-block`} key={item.id}>
                                    <hr/>
                                    <div className={`d-flex justify-content-start`}>
                                        <div className={`d-flex justify-content-center`}>
                                            <b className={`mx-2`}>SBD: </b>
                                            <p>{item.student_id}</p>
                                        </div>
                                        <div className={`d-flex justify-content-center`}>
                                            <b className={`mx-2`}> - Họ và tên: </b>
                                            <p>{item.full_name}</p>
                                        </div>
                                    </div>
                                    <div className={`d-flex justify-content-end`}>
                                        <Button size="sm" variant="flat" className={`m-2`} onClick={() => infoChoosenHandler(item.id, infoChoiceOptions.KEEP_OLD)}>
                                            Giữ lại dữ liệu cũ
                                        </Button>
                                        <Button color="success" size="sm" variant="flat"  className={`m-2`} onClick={() => infoChoosenHandler(item.id, infoChoiceOptions.OVERRIDE_NEW)}>
                                            Ghi đè dữ liệu mới
                                        </Button>
                                    </div>
                                    <div className={`w-100 d-flex justify-content-center`}>
                                        <table className={`${styles.compareTable}`}>
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Dữ liệu cũ</th>
                                                    <th scope="col">Dữ liệu mới</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.data.room && (
                                                        <tr>
                                                            <th scope="row">Phòng thi</th>
                                                            <td>{item.data.room.old}</td>
                                                            <td>{item.data.room.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.math && (
                                                        <tr>
                                                            <th scope="row">Điểm Toán</th>
                                                            <td>{item.data.math.old}</td>
                                                            <td>{item.data.math.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.english && (
                                                        <tr>
                                                            <th scope="row">Điểm Tiếng Anh</th>
                                                            <td>{item.data.english.old}</td>
                                                            <td>{item.data.english.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.literature && (
                                                        <tr>
                                                            <th scope="row">Điểm Tiếng Việt</th>
                                                            <td>{item.data.literature.old}</td>
                                                            <td>{item.data.literature.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.birth_date && (
                                                        <tr>
                                                            <th scope="row">Ngày sinh</th>
                                                            <td>{formatTimeStampToCommonDate(item.data.birth_date.old)}</td>
                                                            <td>{formatTimeStampToCommonDate(item.data.birth_date.new)}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.link_exam && (
                                                        <tr>
                                                            <th scope="row">Link bài thi</th>
                                                            <td>{item.data.link_exam.old}</td>
                                                            <td>{item.data.link_exam.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.contact && (
                                                        <tr>
                                                            <th scope="row">Số điện thoại</th>
                                                            <td>{item.data.contact.old}</td>
                                                            <td>{item.data.contact.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.external_id && (
                                                        <tr>
                                                            <th scope="row">STT</th>
                                                            <td>{item.data.external_id.old}</td>
                                                            <td>{item.data.external_id.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.time && (
                                                        <tr>
                                                            <th scope="row">Thời gian thi</th>
                                                            <td>{item.data.time.old}</td>
                                                            <td>{item.data.time.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.data.contact2 && (
                                                        <tr>
                                                            <th scope="row">Số điện thoại 2</th>
                                                            <td>{item.data.contact2.old}</td>
                                                            <td>{item.data.contact2.new}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    item.choice && (
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td> {item.choice == infoChoiceOptions.KEEP_OLD && (
                                                                <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} />
                                                            )
                                                            }</td>
                                                            <td> {item.choice == infoChoiceOptions.OVERRIDE_NEW && (
                                                                <FontAwesomeIcon style={{ color: 'green' }} icon={faCheck} />
                                                            )
                                                            }</td>
                                                        </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            )
                        })
                    }
                    
                </div>
            </Modal.Body>
            {/* <Modal.Footer>

            </Modal.Footer> */}
        </Modal>
        
    );
}

export default (UploadStudentInfoErrorModal);