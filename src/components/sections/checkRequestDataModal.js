
import { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import moment from 'moment';
import Link from 'next/link';

import requestsApi from "@/api/request";
import RequestStatusTag from "../elements/admin/request/requestStatusTag";
function CheckRequestDataModal(props) {
    const [requestData, setRequestData] = useState({});
    useEffect(() => {
        setRequestData(props.requestData);
        console.log('check : ', props);

    }, [props]);
    return (<Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Thông tin về yêu cầu báo giá, mã số {requestData.requestCode}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={`row d-flex justify-content-start`}>
                <p className={`col-4`} style={{ fontWeight: 'bold' }}> Mã số yêu cầu </p>
                <p className={`col-8`}> {requestData.requestCode} </p>
            </div>
            <div className={`row d-flex justify-content-start`}>
                <p className={`col-4`} style={{ fontWeight: 'bold' }}>Tên người gửi yêu cầu</p>
                <p className={`col-8`}> {requestData.name} </p>
            </div>
            <div className={`row d-flex justify-content-start`}>
                <p className={`col-4`} style={{ fontWeight: 'bold' }}> Email người gửi yêu cầu </p>
                <p className={`col-8`}> {requestData.email} </p>
            </div>
            <div className={`row d-flex justify-content-start`}>
                <p className={`col-4`} style={{ fontWeight: 'bold' }}> Mô tả</p>
                <p className={`col-8`}> {requestData.des} </p>
            </div>
            <div className={`row d-flex justify-content-start`}>
                <p className={`col-4`} style={{ fontWeight: 'bold' }}>Thời gian gửi yêu cầu </p>
                <p className={`col-8`}> {moment(requestData.createdAt).format('HH:mm DD-MM-YYYY')} </p>
            </div>
            <div className={`row d-flex justify-content-start`}>
                <p className={`col-4`} style={{ fontWeight: 'bold' }}>Trạng thái </p>
                <div className={`col-8`}> <RequestStatusTag statusId={requestData.status} /> </div>
            </div>
            <div className={`row d-flex justify-content-start`}>
                <p className={`col-4`} style={{ fontWeight: 'bold' }}>Các file đính kèm</p>
                <div className={`col-8 d-block justify-content-center`}>
                    {
                        requestData.request_files ? requestData.request_files.map((file, index) => {
                            return (
                                <div className={`d-block justify-content-end`}>

                                    <Link href={process.env.NEXT_PUBLIC_APP_BACKEND_URL + file.filePath}>
                                        {file.filePath.split('/')[2]}
                                    </Link>
                                </div>
                            );
                        }) : ''
                    }
                </div>
            </div>
        </Modal.Body>
        {/* <Modal.Footer>

        </Modal.Footer> */}
    </Modal>);
}

export default CheckRequestDataModal;