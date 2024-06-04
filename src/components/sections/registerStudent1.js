
import React, { useState, useRef } from 'react'
import styles from './registerStudent.module.scss';
import {Input, Button} from "@nextui-org/react";

function RegisterStudent1 () {
    const [studentName, setStudentName] = useState('');
    const [studentGrade, setStudentGrade] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [parentName, setParentName] = useState('');
    const [parentPhone, setParentPhone] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    function registerHandler() {

    }
    return (
        <div className={`d-block justify-content-start ${styles.mainSec}`}>
            <div className={`d-block justify-content-center my-3`}>
                <div className={`d-flex justify-content-start`}>
                    <p  className = {`${styles.segTitle}`}>Thông tin học sinh</p>
                </div>
                <div className={`d-xl-flex d-block justify-content-start`}>
                    <div className={`col-xl-4 col-12 p-1 d-flex justify-content-center`}>
                        <Input
                            type="text"
                            label='Họ và tên học sinh'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder="Nhập họ và tên học sinh"
                            onChange={(e) => setStudentName(e.target.value)}
                        />
                    </div>

                    <div className={`col-xl-4 col-12 p-1 d-flex justify-content-center`}>
                        <Input
                            type="text"
                            label='Lớp'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder="Nhập lớp của học sinh"
                            onChange={(e) => setStudentGrade(e.target.value)}
                        />
                    </div>

                    <div className={`col-xl-4 col-12 p-1 d-flex justify-content-center`}>
                        <Input
                            type="text"
                            label='Trường học'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder="Nhập trường của học sinh"
                            onChange={(e) => setStudentSchool(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={`d-block justify-content-center my-3`}>
                <div className={`d-flex justify-content-start`}>
                    <p  className = {`${styles.segTitle}`}>Thông tin phụ huynh</p>
                </div>
                <div className={`d-xl-flex d-block justify-content-start`}>
                <div className={`col-xl-4 col-12 p-1 d-flex justify-content-center`}>
                        <Input
                            type="text"
                            label='Họ và tên phụ huynh'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder="Nhập họ và tên phụ huynh"
                            onChange={(e) => setParentName(e.target.value)}
                        />
                    </div>

                    <div className={`col-xl-4 col-12 p-1 d-flex justify-content-center`}>
                        <Input
                            type="text"
                            label='Số điện thoại'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder="Nhập lớp số điện thoại phụ huynh"
                            onChange={(e) => setParentPhone(e.target.value)}
                        />
                    </div>

                    <div className={`col-xl-4 col-12 p-1 d-flex justify-content-center`}>
                        <Input
                            type="text"
                            label='Email'
                            labelPlacement='outside'
                            variant="bordered"
                            placeholder="Nhập email phụ huynh"
                            onChange={(e) => setParentEmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className={`d-block justify-content-center`}>
                <div className={`d-flex justify-content-start`}>
                    <Button className={`${styles.registerBtn}`} onClick={() => registerHandler()}>
                        Đăng ký học
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default RegisterStudent1;
