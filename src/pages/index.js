import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import * as actions from "@/store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpload,
    faQrcode,
    faCircleCheck,
    faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import ScanCodeBoxModal from '@/components/sections/scanCodeBoxModal';

import { Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    User, 
    Chip, 
    Tooltip, 
    Button } from "@nextui-org/react";
import { Scanner } from '@yudiel/react-qr-scanner';
import Box from "@mui/material/Box";
import * as Constants from '@/config/constants/Constants';

const inter = Inter({ subsets: ['latin'] })

function Home({ children }) {
    const [startScanBox, setStartScanBox] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [modalScanShow, setModalScanShow] = useState(false);
    const [currentScannedCode, setCurrentScannedCode] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts([
            {
                id: 1,
                number: "1565420132",
                sticker: "19139551056",
                kiz: null,
                status: 'completed'
            },
            {
                id: 2,
                number: "1565552093",
                sticker: "19139766546",
                kiz: null,
                status: 'pending'
    
            },
            {
                id: 3,
                number: "1565041132",
                sticker: "19138829717",
                kiz: null,
                status: 'pending'
    
            },
            {
                id: 4,
                number: "1563749990",
                sticker: "19135806281",
                kiz: null,
                status: 'pending'
    
            },
            {
                id: 5,
                number: "1565972295",
                sticker: "19140425282",
                kiz: null,
                status: 'pending'
    
            },
            {
                id: 6,
                number: "1566311887",
                sticker: "19141102525",
                kiz: null,
                status: 'pending'
    
            },
        ])
    }, [])

    useEffect(() => {
        const productSelectedDetail = products.filter((item) => item.id == selectedProductId)[0]
        console.log('check productSelectedDetail : ', productSelectedDetail)
    }, [selectedProductId])

    useEffect(() => {
        let seletedProductDetail = products.filter((item) => item.id == selectedProductId)[0]
        // if (seletedProductDetail != undefined) {
        //     seletedProductDetail.kiz = currentScannedCode
        // }
        const newSetProducts = products.map((item) => {
            if (item.id == seletedProductDetail.id) {
                item.kiz = currentScannedCode
                item.status = Constants.PRODUCTS_KIZ_STATUS.COMPLETED
            }
            return item
        })
        console.log('--> currentScannedCode : ', products, '--> selectedProductId: ', selectedProductId, '--> seletedProductDetail : ', seletedProductDetail, '--> newSetProducts : ', newSetProducts)
        if (newSetProducts.length > 0) {
            setProducts(newSetProducts)
        }
        
    }, [currentScannedCode])

    // useEffect(() => {
    //     console.log('selectedProduct updated:', selectedProduct);
    //   }, [selectedProduct]);

    const checkScreenWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1024) {
            setIsMobileOrTablet(true);
        } else {
            setIsMobileOrTablet(false);
        }
    };

    const openScanBoxHandler = (productId) => {
        setStartScanBox(true)
        setModalScanShow(true)
        setSelectedProductId(productId)
        console.log('--> check products : ', products)
    }

    const closeScanBoxHandler = () => {
        setStartScanBox(false)
        setModalScanShow(false)
    }

    const onResultGet = (resultObject) => {
        console.log('obj: ', resultObject)
        setCurrentScannedCode(resultObject.text ?? '')
        closeScanBoxHandler()
    }

    const columns = [
        { name: "Trạng thái", uid: "status" },
        { name: "№ задания", uid: "number" },
        { name: "Стикер", uid: "sticker" },
        { name: "КИЗ", uid: "kiz" },
        { name: "Thao tác", uid: "actions" },
    ];

    const renderCell = React.useCallback((product, columnKey) => {
        const cellValue = product[columnKey];

        switch (columnKey) {
            case "number":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "sticker":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "kiz":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "status":
                if (cellValue == Constants.PRODUCTS_KIZ_STATUS.COMPLETED) {
                    return (
                        <Tooltip color="success" content="Đã có mã Kiz">
                            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#63E6BE",}} />
                        </Tooltip>
                    );
                } else if (cellValue == Constants.PRODUCTS_KIZ_STATUS.PENDING) {
                    return (
                        <Tooltip color="danger" content="Chưa được quét mã Kiz">
                            <FontAwesomeIcon icon={faCircleXmark} style={{color: "#c81e37",}} />
                        </Tooltip>
                    );
                } else if (cellValue == null || cellValue == undefined || cellValue == "undefined") {
                    return (
                        <Tooltip color="danger" content="Chưa được quét mã Kiz">
                            <FontAwesomeIcon icon={faCircleXmark} style={{color: "#c81e37",}} />
                        </Tooltip>
                    );
                }
                
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        {/* <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <FontAwesomeIcon icon={faUpload} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <FontAwesomeIcon icon={faUpload} />

                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <FontAwesomeIcon icon={faUpload} />

                            </span>
                        </Tooltip> */}
                        <Button  variant="bordered" startContent={<FontAwesomeIcon icon={faQrcode} />} onClick={() => openScanBoxHandler(product.id)}> Quét mã KIZ</Button>

                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div>
                <Head>
                    <title>Hỗ trợ quét mã kiz </title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            </div>
            <div>
                <div className="container py-4">
                    <div className="py-4">
                        <div>
                            <Button variant="bordered"  startContent={<FontAwesomeIcon icon={faUpload} />}>  Tải file Excel lên</Button>
                        </div>
                    </div>
                    {/* { (!isMobileOrTablet && startScanBox) && (
                        <div className="py-4" >
                            <div className="d-flex justify-content-end">
                                <Button isIconOnly 
                                color="danger" 
                                aria-label="close-scan"
                                onClick={() => closeScanBoxHandler()}>                            
                                    <FontAwesomeIcon icon={faXmark} />
                                </Button>
                            </div>
                            <Box sx={{ margin: "auto", textAlign: "center", width: 300 }}>
                                <Scanner
                                    onResult={(text, result) => console.log(text, result)}
                                    onError={(error) => console.log(error?.message)}
                                    enabled={startScanBox}
                                />
                            </Box>
                        </div>
                    )} */}

                    <ScanCodeBoxModal
                        show={modalScanShow}
                        onHide = {() => closeScanBoxHandler()}
                        onResultGet = {(e) => onResultGet(e)}
                        startScanBox = {startScanBox}
                    />
                    
                    <Table aria-label="Example table with custom cells"
                        color="default"      
                        selectionMode="single" 
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={products}>
                            {/* {(item) => (
                                <TableRow style={{backgroundColor: "#c81e37",}} key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )} */}
                            {(item) => {
                                let colorText = '';
                                let backgroundColorText = '';
                                if (item.status == Constants.PRODUCTS_KIZ_STATUS.COMPLETED) {
                                    colorText = '#63E6BE';
                                    backgroundColorText = '#f0f4f1';
                                } else if (item.status == Constants.PRODUCTS_KIZ_STATUS.PENDING || 
                                    item.status == null || 
                                    item.status == undefined || 
                                    item.status == "undefined") {
                                    colorText = '#c81e37';
                                    backgroundColorText = '#f4f0f1';
                                }
                                return (
                                    <TableRow style={{backgroundColor: `${backgroundColorText}`, color: `${colorText}`}} key={item.id}>
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )
                            }}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}
export async function getServerSideProps() {
    const data = {}
    return { props: { data } }
}

export default Home;