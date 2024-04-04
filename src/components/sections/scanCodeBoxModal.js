import React, { Component, useEffect, useState, useRef } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { Scanner } from '@yudiel/react-qr-scanner';
import Box from "@mui/material/Box";

function ScanCodeBoxModal(props) {

    const scanResultHandler = (text, result) => {
        if (props.startScanBox) {
            props.onResultGet({
                text,
                object: result
            })
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
                    Quét mã KIZ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.startScanBox && (
                    <Box 
                    // sx={{ margin: "auto", textAlign: "center", width: 600 }}
                    >
                        <Scanner
                            onResult={(text, result) =>scanResultHandler(text, result)}
                            onError={(error) => console.log(error?.message)}
                            enabled={props.startScanBox}
                            stopDecoding={props.startScanBox}
                            />
                    </Box>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default (ScanCodeBoxModal);