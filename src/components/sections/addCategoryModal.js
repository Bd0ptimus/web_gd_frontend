import React, { Component, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import imageCompression from 'browser-image-compression';
import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductsApi from '@/api/products';
import styles from '@/styles/admin/products/product.module.scss';

function AddCategoryModal(props) {
    const [parentCate, setParentCate] = useState(null);
    const [listCates, setListCates] = useState([]);
    const [selectedCateName, setSelectedCateName] = useState('');
    const [listFile, setListFile] = useState([]);
    const fileTypeAllow = ["image/gif", "image/jpeg", "image/png"];


    useEffect(() => {
        setParentCate(null);
        setSelectedCateName('');
        setListCates(props.listCates);
        setListFile([]);
        // console.log('in use effect EditCategoryModal', JSON.stringify(props.listCates.filter(cate => cate.id === props.selectedCate.pid)[0].name));
    }, [props])

    function dropDownHandler(value) {
        listCates.pid = value;
        setParentCate(listCates.filter(cate => cate.id == value)[0]);
    }

    function addNameCateHandler(value) {
        // props.selectedCate.name = value;
        setSelectedCateName(value);
        // console.log('check selectedCate : ', selectedCateName);
    }

    function removeImage() {
        setListFile([]);
    }
    async function handleChange(e) {
        // console.log(e.target.files);
        setListFile([]);
        let arr = [];
        if (fileTypeAllow.includes(e.target.files[0].type)) {
            let compressedFile = await imageCompression(e.target.files[0], {
                maxSizeMB: 0.3,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            });
            arr = [{
                file: compressedFile,
            }];
        } else {
            props.errorAlert('Định dạng file không được hỗ trợ');
        }
        setListFile(arr);
        // console.log(listFile);
    }


    async function submitNewCategoryHandler() {
        // ProductsApi.addCategory({
        //     name: selectedCateName,
        //     pid: parentCate ? parentCate.id : null,
        // }, props.JWT).then((response) => {
        //     // console.log('response : ', response);
        //     if (response.data.errCode == 0) {
        //         props.successAlert('Thêm sản phẩm thành công');
        //         props.reloadPage();
        //         props.onHide();
        //     } else {
        //         props.errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
        //     }
        // }).catch((e) => {
        //     props.errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
        //     console.log(e)

        // });

        const data = new FormData();

        listFile.forEach((item) => {
            data.append(`fileSelected`, item.file);
        })
        data.append(`name`, selectedCateName);
        data.append(`pid`, parentCate ? Number(parentCate.id) : JSON.parse(null));

        ProductsApi.addCategory(data, props.JWT).then((response) => {
            console.log('response : ', response);
            if (response.data.errCode == 0) {
                props.successAlert('Thêm nhóm sản phẩm thành công');
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
                    Thêm nhóm sản phẩm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên nhóm</Form.Label>
                        <Form.Control type="text" placeholder="" value={selectedCateName} onChange={(e) => addNameCateHandler(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <DropdownButton id="dropdown-basic-button" title={`Nhóm trực thuộc: ${!parentCate ? "Không lựa chọn nhóm trực thuộc" : parentCate.name}`} onSelect={(e) => { dropDownHandler(e) }}>
                            <Dropdown.Item eventKey="null" >Không lựa chọn nhóm trực thuộc</Dropdown.Item>
                            {
                                listCates.map((item, index) => {
                                    let selectedAttr = {};
                                    // if (item.id == listCates.pid) {
                                    //     selectedAttr = { active: "true" };
                                    // }
                                    return (
                                        <Dropdown.Item {...selectedAttr} eventKey={item.id}>{item.name}</Dropdown.Item>
                                    );
                                })
                            }
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <label className="mx-3">Chọn logo: </label>
                        <input type="file" onChange={(e) => handleChange(e)} />

                        <div className={`d-flex justify-content-center`} style={{ flexWrap: 'wrap' }}>
                            {
                                listFile.map((item, index) => {
                                    return (
                                        <div className={`${styles.previewImgSec}`} key={index}>
                                            <img src={URL.createObjectURL(item.file)} className={`${styles.uploadedImg}`} />
                                            <FontAwesomeIcon icon={faTrash} className={`${styles.previewImageDeleteIcon}`} onClick={() => removeImage()} />

                                        </div>
                                    );
                                })
                            }
                        </div>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => submitNewCategoryHandler()}>Thêm nhóm sản phẩm</Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryModal);