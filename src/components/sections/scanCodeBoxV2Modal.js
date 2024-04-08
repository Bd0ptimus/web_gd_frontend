import React, { Component, useEffect, useState, useRef } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import $ from "jquery"
import Box from "@mui/material/Box";

function ScanCodeBoxV2Modal(props) {
    const [startScan, setStartScan] = useState(false);
    useEffect(() => {
        setStartScan(props.startScanBox)
    }, [props.startScanBox])


    const scannerRef = useRef(null);

    useEffect(async () => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.7/html5-qrcode.min.js';
        script.integrity = 'sha512-dH3HFLqbLJ4o/3CFGVkn1lrppE300cfrUiD2vzggDAtJKiCClLKjJEa7wBcx7Czu04Xzgf3jMRvSwjVTYtzxEA==';
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'no-referrer';
        const qrCodeScanner = new Html5Qrcode('scanner');
            let screenWidth = window.innerWidth;
            let scanboxSize = {
                width: 0,
                height: 0,
            }
            if (screenWidth < 450) {
                scanboxSize.width = 220;
                scanboxSize.height = 120;
            } else if (screenWidth >= 450) {
                scanboxSize.width = 220;
                scanboxSize.height = 120;
            }
            const QRscanning = async () => {
                await Html5Qrcode.getCameras().then(async (devices) => {
                    const config = {

                        fps: 25, // Set the capture frame rate to 15 FPS.
                        qrbox: {
                            width: scanboxSize.width,
                            height: scanboxSize.height,
                        }, // Set the QR code scanning box size to 300 pixels.
                        aspectRatio: 2, // Set the aspect ratio of the QR code scanning box to 1.5.
                    };

                    const onSuccess = async (decodedText, decodedResult) => {
                        // prefix: 'https://coolmate.me'
                        console.log('scan success : ', decodedText);
                        scanResultHandler(decodedText, decodedResult)

                    }
                    const onError = (err) => {
                        console.warn(err);
                    }
                    if (devices.length > 1) {
                        await qrCodeScanner.start({
                            facingMode: "environment"
                        }, config, onSuccess, onError);
                    } else
                        await qrCodeScanner.start(devices[0].id, config, onSuccess, onError);
                }).catch(err => {
                    console.warn(err)
                });
            }
            // Các cấu hình và sử dụng qrCodeScanner ở đây
        if (startScan) {
            await QRscanning();
        } else {
            await qrCodeScanner.stop();
        }
        return () => {
            scannerRef.current.removeChild(script);
        };
    }, [startScan]);



    const scanResultHandler = (text, result) => {
        text = text.replace(//g, ' ').trim().slice(0, 31)
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
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.7/html5-qrcode.min.js"
                    integrity="sha512-dH3HFLqbLJ4o/3CFGVkn1lrppE300cfrUiD2vzggDAtJKiCClLKjJEa7wBcx7Czu04Xzgf3jMRvSwjVTYtzxEA=="
                    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                
                <Box 
                    sx={{ margin: "auto", textAlign: "center", width: 400 }}
                    >
                    
                    <div class="row d-flex justify-content-center"
                        style={{width:"auto", margin:"auto", padding:"auto", zIndex:0}}>
                        <div class="row d-block justify-content-center scannBox" style={{margin:"auto", padding:"auto", with: "100%"}}>
                            <div id="scanner" style={{padding: 0}}></div>
                        </div>
                    </div>
                </Box>
            </Modal.Body>
        </Modal>
        
    );
}

export default (ScanCodeBoxV2Modal);