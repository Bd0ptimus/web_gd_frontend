import React, { Component, useEffect, useState, useRef } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { Scanner } from '@yudiel/react-qr-scanner';
import Box from "@mui/material/Box";

function ScanCodeBoxModal(props) {
    const [startScan, setStartScan] = useState(false);
    useEffect(() => {
        setStartScan(props.startScanBox)
    }, [props.startScanBox])

    useEffect(() => {
        console.log('startScan scan : ', startScan)
    }, [startScan])
    const scanResultHandler = (text, result) => {
        text =  text.replace(//g, ' ').trim().slice(0, 31)
        props.onResultGet({
            text,
            object: result
        })
        setStartScan(false)
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
                    Quét mã KIZ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box 
                    sx={{ margin: "auto", textAlign: "center", width: 400 }}
                    >
                        <Scanner
                            onResult={(text, result) =>scanResultHandler(text, result)}
                            onError={(error) => console.log(error?.message)}
                            enabled={startScan}
                            />
                </Box>
            </Modal.Body>
        </Modal>
    );
}

export default (ScanCodeBoxModal);