

import { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import moment from 'moment';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
// import { FormattedMessage, injectIntl } from 'react-intl';
// import 'react-toastify/dist/ReactToastify.css';

import requestsApi from "@/api/request";
import RequestStatusTag from "../elements/admin/request/requestStatusTag";
import CheckRequestDataModal from './checkRequestDataModal';
function SearchRequestOrderModal(props) {
    const [requestCode, setRequestCode] = useState('');
    const [requestShow, setRequestShow] = useState(false);
    const [requestData, setRequestData] = useState({});
    useEffect(() => {
        setRequestCode('');
    }, [props]);

    const startSearching = () => {
        if (requestCode === '') {
            props.errorAlert('Hãy điền mã số hoặc đơn hàng đầy đủ');
        } else {
            requestsApi.getRequestData(requestCode).then((response) => {
                console.log('response : ', response);
                if (response.data.errCode == 0) {
                    props.successAlert('Đã tìm thấy yêu cầu của bạn');
                    setRequestData(response.data.data.request);
                    setRequestShow(true);
                } else {
                    props.errorAlert('Không tìm thấy yêu cầu của bạn!');
                }
            }).catch((e) => {
                props.errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
                console.log(e)

            });
        }
    }
    return (<Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Tra cứu thông tin yêu cầu báo giá, đơn hàng
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Mã số yêu cầu hoặc đơn hàng</Form.Label> */}
                <Form.Control type="text" placeholder="Mã số yêu cầu hoặc đơn hàng" value={requestCode} onChange={(e) => setRequestCode(e.target.value)} />
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => { startSearching() }}>Tìm kiếm</Button>

        </Modal.Footer>

        <CheckRequestDataModal
            requestData={requestData}
            show={requestShow}
            onHide={() => setRequestShow(false)}
            errorAlert={(e) => props.errorAlert(e)}
            successAlert={(e) => props.successAlert(e)}
        />

    </Modal>);
}

export default SearchRequestOrderModal;