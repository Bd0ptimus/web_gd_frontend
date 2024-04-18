import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google';
import { connect } from 'react-redux';
import { useState, useEffect, useRef, useLayoutEffect  } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpload,
    faQrcode,
    faCircleCheck,
    faCircleXmark,
    faDownload, 
    faTrash,
    faMagnifyingGlass,
    faPenToSquare,
    faPlay,
    faStop
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

import ScanCodeBoxModal from '@/components/sections/scanCodeBoxModal';

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
    Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { Scanner } from '@yudiel/react-qr-scanner';
import Box from "@mui/material/Box";
import * as XLSX from "xlsx";

import * as Constants from '@/config/constants/Constants';
import ToastCpn from '@/components/layouts/toastCpn';
import SearchFileCpn from '@/components/layouts/searchFileCpn';
import useCommonFunction from '@/helpers/commonFunction';
import {ssrAxiosGet} from '@/helpers/ssrAxiosRequest';
import useAxiosRequest from '@/helpers/axiosRequest';
import Instruction from '@/components/sections/instruction';
import UpdateKizModal from '@/components/sections/updateKizModal';
function FileDetail({ data }) {
    const [startScanBox, setStartScanBox] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [modalScanShow, setModalScanShow] = useState(false);
    const [currentScannedCode, setCurrentScannedCode] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [products, setProducts] = useState([]);
    const [deleteKizOfProduct, setDeleteKizOfProduct] = useState(null);
    const fileInputRef = useRef(null);
    const [fileId, setFileId] = useState(null);
    const [openManualKiz, setOpenManualKiz] = useState(false);
    const [productSelectedForUpdateKizManual, setProductSelectedForUpdateKizManual] = useState({})
    
    const [startFastProcess, setStartFastProcess] = useState(false);
    const inputStickerInFastProcessRef = useRef(null);
    const [scanType, setScanType] = useState('');

    const router = useRouter();
    const commonFunction = useCommonFunction();
    const axiosRequest = useAxiosRequest();
    useEffect(() => {
        const interval  = setInterval(async () => {
            // data = await getFileById(fileId)
            data = await commonFunction.getFileById(fileId)
            setProducts(data.products)
        }, 10000);
        return () => clearInterval(interval);
    }, [fileId]);
    useEffect(() => {
        setProducts(data.products)
        setFileId(data.fileId)
    }, [data.fileId])

    useEffect(() => {
        updateProductsKiz()
    }, [currentScannedCode])

    useEffect(() => {
        deleteProductKiz()
    }, [deleteKizOfProduct])

    useEffect(() => {
        // reFocusIntoInput();
    }, [startFastProcess])

    // useEffect (() => {

    //     if (!modalScanShow && !openManualKiz && startFastProcess && inputStickerInFastProcessRef.current) {
    //         setTimeout(() => {
    //             inputStickerInFastProcessRef.current.focus();
    //         }, 1000); 
    //     }
    // }, [modalScanShow, openManualKiz])

    useEffect(() => {
        reFocusIntoInput();
        // return () => clearInterval(interval);
    }, []);

    function reFocusIntoInput () {
        const interval  = setInterval(async () => {
            // data = await getFileById(fileId)
            if ( document.activeElement.tagName != 'INPUT' && !modalScanShow && !openManualKiz && inputStickerInFastProcessRef.current) {
                setTimeout(() => {
                    if (!inputStickerInFastProcessRef.current) {return}
                    inputStickerInFastProcessRef.current.focus();
                    if (inputStickerInFastProcessRef.current.value == '') {
                        inputStickerInFastProcessRef.current.value = ''
                    }
                }, 1000); 
            }
        }, 400);
    }

    const updateProductsKiz = () => {
        let seletedProductDetail = products.filter((item) => item.id == selectedProductId)[0]
        const newSetProducts = products.map((item) => {
            if (seletedProductDetail && item.id == seletedProductDetail.id) {
                item.kiz = currentScannedCode
                item.status = currentScannedCode == null || currentScannedCode.length == 0 ? Constants.PRODUCTS_KIZ_STATUS.PENDING : Constants.PRODUCTS_KIZ_STATUS.COMPLETED
            }
            return item
        })
        if (newSetProducts.length > 0) {
            setProducts(newSetProducts)
            axiosRequest.axiosPut(`/api/file/update-file`, {
                id: fileId,
                products: products
            })
        }
        setSelectedProductId(null)
        setTimeout(() => {
            if (inputStickerInFastProcessRef.current) {
                inputStickerInFastProcessRef.current.value = '';
            }
        }, 1000); 
    }

    const deleteProductKiz = () => {
        let seletedProductDetail = products.filter((item) => item.id == deleteKizOfProduct)[0]
        const newSetProducts = products.map((item) => {
            if (seletedProductDetail && item.id == seletedProductDetail.id) {
                item.kiz = ''
                item.status = Constants.PRODUCTS_KIZ_STATUS.PENDING
            }
            return item
        })
        if (newSetProducts.length > 0) {
            setProducts(newSetProducts)
            axiosRequest.axiosPut(`/api/file/update-file`, {
                id: fileId,
                products: products
            })
        }

        setCurrentScannedCode('')
        setDeleteKizOfProduct(null)
    }

    const checkScreenWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 1024) {
            setIsMobileOrTablet(true);
        } else {
            setIsMobileOrTablet(false);
        }
    };

    const openScanBoxHandlerWithDM = (productId) => {
        setScanType(Constants.SCAN_TYPE.DM)
        setStartScanBox(true)
        setModalScanShow(true)
        setSelectedProductId(productId)
    }

    const openScanBoxHandlerWithQR = (productId) => {
        setScanType(Constants.SCAN_TYPE.QR)
        setStartScanBox(true)
        setModalScanShow(true)
        setSelectedProductId(productId)
    }

    const openScanBoxHandlerForSticker = () => {
        setScanType(Constants.SCAN_TYPE.QR)
        setStartScanBox(true)
        setModalScanShow(true)
    }

    const closeScanBoxHandler = () => {
        setStartScanBox(false)
        setModalScanShow(false)
    }

    const handlerSearchStickerInput = (e) => {
        if (e.key == 'Enter') {
            const productFound = products.find(product => product.sticker == e.target.value)
            if (!productFound) {
                ToastCpn.toastWarning(`Không tìm thấy mã Sticker nào`)
                return
            }

            ToastCpn.toastSuccess(`Tiếp tục nhập Kiz`)

            openUpdateKizModal(productFound.id)
        }

    }

    const onResultGet = (resultObject) => {
        if (scanType == Constants.SCAN_TYPE.QR) {
            const productFound = products.find(product => product.sticker === resultObject.text)
            closeScanBoxHandler()
            if (!productFound) {
                ToastCpn.toastWarning(`Không tìm thấy mã Sticker nào`)
                return
            }

            ToastCpn.toastSuccess(`Tiếp tục nhập Kiz`)

            setTimeout(() => {
                openUpdateKizModal(productFound.id)

            }, 1000);
            return
        }
        const incomingText = resultObject.text ?? ''
        closeScanBoxHandler()
        if (incomingText == currentScannedCode) {
            ToastCpn.toastWarning(`Mã Kiz này đã được sử dụng. Vui lòng chọn mã khác`)
            return
        }

        let findExistedKiz = products.filter(product => product.kiz == incomingText)
        if (findExistedKiz.length > 0) {
            ToastCpn.toastWarning(`Mã Kiz này đã được sử dụng. Vui lòng chọn mã khác`)
            return
        }
        setCurrentScannedCode(resultObject.text ?? '')
        closeUpdateKizModal()
        ToastCpn.toastSuccess(`Nhập mã Kiz thành công`)

    }

    const onResultGetFromManualKizInput = (resultObject) => {
        const incomingText = resultObject.text ?? ''
        closeScanBoxHandler()
        if (incomingText == currentScannedCode) {
            ToastCpn.toastWarning(`Mã Kiz này đã được sử dụng. Vui lòng chọn mã khác`)
            return
        }

        let findExistedKiz = products.filter(product => product.kiz == incomingText)
        if (findExistedKiz.length > 0) {
            ToastCpn.toastWarning(`Mã Kiz này đã được sử dụng. Vui lòng chọn mã khác`)
            return
        }
        setCurrentScannedCode(resultObject.text ?? '')
        ToastCpn.toastSuccess(`Nhập mã Kiz thành công`)

    }

    const openUpdateKizModal = (productId) => {
        setSelectedProductId(productId)
        const currentProduct = products.find(product => product.id === productId)
        setProductSelectedForUpdateKizManual(currentProduct)
        setOpenManualKiz(true)
    }

    const closeUpdateKizModal = () => {
        setOpenManualKiz(false)

    }

    const readExcel = (file) => {
        try {
            const promise = new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                if (!file instanceof Blob) {
                    reject('file reader is not blob');
                } 
                fileReader.readAsArrayBuffer(file);
                fileReader.onload = (e) => {
                    const bufferArray = e.target.result;
                    const wb = XLSX.read(bufferArray, {
                        type: "buffer"
                    });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data = XLSX.utils.sheet_to_json(ws);
                    resolve(data);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
            promise.then(async(d) => {
                let productsImported = []
                d.forEach((item, index) => {
                    const product = {}
                    product.id = index
                    columns.forEach((col) => {
                        if (item[col.name]) {
                            product[col.uid] = item[col.name]
                        }
                    })

                    if (product.kiz != undefined) {
                        product.status = Constants.PRODUCTS_KIZ_STATUS.COMPLETED
                    } else {
                        product.kiz = null
                        product.status = Constants.PRODUCTS_KIZ_STATUS.PENDING
                    }
                    productsImported.push(product)
                })
                if (productsImported.length == 0) {
                    ToastCpn.toastWarning(`File trống, vui lòng kiểm tra lại`)
                    return
                }
                const createRes = await commonFunction.createNewFile(productsImported)
                // const createRes = await createNewFile(productsImported)
                if (createRes == 0) {
                    ToastCpn.toastWarning(`File không được chấp nhận. Hãy đảm bảo file tải lên là excel. Đảm bảo thông tin trong file bao gồm các cột № задания, Стикер và КИЗ.`)
                }
                // setProducts(productsImported)
            });
        } catch (e) {
            ToastCpn.toastWarning(`File không được chấp nhận`)
        }
    };

    const handleUploadBtnClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        readExcel(file);
    };

    const exportExcelFile = () => {
        const dataExport = []
        products.forEach((item) => {
            let product = {}
            columns.forEach((col) => {
                if (item[col.uid] && col.uid != "status") {
                    product[col.name] = item[col.uid]
                }
            })
            if (product['КИЗ'] == undefined) {
                product['КИЗ'] = ''
            }
            dataExport.push(product)
        })
        const worksheet = XLSX.utils.json_to_sheet(dataExport)
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Сборочные задания");
        let currentTime = new Date()
        XLSX.writeFile(workbook, `import_kiz_${currentTime.getTime()}.xlsx`, { compression: true });
    }

    const deleteKiz = (productId) => {
        setDeleteKizOfProduct(productId)
    }

    const searchStickerHandler = (e) => {
        if (e.key === 'Enter') {
            const stickerValue = e.key.value
            const stickerProductSelected = products.find(product => product.sticker === stickerValue)
            if (stickerProductSelected == null || stickerProductSelected == '') {
                ToastCpn.toastWarning(`Không tìm thấy sticker nào`)
                return
            }

            setSelectedProductId(stickerProductSelected.id)
            setProductSelectedForUpdateKizManual(stickerProductSelected)
            setOpenManualKiz(true)
        }
    }

    const testObject = () => {
        setLoadingNewProducts(false)
        setSelectedProductId(5)
        onResultGet({
            text: 'abc'
        })
        setProducts([...products, {
            id: 7,
            number: "1566311887âccc",
            sticker: "19141102525",
            kiz: null,
            status: 'pending'
        }]);

        setLoadingNewProducts(true)
    }

    const columns = [
        { name: "Trạng thái", uid: "status" },
        { name: "№ задания", uid: "number" },
        { name: "Стикер", uid: "sticker" },
        { name: "КИЗ", uid: "kiz" },
        { name: "Thao tác", uid: "actions" },
    ];

    return (
        <>
            <div className={`mt-5`}>
                <Head>
                    <title>Hỗ trợ quét mã kiz </title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
            </div>
            <div>
                <div className="container py-4" style={{ minHeight: '85vh' }}>
                    <Instruction/>
                    <SearchFileCpn />
                    <div className="py-4">
                        <div className="d-flex justify-content-center">
                            <div>Mã số file hiện tại : </div> <b>{fileId}</b>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="d-md-flex d-block justify-content-between">
                            <div className="p-2 col-md-3 col-12">
                                <Button
                                    variant="bordered"
                                    startContent={<FontAwesomeIcon icon={faUpload} />}
                                    onClick={handleUploadBtnClick}
                                >
                                    Tải file Excel lên
                                </Button>
                            </div>

                            <div className="p-2 col-md-3 col-12">
                                <Button
                                    variant="bordered"
                                    startContent={<FontAwesomeIcon icon={faDownload} />}
                                    onClick={exportExcelFile}
                                >
                                    Tải file Excel xuống
                                </Button>
                            </div>

                            
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <ScanCodeBoxModal
                        show={modalScanShow}
                        onHide={() => closeScanBoxHandler()}
                        onResultGet={(e) => onResultGet(e)}
                        startScanBox={startScanBox}
                    />
                    <UpdateKizModal show = {openManualKiz}
                        onResultGet={(e) => onResultGetFromManualKizInput(e)}
                        onHide={() => closeUpdateKizModal()}
                        data = {productSelectedForUpdateKizManual}
                        openScanBox={(e) => openScanBoxHandlerWithDM(e)}
                    />
                    <div className="d-flex justify-content-center my-2">
                        {
                            !startFastProcess ? (
                                <Button
                                    variant="bordered"
                                    startContent={<FontAwesomeIcon icon={faPlay} />}
                                    onClick={() => setStartFastProcess(true)}
                                >
                                    Bắt đầu quét nhanh
                                </Button>
                            ) : (
                                <Button
                                    variant="bordered"
                                    startContent={<FontAwesomeIcon icon={faStop} />}
                                    onClick={() => setStartFastProcess(false)}
                                >
                                    Dừng quét nhanh
                                </Button>
                            )
                        }
                    </div>


                    {
                        startFastProcess && (
                            <div className='d-flex justify-content-center my-4'>
                                <div style={{ width: 200 }}>
                                    <Input
                                        size="xs"
                                        type="text"
                                        label="Mã Стикер"
                                        ref={inputStickerInFastProcessRef}
                                        autoFocus
                                        onKeyDown = {(e) => handlerSearchStickerInput(e)}
                                    />
                                </div>

                                <Button variant="bordered" startContent={<FontAwesomeIcon icon={faQrcode} />} onClick={()=> openScanBoxHandlerForSticker()}> Quét mã Стикер</Button>

                            </div>
                        )
                    }
                   

                    {/* <ScanCodeBoxV2Modal
                        show={modalScanShow}
                        onHide={() => closeScanBoxHandler()}
                        onResultGet={(e) => onResultGet(e)}
                        startScanBox={startScanBox}
                    /> */}

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
                        <TableBody>
                            {
                                products.map((item) => {
                                    let colorText = '';
                                    let backgroundColorText = '';
                                    if (item.status == Constants.PRODUCTS_KIZ_STATUS.COMPLETED) {
                                        colorText = '#265a33';
                                        backgroundColorText = '#f0f4f1';
                                    } else if (item.status == Constants.PRODUCTS_KIZ_STATUS.PENDING ||
                                        item.status == null ||
                                        item.status == undefined ||
                                        item.status == "undefined") {
                                        colorText = '#c81e37';
                                        backgroundColorText = '#f4f0f1';
                                    }
                                    return (
                                        <TableRow style={{ backgroundColor: `${backgroundColorText}`, color: `${colorText}` }} key={item.id}>
                                            <TableCell>
                                                {item.status === Constants.PRODUCTS_KIZ_STATUS.COMPLETED ? (
                                                    <Tooltip color="success" content="Đã có mã Kiz">
                                                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#63E6BE" }} />
                                                    </Tooltip>
                                                ) : item.status === Constants.PRODUCTS_KIZ_STATUS.PENDING ||
                                                    item.status == null ||
                                                    item.status === undefined ||
                                                    item.status === "undefined" ? (
                                                    <Tooltip color="danger" content="Chưa được quét mã Kiz">
                                                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#c81e37" }} />
                                                    </Tooltip>
                                                ) : null}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <p className="text-bold text-sm capitalize">{item.number}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <p className="text-bold text-sm capitalize">{item.sticker}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="d-flex justify-content-between">
                                                    <p className="text-bold text-sm capitalize">{item.kiz}</p>
                                                    <div className="d-flex justify-content-end">
                                                        {item.kiz != null && item.kiz.length > 0 ? (
                                                            <Button
                                                                variant="bordered"
                                                                startContent={<FontAwesomeIcon icon={faTrash} />}
                                                                onClick={() => deleteKiz(item.id)}
                                                                style={{ color: "#c81e37" }}
                                                            >
                                                                Xóa Kiz
                                                            </Button>
                                                        ) : (<></>)}
                                                        <Button variant="bordered" startContent={<FontAwesomeIcon icon={faPenToSquare} />} onClick={() => openUpdateKizModal(item.id)}> Viết KIZ</Button>
                                                    </div>
                                                    

                                                        {/* <Tooltip color="success" content="Nhập Kiz thủ công" onClick = {() => openUpdateKizModal(item.id)}>
                                                            <FontAwesomeIcon icon={faPenToSquare} style={{fontSize:20, cursor:'pointer'}}/>
                                                        </Tooltip> */}

                                                </div>

                                            </TableCell>
                                            <TableCell>
                                                <div className="relative flex items-center gap-2">
                                                    <Button variant="bordered" startContent={<FontAwesomeIcon icon={faQrcode} />} onClick={() => openScanBoxHandlerWithDM(item.id)}> Quét mã KIZ</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <ToastCpn />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    let data = {};
    const fileId = context.query.fileId
    if (isNaN(Number(fileId)) || Number(fileId) == 0) {
        return { props: { data } }
    }
    data = await ssrAxiosGet(context, `/api/file/get-file/${fileId}`);
    const fileData = data;
    const { res } = context;
    if (fileData == null) {
        res.writeHead(302, { Location: '/error404' });
        res.end();
        return null
    }
    if (fileData.errCode != 0) {
        res.writeHead(302, { Location: '/error404' });
        res.end();
        return null
    }

    if (fileData.data.file.data == undefined) {
        res.writeHead(302, { Location: '/error404' });
        res.end();
        return null
    }
    data.products = fileData.data.file.data;
    data.fileId = fileId
    return { props: { data } }
}


export default FileDetail;