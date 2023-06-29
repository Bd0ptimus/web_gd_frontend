import React, { Component, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Button as PrimeReactButton } from 'primereact/button';
import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';

import ProductsApi from '@/api/products';
import styles from '@/styles/admin/products/product.module.scss';
function EditProductModal(props) {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [wholeSalePrice, setWholeSalePrice] = useState(0);

    const [des, setDes] = useState('');
    const [listCates, setListCates] = useState([]);
    const [cate, setCate] = useState(null);
    const [listFile, setListFile] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [listFileShow, setListFileShow] = useState([]);
    const [listFileWasSelectedMore, setListFileWasSelectedMore] = useState([]);

    const fileTypeAllow = ["image/gif", "image/jpeg", "image/png"];
    useEffect(() => {
        setCate(props.selectedProduct.Product_Category);
        setProductName(props.selectedProduct.name);
        setPrice(props.selectedProduct.price);
        setWholeSalePrice(props.selectedProduct.wholeSalePrice);
        setDes(props.selectedProduct.des);
        setListCates(props.listCates);
        setListFile([]);
        setListFileShow([]);
        setSelectedProduct(props.selectedProduct);
        // setListFileFunc(props.selectedProduct.Product_Attachments);
        if (!props.selectedProduct.Product_Attachments) {
            setListFile([]);
        } else {
            props.selectedProduct.Product_Attachments.map((img, index) => {
                // console.log('Checkj all product attachments :', img, ' - indewx : ', index);
                setListFile((listFile) => ([...listFile, {
                    file: process.env.NEXT_PUBLIC_APP_BACKEND_URL + img.path,
                    id: index,
                }]))
                setListFileShow((listFileShow) => ([...listFileShow, {
                    file: process.env.NEXT_PUBLIC_APP_BACKEND_URL + img.path,
                    id: index,
                }]))
                // console.log('List file Checkj all product attachments: ', listFile);

            })
        }
        // setListFileShow(listFile);
        setListFileWasSelectedMore([]);
        // console.log('List file : ', listFile);

    }, [props])



    function dropDownHandler(value) {
        // listCates.pid = value;
        setCate(listCates.filter(cate => cate.id == value)[0]);
    }

    async function handleChange(e) {
        console.log(e.target.files);
        // setListFileWasSelectedMore([]);
        let arr = [];
        let highestIndex = listFileShow.length == 0 ? -1 : listFileShow[listFileShow.length - 1].id;
        for (let i = 0; i < e.target.files.length; i++) {
            if (fileTypeAllow.includes(e.target.files[i].type)) {
                let compressedFile = await imageCompression(e.target.files[i], {
                    maxSizeMB: 0.3,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                });
                setListFileWasSelectedMore((listFileWasSelectedMore) => ([...listFileWasSelectedMore, {
                    file: compressedFile,
                    id: i + highestIndex + 1,
                }]));
                setListFileShow((listFileShow) => ([...listFileShow, {
                    file: URL.createObjectURL(compressedFile),
                    id: i + highestIndex + 1,
                }]))
            } else {
                props.errorAlert('Một file đã chọn không được hỗ trợ');

            }


        }
        // console.log('----> listFileWasSelectedMore : ', listFileWasSelectedMore);
    }

    function removeImage(value) {
        if (listFile.filter((img) => img.id != value)) {
            setListFile(listFile.filter((img) => img.id != value));
        } else {
            setListFileWasSelectedMore(listFileWasSelectedMore.filter((img) => img.id != value));
        }
        setListFileShow(listFileShow.filter((img) => img.id != value));

    }

    async function submitUpdateProductHandler() {
        const data = new FormData();
        let fileKeptArr = [];
        listFile.forEach((item) => {
            // fileKeptArr = [...fileKeptArr, item.file];
            data.append(`fileKept`, item.file);

        });
        console.log('====>fileKeptArr : ', fileKeptArr);
        // data.append(`fileKept`, fileKeptArr);
        // data.append(`fileKept`, ' ');

        listFileWasSelectedMore.forEach(async (item) => {
            // console.log('===> file was selected : ', item);
            await data.append(`fileSelected`, item.file);
        })
        data.append(`wholeSalePrice`, wholeSalePrice);

        // console.log('fileSelected : ', data);
        data.append(`id`, selectedProduct.id);
        data.append(`name`, productName);
        data.append(`categoryId`, cate ? Number(cate.id) : null);
        data.append(`price`, Number(price));
        data.append(`des`, des);

        ProductsApi.updateProducts(data, props.JWT).then((response) => {
            // console.log('response : ', response);
            if (response.data.errCode == 0) {
                props.successAlert('Thêm sản phẩm thành công');
                props.reloadPage();
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
                    Chỉnh sửa sản phẩm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Tên sản phẩm" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Giá lẻ (VND)</Form.Label>
                        <Form.Control type="number" placeholder="Giá bán lẻ sản phẩm" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Giá sỉ (VND)</Form.Label>
                        <Form.Control type="number" placeholder="Giá sỉ sản phẩm" value={wholeSalePrice} onChange={(e) => setWholeSalePrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control type="text" placeholder="Mô tả sản phẩm" as="textarea" rows={3} value={des} onChange={(e) => setDes(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <DropdownButton id="dropdown-basic-button" title={`Nhóm sản phẩm: ${!cate ? "Chưa chọn nhóm" : cate.name}`} onSelect={(e) => { dropDownHandler(e) }}>
                            <Dropdown.Item eventKey="null" >Không chọn nhóm</Dropdown.Item>
                            {
                                listCates.map((item, index) => {
                                    let selectedAttr = {};
                                    // if (item.id == listCates.pid) {
                                    //     selectedAttr = { active: "true" };
                                    // }
                                    return (
                                        <Dropdown.Item {...selectedAttr} eventKey={item.id} key={index}>{item.name}</Dropdown.Item>
                                    );
                                })
                            }
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <label className="mx-3">Chọn ảnh: </label>
                        <input type="file" multiple="multiple" onChange={(e) => handleChange(e)} />

                        <div className={`d-flex justify-content-center`} style={{ flexWrap: 'wrap' }}>
                            {
                                listFileShow.map((item, index) => {
                                    return (
                                        <div className={`${styles.previewImgSec}`} key={index}>
                                            <img src={(item.file)} className={`${styles.uploadedImg}`} />
                                            <FontAwesomeIcon icon={faTrash} className={`${styles.previewImageDeleteIcon}`} onClick={() => removeImage(`${item.id}`)} />

                                        </div>
                                    );
                                })
                            }
                        </div>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => submitUpdateProductHandler()}>Xác nhận chỉnh sửa</Button>

            </Modal.Footer>
        </Modal>
    );
}

function mapStateToProps(state) {
    return { JWT: state.system.userJWT };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);