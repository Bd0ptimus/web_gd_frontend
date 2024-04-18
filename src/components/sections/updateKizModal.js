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
import {
        faQrcode,
    } from "@fortawesome/free-solid-svg-icons";
import useAxiosRequest from '@/helpers/axiosRequest';
import ToastCpn from '@/components/layouts/toastCpn';
import { useRef } from 'react';

function CreateAccountModal(props) {
    const axiosRequest = useAxiosRequest();
    const [stickerValue, setStickerValue] = useState('');
    const [kizValue, setKizValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        setStickerValue(props.data.sticker)
        setKizValue(props.data.kiz)
    }, [props.data])

    useEffect(() => {
        try {
            if (props.show && inputRef && inputRef.current) {
                const interval = setInterval(async () => {
                    if (document.activeElement.tagName != 'INPUT' && inputRef.current) {
                        setTimeout(() => {
                            if (inputRef && inputRef != null && inputRef != undefined && inputRef.current != null && inputRef.current != undefined) { 
                                inputRef.current.focus();
                            }
                        }, 1500);
                    }
                }, 1000);
            }
        } catch (e) {

        }

    }, [props.show]);

    function updateKizHandler () {
        props.onResultGet({text: kizValue})
        props.onHide();
    }

    function openScanBoxHandler () {
        props.openScanBox(props.data.id)
    }

    function onEnterEventHandler (e) {
        if (e.key === 'Enter') {
            updateKizHandler();
        }
    }

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
                    Nhập Kiz cho sticker : {stickerValue}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Input 
                        size="md" 
                        type="text" 
                        ref={inputRef}
                        label="Mã kiz"  
                        value={kizValue} 
                        onChange={(e) => setKizValue(e.target.value)} 
                        onKeyDown={(e) => onEnterEventHandler(e)}
                        />
                    </Form.Group>
                </Form>
                <div className="relative flex items-center gap-2">
                    <Button variant="bordered" startContent={<FontAwesomeIcon icon={faQrcode} />} onClick={() => openScanBoxHandler()}> Quét mã KIZ</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => updateKizHandler()}>Xác nhận</Button>
            </Modal.Footer>
            <ToastCpn/>

        </Modal>
    );
}

export default (CreateAccountModal);