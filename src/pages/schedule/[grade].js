import styles from './schedule.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import CustomButton from '@/components/elements/customButton';
import { ssrAxiosGet } from '@/helpers/ssrAxiosRequest';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import useAxiosRequest from "@/helpers/axiosRequest";
import Tabs from '@/components/elements/tabs';
import OthersGrade from '@/components/sections/othersGrade';
import RegisterStudent1 from '@/components/sections/registerStudent1';
function Grade({ data }) {
    const [tabSelected, setTabSelected] = useState('');
    const [classList, setClassList] = useState([]);
    const [grade, setGrade] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const axiosRequest = useAxiosRequest();
    const [schedules, setSchedules] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setGrade(data.grade);
        switch(data.grade) {
            case (grades.TIEU_HOC):
                setDefaultClassCode('3')
                // setTabSelected('3')
                setPageTitle('Khối tiểu học')
                setClassList([
                    {
                        value: '3',
                        content: 'Lớp 3'
                    },
                    {
                        value: '4',
                        content: 'Lớp 4'
                    },
                    {
                        value: '5',
                        content: 'Lớp 5'
                    }
                ])
                break;
            case (grades.THCS):
                setDefaultClassCode('6')
                setPageTitle('Khối trung học cơ sở')
                setClassList([
                    {
                        value: '6',
                        content: 'Lớp 6'
                    },
                    {
                        value: '7',
                        content: 'Lớp 7'
                    },
                    {
                        value: '8',
                        content: 'Lớp 8'
                    },
                    {
                        value: '9',
                        content: 'Lớp 9'
                    }
                ])
                break;
            case (grades.THPT):
                setDefaultClassCode('10')
                // setTabSelected('10')
                setPageTitle('Khối trung học phổ thông')
                setClassList([
                    {
                        value: '10',
                        content: 'Lớp 10'
                    },
                    {
                        value: '11',
                        content: 'Lớp 11'
                    },
                    {
                        value: '12',
                        content: 'Lớp 12'
                    },
                    {
                        value: 'tsa',
                        content: 'Luyện thi TSA'
                    }
                ])
                break;
        }
    }, [data])

    useEffect(() => {
        getGradeDetail ()
    }, [tabSelected])
    const grades = {
        TIEU_HOC: 'tieu_hoc',
        THCS: 'thcs',
        THPT: 'thpt'
    }

    function setDefaultClassCode (defaultValue) {
        if (!data.classCode) {
            setTabSelected(defaultValue)
            return
        }
        setTabSelected(data.classCode)
        return
    }
    function tabSelectedHandler (tabValue) {
        setTabSelected(tabValue)
        console.log('tabs selected : ', tabValue)
    }

    const columns = [
        { name: "Môn học", uid: "subject" },
        { name: "Mã lớp", uid: "class_code" },
        { name: "Khai giảng", uid: "start_date" },
        { name: "Thời gian", uid: "time" },
        { name: "Thứ", uid: "week_day" },
        { name: "Giáo viên", uid: "teacher"},
    ];

    async function getGradeDetail () {
        if (tabSelected == '') return
        const url = `/api/public/get-grade-detail/${tabSelected}`
        const response = await axiosRequest.axiosGet(url)
        let schedules = response?.data?.schedule ?? '{}';
        schedules = JSON.parse(schedules)
        setSchedules(schedules)
        setDescription(response?.data?.description)
        console.log('schedules : ', schedules)
    }

    return (
        <div className={`${styles.pageContainer}`}>
            <div className={`w-100 d-flex justify-content-center`}>
                <div className={`${styles.contentSectionContainer} ${styles.classDetail} d-block justify-content-center p-4`}>
                    <div className={`d-flex justify-content-center mx-3 mx-md-0`}>
                        <div className={`col-12 col-md-8 d-block justify-content-center mb-4 `}>
                            <h1 className={`${styles.secTitles} text-center`}>{pageTitle}</h1>
                            <div className={`d-flex justify-content-center`}>
                                <Image
                                    className={`col-12 col-xl-4`}
                                    src="/assets/components/underlineOrange.png"
                                    width={150}
                                    height={30}
                                    alt="underline" />
                            </div>
                            {/* underline */}
                        </div>
                    </div>

                    <div className={`${styles.classContainer} d-md-flex d-block justify-content-start`}>
                        <div className={`col-12 col-md-9`}>
                            <Tabs options={classList} response={(e) => tabSelectedHandler(e)} valueSelect={tabSelected}/>

                            <div className={`d-block my-4`}>
                                <div className={`${styles.postParagraphSecTitle}`}>
                                    Các môn học đang được giảng dạy tại trung tâm
                                </div>
                                {
                                    grade == grades.TIEU_HOC && (
                                        <div className={`d-flex justify-content-start`}>
                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/toan.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Toán
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/van.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Tiếng Việt
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/tieng_anh.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Tiếng Anh
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    grade == grades.THCS && (
                                        <div className={`d-flex justify-content-start`}>
                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/toan.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Toán
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/van.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Ngữ Văn
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/tieng_anh.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Tiếng Anh
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    grade == grades.THPT && (
                                        <div className={`col-12 d-flex justify-content-start ${styles.classContainer}`}>
                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/toan.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Toán
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/van.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Ngữ Văn
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/tieng_anh.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Tiếng Anh
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/ly.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Vật Lý
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`col-4 col-xl-2 p-1`}>
                                                <div className={`d-block ${styles.classSelectSec} m-1`}>
                                                    <div className={`d-flex justify-content-center`}>
                                                        <Image
                                                            className={`col-12 ${styles.classImage}`}
                                                            src="/assets/classes/hoa.png"
                                                            width={80}
                                                            height={80}
                                                            alt="class" />
                                                    </div>
                                                    <div className={`${styles.postParagraphSecTitle} text-center`}>
                                                        Hóa Học
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }
                                
                            </div>
                            <div className={`d-block my-4`}>
                                <div className={`${styles.postParagraphSecTitle}`}>
                                    Chương trình đào tạo lớp {tabSelected.toUpperCase()}
                                </div>
                                <div className={`${styles.postParagraphSecContent}`} dangerouslySetInnerHTML={{ __html: description }}>
                                </div>
                            </div>
                            <div className={`d-block my-4 ${styles.tableContainer}`}>
                                <table className={`${styles.tableSec}`}>
                                    <tr>
                                        {
                                            columns.map((column) => {
                                                return (<th>{column.name}</th>)
                                            })
                                        }
                                    </tr>
                                    {
                                        schedules.length > 0 ?
                                            schedules.map((grade, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.subject ?? ''}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.class_code ?? ''}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.start_date ?? ''}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.time ?? ''}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.week_day ?? ''}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.teacher ?? ''}</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : 'Chưa có dữ liệu'
                                    }
                                </table>
                            </div>
                            {/* <div className={`d-block my-4`}>
                                <Table aria-label="Result Table"
                                    color="default"
                                    selectionMode="single"
                                    bottomContentPlacement="outside"
                                    topContentPlacement="outside"
                                    classNames={{
                                        wrapper: "max-h-[382px]",
                                    }}
                                >
                                    <TableHeader columns={columns}>
                                        {(column) => (
                                            <TableColumn
                                                key={column.uid}
                                                align={column.uid === "actions" ? "center" : "start"}
                                            >
                                                {column.name}
                                            </TableColumn>
                                        )}
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            schedules.length > 0 ? 
                                            schedules.map((grade, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.subject ?? ''}</p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.class_code ?? ''}</p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.start_date ?? ''}</p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.time ?? ''}</p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.week_day ?? ''}</p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <p className="text-bold text-sm capitalize">{grade.teacher ?? ''}</p>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }) : 'Chưa có dữ liệu'
                                        }
                                    </TableBody>

                                </Table>
                            </div> */}

                            <div className={`d-block my-4`}>
                                <RegisterStudent1/>
                            </div>

                        </div>
                        <div className={`col-12 col-md-3`}>
                            <OthersGrade isLoaded={true} classCode={tabSelected}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    const grade = context.query.grade;
    console.log('context.params : ' , context.query)
    const classCode = context.query?.class ?? null
    // const newsData = await ssrAxiosGet(context, `/api/public/get-litsing-news`);
    // const data = newsData.data
    const data = {
        grade,
        classCode
    }
    return { props: { data } }
}

export default Grade;