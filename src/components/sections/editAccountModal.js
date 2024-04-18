import React, { Component, useEffect, useState } from 'react';
import { Modal, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Card, 
    CardHeader, 
    Tooltip, 
    Button,
    Divider,
    CardBody,
    Input,
    Select,
    SelectItem } from "@nextui-org/react";
import useAxiosRequest from '@/helpers/axiosRequest';
import ToastCpn from '@/components/layouts/toastCpn';
import { format } from 'date-fns';

function EditAccountModal(props) {
    const axiosRequest = useAxiosRequest();
    const [accountId, setAccountId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [status, setStatus] = useState('');
    useEffect(() => {
        setName(props.data.name)
        setEmail(props.data.email)
        setPassword(props.data.password)
        setExpireDate( props.data.expireDate ? format(props.data.expireDate, 'yyyy-MM-dd') : '')
        setStatus(props.data.status)
        setAccountId(props.data.id)
    }, [props.data])

    async function updateAccountHandler () {
        const postRes = await axiosRequest.axiosPut(`/api/account/update-account/${accountId}`,{
            account: {
                name,
                email,
                password,
                expireDate,
                status
            }
        } )

        if (postRes.errCode != 0) {
            ToastCpn.toastWarning(postRes.message);
        } else {
            ToastCpn.toastSuccess('Edit tài khoản thành công');
            props.onHide()
        }
    }

    const statusList = [
        {label: 'active', value: 'active'},
        {label: 'blocked', value: 'blocked'}
    ]
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
                    Edit tài khoản
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Input size="md" type="text" label="Tên người dùng"  value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Input size="md" type="text" label="Email / Số điện thoại / Tên đăng nhập"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Input size="md" type="text" label="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Input size="md" type="date" label="Ngày hết hạn" value={expireDate} onChange={(e) => setExpireDate(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <DropdownButton id="dropdown-basic-button" title={`Trạng thái: ${!status && status == '' ? "Chưa chọn trạng thái" : status}`} onSelect={(e) => { setStatus(e) }}>
                            {
                                statusList.map((item, index) => {
                                    let selectedAttr = {};
                                    return (
                                        <Dropdown.Item {...selectedAttr} eventKey={item.value} key={index}>{item.label}</Dropdown.Item>
                                    );
                                })
                            }
                        </DropdownButton>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => updateAccountHandler()}>Xác nhận chỉnh sửa</Button>
            </Modal.Footer>
            <ToastCpn/>

        </Modal>
    );
}

export default (EditAccountModal);