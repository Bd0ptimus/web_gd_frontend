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
import styles from './product.module.scss';
function AddProductModal(props) {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [wholeSalePrice, setWholeSalePrice] = useState(0);

    const [des, setDes] = useState('');
    const [listCates, setListCates] = useState([]);
    const [cate, setCate] = useState(null);
    const [listFile, setListFile] = useState([]);
    const fileTypeAllow = ["image/gif", "image/jpeg", "image/png"];
    useEffect(() => {
        setCate(null);
        setProductName('');
        setPrice(0);
        setWholeSalePrice(0);
        setDes('');
        setListCates(props.listCates);
        setListFile([]);
    }, [props])

    function dropDownHandler(value) {
        // listCates.pid = value;
        setCate(listCates.filter(cate => cate.id == value)[0]);
    }

    async function handleChange(e) {
        // console.log(e.target.files);
        setListFile([]);
        let arr = [];
        for (let i = 0; i < e.target.files.length; i++) {
            if (fileTypeAllow.includes(e.target.files[i].type)) {
                let compressedFile = await imageCompression(e.target.files[i], {
                    maxSizeMB: 0.3,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                });
                arr = [...arr, {
                    file: compressedFile,
                    id: i,
                }];
            } else {
                props.errorAlert('Một file đã chọn không được hỗ trợ');

            }

        }
        setListFile(arr);
        // console.log(listFile);
    }

    function removeImage(value) {
        setListFile(listFile.filter((img) => img.id != value));
    }

    function getBase64(file) {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Make a fileInfo Object
                // console.log("Called", reader);
                baseURL = reader.result;
                // console.log(baseURL);
                resolve(baseURL);
            };
        });
    };
    function submitNewProductHandler() {
        const data = new FormData();

        listFile.forEach((item) => {
            data.append(`fileSelected`, item.file);
        })
        data.append(`name`, productName);
        data.append(`categoryId`, cate ? Number(cate.id) : null);
        data.append(`price`, Number(price));
        data.append(`wholeSalePrice`, Number(wholeSalePrice));
        data.append(`des`, des);

        ProductsApi.addProducts(data, props.JWT).then((response) => {
            console.log('response : ', response);
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
                    Thêm sản phẩm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Tên sản phẩm" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Giá bán lẻ (VND)</Form.Label>
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
                                listFile.map((item, index) => {
                                    return (
                                        <div className={`${styles.previewImgSec}`} key={index}>
                                            <img src={URL.createObjectURL(item.file)} className={`${styles.uploadedImg}`} />
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
                <Button onClick={() => submitNewProductHandler()}>Thêm sản phẩm</Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);