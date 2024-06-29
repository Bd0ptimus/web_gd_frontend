import InstructionSearching from "@/components/sections/instructionSearching";
import {Input, Button} from "@nextui-org/react";
import { BsCalendar2Week, BsChevronDown   } from 'react-icons/bs';
import React, { useEffect, useState, useRef } from 'react';


import styles from './search.module.scss';
import SelectionV1 from "@/components/elements/selectionV1";
import SelectionV2 from "@/components/elements/selectionV2";
import SearchResult from "@/components/sections/searchResult";
import {ssrAxiosGet} from "@/helpers/ssrAxiosRequest";
import useAxiosRequest from "@/helpers/axiosRequest";
import ToastCpn from "@/components/layouts/toastCpn";
import {formatTimeStampToCommonDate} from '@/helpers/commonFunction';
import * as Constants from '@/config/constants/Constants'
function SearchPage({yearOptions, items}) {
    const [yearStudy, setYearStudy] = useState(0);
    const [exam, setExam] = useState('');
    const [candidateNumber, setCandidateNumber] = useState('');
    const [openModalResult, setOpenModalResult] = useState(false);
    const [typeSearch, setTypeSearch] = useState(Constants.SEARCH_TYPE.EXAM_RESULT);
    const [searchMainLabel, setSearchMainLabel] = useState('Số báo danh');

    //student info
    const [studentName, setStudentName] = useState('');
    const [studentBirthday, setStudentBirthday] = useState('');
    const [studentRoom, setStudentRoom] = useState('');
    const [studentMath, setStudentMath] = useState('');
    const [studentLiterature, setStudentLiterature] = useState('');
    const [studentEnglish, setStudentEnglish] = useState('');
    const [studentLocation, setStudentLocation] = useState('');
    const [studentLinkExam, setStudentLinkExam] = useState('');
    const [studentId, setStudentId] = useState('');
    const [examTime, setExamTime] = useState('');
    const [examSubject, setSubject] = useState('');

    useEffect(() => {
        if (typeSearch == '' || typeSearch == Constants.SEARCH_TYPE.EXAM_RESULT) {
            setSearchMainLabel('Số điện thoại liên hệ hoặc SBD')
        } else {
            setSearchMainLabel('Số điện thoại liên hệ')
        }
    }, [typeSearch])

    const axiosRequest = useAxiosRequest();
    const searchHandler = async () => {
        if (yearStudy == 0 || exam == '' || candidateNumber == '') {
            onModalWarning('Vui nhập đầy đủ thông tin')
            return
        }
        const url = `/api/student-information/get-student?year=${yearStudy}&exam=${exam}&candidateNumber=${candidateNumber}&type=${typeSearch}`
        const response = await axiosRequest.axiosGet(url)
        const objStudentInfo = response.data ?? null
        if (!objStudentInfo)
        {
            onModalWarning('Không tìm thấy thông tin học sinh')
            return
        }
        onModalSuccess('Tìm thấy thông tin học sinh')

        let missing = 'Không có thông tin'
        let notYet = 'Chưa có dữ liệu'
        setStudentName(objStudentInfo.full_name ?? missing)
        setStudentBirthday(objStudentInfo.birth_date ? formatTimeStampToCommonDate(objStudentInfo.birth_date) : missing)
        setStudentRoom(objStudentInfo.room ?? notYet)
        setStudentMath(objStudentInfo.math ?? notYet)
        setStudentLiterature(objStudentInfo.literature ?? notYet)
        setStudentEnglish(objStudentInfo.english ?? notYet)
        setStudentLocation(objStudentInfo.location ?? notYet)
        setStudentLinkExam(objStudentInfo.link_exam ?? missing)
        setStudentId(objStudentInfo.student_id ?? notYet)
        setExamTime(objStudentInfo.time ?? notYet)
        setSubject(objStudentInfo.subject ?? missing)
        setOpenModalResult(true);
    }
    const searchResultModalOnHide = () => {
        setOpenModalResult(false);
    }

    const onModalWarning = (message) => {
        ToastCpn.toastWarning(message);
    }

    const onModalSuccess = (message) => {
        ToastCpn.toastSuccess(message);
    }
    return (
        <div style={{marginTop:120}}>
            <div className = {`d-flex justify-content-center`}>
                <div className = {`d-block justify-content-center mx-3 mx-md-0`}>
                    <div className = {`row d-flex justify-content-center`}>
                        <h1 className={`text-center`} style={{fontSize:40, fontWeight:700}}>Tra cứu số báo danh, kết quả học tập</h1>
                    </div>
                    <div className = {`row d-flex justify-content-center mx-1 mx-md-0`}>
                        <InstructionSearching/>
                    </div>
                    <div className = {`d-block justify-content-center`}>
                        {/* <div className={`my-3 d-flex justify-content-center`}>
                            <SelectionV2
                                label="Loại tra cứu"
                                placeholder="Chọn loại tra cứu"
                                options={Constants.SEARCH_TYPE_ARR}
                                endContent={<BsChevronDown/>}
                                response = {(e) => setTypeSearch(e)}/>
                        </div> */}
                        <div className={`my-3 d-flex justify-content-center`}>
                            <SelectionV1
                                label="Năm thi"
                                placeholder="Chọn năm thi"
                                options={yearOptions}
                                endContent={<BsCalendar2Week/>}
                                response = {(e)=>setYearStudy(e)}/>
                        </div>
                        <div className={`my-3 d-flex justify-content-center`}>
                            <SelectionV2
                                label="Kì thi"
                                placeholder="Chọn kì thi"
                                options={items}
                                endContent={<BsChevronDown/>}
                                response = {(e)=>setExam(e)}/>
                        </div>
                        <div className={`my-3 d-flex justify-content-center`}>
                            <Input
                                type="text"
                                label={searchMainLabel}
                                labelPlacement='outside'
                                variant="bordered"
                                placeholder="Nhập ..."
                                onChange= {(e)=>setCandidateNumber(e.target.value)}
                            />
                        </div>

                        <div className={`my-5 d-flex justify-content-center`}>
                            <Button className={`${styles.searchBtn}`} onClick={()=>searchHandler()}>
                                Tra cứu
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
            <SearchResult
                show={openModalResult}
                onHide={()=>searchResultModalOnHide()}
                name={studentName}
                birthday={studentBirthday}
                room={studentRoom}
                location={studentLocation}
                math={studentMath}
                literature={studentLiterature}
                english={studentEnglish}
                linkExam={studentLinkExam}
                studentId={studentId}
                time={examTime}
                subject={examSubject}
            />
            <ToastCpn />
        </div>
    );

}

export async function getServerSideProps(context) {
    const yearOptionsRawData = await ssrAxiosGet(context, '/api/school-year/list')
    const itemsRawData = await ssrAxiosGet(context, '/api/examination/list')
    let yearOptions
    let items

    if (yearOptionsRawData && yearOptionsRawData.data.data) {
        yearOptions = yearOptionsRawData.data.data.map(item => {
            return {
                value: item.year,
                content: item.year
            };
        });
    }

    if (itemsRawData && itemsRawData.data.data) {
        items = itemsRawData.data.data.map(item => {
            return {
                value: item.id,
                content: item.exam
            };
        });
    }

    if (!yearOptions || yearOptions.length === 0 || !items || items.length === 0) {
        return {
            notFound: true,
        };
    }

    const data = {
        yearOptions,
        items
    }
    console.log('---> data : ', data)
    return {props: {yearOptions, items}}
}

export default SearchPage;
