import React, { Component, useEffect, useState, useRef } from 'react';
import { Modal} from 'react-bootstrap';
import {
    Button,
} from "@nextui-org/react";
import { BsCalendar2Week, BsChevronDown   } from 'react-icons/bs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import moment from 'moment';

import SelectionV1 from "@/components/elements/selectionV1";
import SelectionV2 from "@/components/elements/selectionV2";
import useAxiosRequest from '@/helpers/axiosRequest';
import * as Constants from '@/config/constants/Constants';

function UploadStudentInfoModal(props) {
    const axiosRequest = useAxiosRequest();
    const fileInputRef = useRef(null);
    const [yearStudy, setYearStudy] = useState(null);
    const [exam, setExam] = useState(null);
    const [years, setYears] = useState([]);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const years = props.years.filter(item => item.value != 'all')
        setYears(years)
    }, [props.years])
    useEffect(() => {
        const exams = props.exams.filter(item => item.value != 'all')
        setExams(exams)
    }, [props.exams])

    const convertExcelStampToDate = (number) => {
        const excelBaseDate = new Date(1899, 11, 30); // Ngày gốc trong Excel: 30-12-1899
        const formattedDate = moment(excelBaseDate).add(number, 'days').format('YYYY-MM-DD');
        return formattedDate;
    }
    
    const handleUploadBtnClick = () => {
        if(!yearStudy){
            props.onModalWarning(`Vui lòng chọn năm thi trước khi upload file`);
            return
        }
        if(!exam){
            props.onModalWarning(`Vui lòng chọn năm thi trước khi upload file`);
            return
        }
        fileInputRef.current.click();
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        readExcel(file);
        e.target = null;
    };

    const readExcel = async (file) => {
        try {
            const promise = new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                if (!file instanceof Blob) {
                    reject('file reader is not blob');
                }
                fileReader.readAsArrayBuffer(file);
                fileReader.onload = (e) => {
                    const bufferArray = e.target.result;
                    const wb = XLSX.read(bufferArray, {
                        type: "buffer"
                    });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data = XLSX.utils.sheet_to_json(ws);
                    resolve(data);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
            await promise.then(async (d) => {
                let infoImporting = []
                for (const item of d) {
                    const product = {};
                    const keys = Object.keys(item);
                    let hasFullname = false;
                    let hasStudentId = false;
                    for (const key of keys) {
                        const mappedValue = props.importDataMapped[key];
                        let value =  item[key];

                        if (mappedValue == 'birth_date') {
                            value = convertExcelStampToDate(item[key])
                        }

                        if (mappedValue == 'full_name') {
                            hasFullname = true;
                        }

                        if (mappedValue == 'student_id') {
                            hasStudentId = true;
                        }
                        product[mappedValue] = value;
                    }

                    if (!hasFullname) {
                        props.onModalWarning(`Cột '` + 'Họ tên' + `' bắt buộc phải tồn tại, vui lòng kiểm tra lại`);
                        return; 
                    }

                    if (!hasStudentId) {
                        props.onModalWarning(`Cột '` + 'Số báo danh' + `' bắt buộc phải tồn tại, vui lòng kiểm tra lại`);
                        return; 
                    }

                    infoImporting.push(product);
                }

                if (infoImporting.length == 0) {
                    props.onModalWarning(`File trống, vui lòng kiểm tra lại`);
                    return; 
                }
                const createData = await axiosRequest.axiosPost('/api/student-information/store', {
                    year: yearStudy,
                    exam,
                    info: infoImporting
                })
                if (createData.status == Constants.RESPONSE_STATUS.SUCCESS) {
                    if (createData.data && !createData.data.infos) {
                        props.onModalSuccess(`Tải thông tin lên thành công`);
                    } else {
                        props.onErrorGet(createData.data)
                    }
                } else {
                    props.onModalWarning('Đã xảy ra lỗi, vui lòng thử lại')
                }
                
            });
            props.onHide()
        } catch (e) {
            
            props.onModalWarning(`File không được chấp nhận`)
        }
    };

    return (
        <Modal
            show = {props.show}
            onHide = {props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tải dữ liệu lên hệ thống
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`m-3 p-0 d-block d-md-flex justify-content-start`}>
                    <div className={`col-12 col-sm-6 col-md-6 p-2`}>
                        <SelectionV1 label="Năm thi" placeholder="Chọn năm thi" options={years} endContent={<BsCalendar2Week />} response={(e) => setYearStudy(e)} />
                    </div>
                    <div className={`col-12 col-sm-6 col-md-6 p-2`}>
                        <SelectionV2 label="Kì thi" placeholder="Chọn kì thi" options={exams} endContent={<BsChevronDown />} response={(e) => setExam(e)} />
                    </div>
                </div>
                <div className={`m-3 p-0 d-block d-md-flex justify-content-start`}>
                    <div className={`col-12 col-sm-6 col-md-6 p-2`}>
                        <Button
                            variant="bordered"
                            startContent={<FontAwesomeIcon icon={faUpload} />}
                            onClick={handleUploadBtnClick}
                        >
                            Chọn file (chỉ hỗ trợ file Excel)
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        
    );
}

export default (UploadStudentInfoModal);