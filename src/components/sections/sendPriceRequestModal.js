import { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';

import requestsApi from "@/api/request";

function SendPriceRequestModal(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [des, setDes] = useState('');
    const [listFileSelected, setListFileSelected] = useState(null);
    useEffect(() => {
        setName('');
        setEmail('');
        setDes('');
        setListFileSelected(null);
    }, [])


    function handleFileChange(e) {
        let filesAccept = true;
        for (const key of Object.keys(e.target.files)) {
            console.log(e.target.files);
            if (e.target.files[key].name.split('.').pop() != 'xlsx') {
                filesAccept = false;
            }
        }

        if (filesAccept) {
            setListFileSelected(e.target.files);
        } else {
            props.errorAlert('Chỉ chấp nhận các file excel');
        }

    }

    function handleUploadFile() {
        const data = new FormData();
        if (listFileSelected) {
            for (const key of Object.keys(listFileSelected)) {
                data.append('fileSelected', listFileSelected[key])
            }
        } else {
            data.append('fileSelected', []);

        }

        data.append(`name`, name);
        data.append(`email`, email);
        data.append(`des`, des);

        requestsApi.createRequests(data).then((response) => {
            setName('');
            setEmail('');
            setDes('');
            setListFileSelected(null);
            if (response.data.errCode == 0) {
                props.successAlert('Đã gửi yêu cầu. Xin vui lòng đợi quản lý của chúng tôi liên hệ lại với bạn');
                props.onHide();
            } else {
                props.errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
            }
        }).catch((e) => {
            props.errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
            console.log(e)

        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Gửi yêu cầu báo giá
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên người muốn nhận báo giá</Form.Label>
                        <Form.Control type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control type="text" placeholder="Mô tả về yêu cầu" as="textarea" rows={3} value={des} onChange={(e) => setDes(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <label className="mx-3">Chọn file excel yêu cầu sản phẩm: </label>
                        <input type="file" multiple="multiple" onChange={(e) => { handleFileChange(e) }} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { handleUploadFile() }}>Xác nhận</Button>

            </Modal.Footer>
        </Modal>
    );
}

export default SendPriceRequestModal;