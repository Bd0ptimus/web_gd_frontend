import React, { Component, useEffect, useState, useRef } from 'react';
import { Modal} from 'react-bootstrap';
import {
    DatePicker,
    Button,
    Input,
} from "@nextui-org/react";
// import {DatePicker} from "@nextui-org/date-picker";
import { BsCalendar2Week, BsChevronDown   } from 'react-icons/bs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import moment from 'moment';
import {parseDate, CalendarDate} from "@internationalized/date";

import SelectionV1 from "@/components/elements/selectionV1";
import SelectionV2 from "@/components/elements/selectionV2";
import useAxiosRequest from '@/helpers/axiosRequest';
import * as Constants from '@/config/constants/Constants';
import {convertToCalendarDate} from '@/helpers/commonFunction';
function UpdateStudentInfoModal(props) {
    const [mathScore, setMathScore] = useState(0);
    const [literatureScore, setLiteratureScore] = useState(0);
    const [englishScore, setEnglishScore] = useState(0);
    const [room, setRoom] = useState('');
    const [year, setYear] = useState(null);
    const [exam, setExam] = useState(null);
    const [fullname, setFullname] = useState('');
    const [studentId, setStudentId] = useState('');
    const [linkExam, setLinkExam] = useState('');
    const [birthDate, setBirthDate] = useState();
    const [infoId, setInfoId] = useState(0);
    const [years, setYears] = useState([]);
    const [exams, setExams] = useState([]);
    useEffect(() => {
        const data = props.data
        let yearSet = null
        if (data.examination_school_year && data.examination_school_year.school_years && data.examination_school_year.school_years.year) {
            yearSet = data.examination_school_year.school_years.year
        }
        let examSet = null
        if (data.examination_school_year && data.examination_school_year.examinations && data.examination_school_year.examinations.id) {
            examSet = data.examination_school_year.examinations.id
        }
        setMathScore(data.math ?? 0)
        setLiteratureScore(data.literature ?? 0)
        setEnglishScore(data.english ?? 0)
        setRoom(data.room ?? '')
        setYear(yearSet)
        setExam(examSet)
        setFullname(data.full_name ?? '')
        setStudentId(data.student_id ?? '')
        setInfoId(data.id ?? 0)
        setLinkExam(data.link_exam ?? '')
        const calendarDate = data?.birth_date?.split(' ')[0]
        setBirthDate(data.birth_date ? parseDate(calendarDate) : '')
    }, [props.data])
    useEffect(() => {
        const years = props.years.filter(item => item.value != 'all')
        setYears(years)
    }, [props.years])
    useEffect(() => {
        const exams = props.exams.filter(item => item.value != 'all')
        setExams(exams)
    }, [props.exams])

    const updateInfoHandler = async () => {
        let jsonData = {
            full_name: fullname,
            math: mathScore,
            literature: literatureScore,
            english: englishScore,
            room,
            exam,
            year,
            student_id: studentId,
            link_exam: linkExam,
            id: infoId,
        }
        if (birthDate.year && birthDate.month && birthDate.day) {
            jsonData = {
                ...jsonData,
                birth_date: `${birthDate.year ?? ''}-${birthDate.month ?? ''}-${birthDate.day ?? ''}`
            }
        }
        const response = await axiosRequest.axiosPost('/api/student-information/update', jsonData);
        if (response.status == Constants.RESPONSE_STATUS.SUCCESS) {
            props.onModalSuccess('Update dữ liệu thành công')
            props.onSuccessGet()
            props.onHide()
        } else {
            props.onModalWarning('Đã xảy ra lỗi, vui lòng thử lại')
        }
    }
    const axiosRequest = useAxiosRequest();

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
                    Sửa thông tin
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`m-3 p-0 d-block justify-content-center`}>
                    <div className={`col-12 p-2`}>
                        <SelectionV1 label="Năm thi" placeholder="Chọn năm thi" options={years} endContent={<BsCalendar2Week />} response={(e) => setYear(e)} valueSelect={props.data?.examination_school_year?.school_years?.year}/>
                    </div>
                    <div className={`col-12 p-2`}>
                        <SelectionV2 label="Kì thi" placeholder="Chọn kì thi" options={exams} endContent={<BsChevronDown />} response={(e) => setExam(e)} valueSelect={props.data?.examination_school_year?.examinations?.id}/>
                    </div>
                    <div className={`col-12 p-2`}>
                        <Input
                            type="text"
                            label='Số báo danh'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder='Nhập số báo danh'
                            onChange = {(e) => setStudentId(e.target.value)}
                            value={studentId}
                        />                    
                    </div>
                    <div className={`col-12 p-2`}>
                        <Input
                            type="text"
                            label='Họ và tên'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder='Nhập họ và tên'
                            onChange = {(e) => setFullname(e.target.value)}
                            value={fullname}
                        />                      
                    </div>
                    <div className={`col-12 p-2`}>
                        <DatePicker
                        label="Ngày sinh" 
                        className="max-w-[284px]"
                        description="tháng / ngày / năm"
                        labelPlacement="outside"
                        variant="bordered"
                        onChange = {(e) =>{ setBirthDate(e);}}
                        defaultValue={props.data.birth_date ? parseDate( props.data.birth_date.split(' ')[0]) : null}
                        />
                     
                    </div>
                    <div className={`col-12 p-2`}>
                        <Input
                            type="text"
                            label='Phòng thi'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder='Nhập phòng thi'
                            onChange = {(e) => setRoom(e.target.value)}
                            value={room}
                        />                       
                    </div>
                    <div className={`col-12 p-2`}>
                        <Input
                            type="number"
                            label='Điểm Toán'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder='Nhập điểm Toán'
                            onChange = {(e) => setMathScore(e.target.value)}
                            value={mathScore}
                        />                     
                    </div>
                    <div className={`col-12 p-2`}>
                        <Input
                            type="number"
                            label='Điểm Tiếng Việt'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder='Nhập điểm Tiếng Việt'
                            onChange = {(e) => setLiteratureScore(e.target.value)}
                            value={literatureScore}
                        />                                         
                    </div>
                    <div className={`col-12 p-2`}>
                        <Input
                            type="number"
                            label='Điểm Tiếng Anh'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder='Nhập điểm Tiếng Anh'
                            onChange = {(e) => setEnglishScore(e.target.value)}
                            value={englishScore}
                        />                    
                    </div>
                    <div className={`col-12 p-2`}>
                        <Input
                            type="text"
                            label='Link bài thi'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder='Nhập link bài thi'
                            onChange = {(e) => setLinkExam(e.target.value)}
                            value={linkExam}
                        />                    
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={`d-flex justify-content-end`}>
                    <Button variant="bordered" onClick={() => updateInfoHandler()}> Lưu thông tin</Button>
                </div>
            </Modal.Footer>

        </Modal>
        
    );
}

export default (UpdateStudentInfoModal);