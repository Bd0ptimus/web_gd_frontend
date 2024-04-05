import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google';
import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpload,
    faQrcode,
    faCircleCheck,
    faCircleXmark,
    faDownload, 
    faTrash
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
    CardFooter,
    Link } from "@nextui-org/react";
import { Scanner } from '@yudiel/react-qr-scanner';
import Box from "@mui/material/Box";
import * as Constants from '@/config/constants/Constants';
import * as XLSX from "xlsx";
import FooterCpn from '@/components/layouts/footerCpn';

const inter = Inter({ subsets: ['latin'] })

function Home({ children }) {
    const [startScanBox, setStartScanBox] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [modalScanShow, setModalScanShow] = useState(false);
    const [currentScannedCode, setCurrentScannedCode] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [products, setProducts] = useState([]);
    const [deleteKizOfProduct, setDeleteKizOfProduct] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // setProducts([
        //     {
        //         id: 1,
        //         number: "1565420132",
        //         sticker: "19139551056",
        //         kiz: null,
        //         status: 'completed'
        //     },
        //     {
        //         id: 2,
        //         number: "1565552093",
        //         sticker: "19139766546",
        //         kiz: null,
        //         status: 'pending'
    
        //     },
        //     {
        //         id: 3,
        //         number: "1565041132",
        //         sticker: "19138829717",
        //         kiz: null,
        //         status: 'pending'
    
        //     },
        //     {
        //         id: 4,
        //         number: "1563749990",
        //         sticker: "19135806281",
        //         kiz: null,
        //         status: 'pending'
    
        //     },
        //     {
        //         id: 5,
        //         number: "1565972295",
        //         sticker: "19140425282",
        //         kiz: null,
        //         status: 'pending'
    
        //     },
        //     {
        //         id: 6,
        //         number: "1566311887",
        //         sticker: "19141102525",
        //         kiz: null,
        //         status: 'pending'
    
        //     },
        // ])
    }, [])

    useEffect(() => {
        updateProductsKiz()
    }, [currentScannedCode])

    useEffect(() => {
        deleteProductKiz()
    }, [deleteKizOfProduct])

    const updateProductsKiz = () => {
        let seletedProductDetail = products.filter((item) => item.id == selectedProductId)[0]
        const newSetProducts = products.map((item) => {
            if (seletedProductDetail && item.id == seletedProductDetail.id) {
                item.kiz = currentScannedCode
                item.status = currentScannedCode == null || currentScannedCode.length == 0 ?  Constants.PRODUCTS_KIZ_STATUS.PENDING : Constants.PRODUCTS_KIZ_STATUS.COMPLETED
            }
            return item
        })
        if (newSetProducts.length > 0) {
            setProducts(newSetProducts)
        }
        setSelectedProductId(null)
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

    const openScanBoxHandler = (productId) => {
        setStartScanBox(true)
        setModalScanShow(true)
        setSelectedProductId(productId)
    }

    const closeScanBoxHandler = () => {
        setStartScanBox(false)
        setModalScanShow(false)
    }

    const onResultGet = (resultObject) => {
        const incomingText = resultObject.text ?? ''
        closeScanBoxHandler()
        if (incomingText == currentScannedCode) {
            toast.warning(`Mã Kiz này đã được sử dụng. Vui lòng chọn mã khác`, {
                position: toast.POSITION.TOP_RIGHT
            });
            return
        }

        let findExistedKiz = products.filter(product => product.kiz == incomingText)
        if (findExistedKiz.length > 0) {
            toast.warning(`Mã Kiz này đã được sử dụng. Vui lòng chọn mã khác`, {
                position: toast.POSITION.TOP_RIGHT
            });
            return
        }
        setCurrentScannedCode(resultObject.text ?? '')
    }


    const readExcel = (file) => {
        try {
            const promise = new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);
                fileReader.onload = (e) => {
                    const bufferArray = e.target.result;
                    const wb = XLSX.read(bufferArray, {
                        type: "buffer"
                    });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data = XLSX.utils.sheet_to_json(ws);
                    console.log(data);
                    resolve(data);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
            promise.then((d) => {
                let productsImported = []
                d.forEach((item, index) => {
                    const product = {}
                    product.id = index
                    columns.forEach ((col) => {
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
                setProducts(productsImported)
            });
        } catch (e) {
            toast.warning(`File không được chấp nhận`, {
                position: toast.POSITION.TOP_RIGHT
            });
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
            let product  = {}
            columns.forEach ((col) => {
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
                <div className="container py-4" style={{minHeight: '85vh'}}>
                    <div className="py-4">
                        <Card className="max-w-[400px]">
                            {/* <Divider /> */}
                            <CardBody>
                                <p className="text-xl text-default-500">App hỗ trợ quét mã КИЗ</p>
                                <p>Hướng dẫn sử dụng: </p>
                                <p>1. Tải file Excel mẫu từ sàn WB về máy tính </p>
                                <p>2. Up file excel lên app </p>
                                <p>3. Sử dụng app để quét mã КИЗ cho sản phẩm </p>
                                <p>4. Tải file đã điền КИЗ về máy tính </p>
                                <p>5. Up file Excel đã điền КИЗ lên sàn</p>
                            </CardBody>
                            {/* <Divider />
                            <CardFooter>
                                <Link
                                    isExternal
                                    showAnchorIcon
                                    href="https://github.com/nextui-org/nextui"
                                >
                                    Visit source code on GitHub.
                                </Link>
                            </CardFooter> */}
                        </Card>
                    </div>
                    <div className="py-4">
                        <div  className="d-flex justify-content-between">
                            <Button
                                variant="bordered"
                                startContent={<FontAwesomeIcon icon={faUpload} />}
                                onClick={handleUploadBtnClick}
                            >
                                Tải file Excel lên
                            </Button>
                            <Button
                                variant="bordered"
                                startContent={<FontAwesomeIcon icon={faDownload} />}
                                onClick={exportExcelFile}
                            >
                                Tải file Excel xuống
                            </Button>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        {/* <div>
                            <Button variant="bordered" onClick={() => testObject()}>  Test </Button>
                        </div> */}
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
                                                    {item.kiz != null && item.kiz.length > 0 ? (
                                                        <Button
                                                            variant="bordered"
                                                            startContent={<FontAwesomeIcon icon={faTrash} />}
                                                            onClick={ () => deleteKiz(item.id)}
                                                            style={{ color: "#c81e37" }}
                                                        >
                                                            Xóa Kiz
                                                        </Button>
                                                    ) : (<></>)}                                                 
                                                                                                 
                                                </div>

                                            </TableCell>
                                            <TableCell>
                                                <div className="relative flex items-center gap-2">
                                                    <Button variant="bordered" startContent={<FontAwesomeIcon icon={faQrcode} />} onClick={() => openScanBoxHandler(item.id)}> Quét mã KIZ</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <ToastContainer />
                </div>
                <FooterCpn/>
            </div>
        </>
    )
}
export async function getServerSideProps() {
    const data = {}
    return { props: { data } }
}

export default Home;