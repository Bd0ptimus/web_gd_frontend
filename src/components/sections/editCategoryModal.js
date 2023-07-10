import React, { Component, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imageCompression from 'browser-image-compression';

import ProductsApi from '@/api/products';
import styles from '@/styles/admin/products/product.module.scss';

function EditCategoryModal(props) {
    const [parentCate, setParentCate] = useState({});
    const [listCates, setListCates] = useState([]);
    const [selectedCate, setSelectedCate] = useState({});
    const [selectedCateName, setSelectedCateName] = useState('');
    const [listFile, setListFile] = useState([]);
    const [newFileSelect, setNewFileSelect] = useState([]);
    const [fileKept, setFileKept] = useState(true);

    const fileTypeAllow = ["image/gif", "image/jpeg", "image/png"];

    useEffect(() => {
        setSelectedCateName(props.selectedCate.name);
        setSelectedCate(props.selectedCate);
        setListCates(props.listCates);
        setParentCate(props.listCates.filter(cate => cate.id == selectedCate.pid)[0]);
        setListFile([process.env.NEXT_PUBLIC_APP_BACKEND_URL + props.selectedCate.logoPath]);
        setNewFileSelect([]);
        setFileKept(true);
    }, [props, selectedCate])
    function dropDownHandler(value) {
        listCates.pid = value;
        setParentCate(listCates.filter(cate => cate.id == value)[0]);
    }

    function changeNameCateHandler(value) {
        // props.selectedCate.name = value;
        setSelectedCateName(value);
        // console.log('check selectedCate : ', selectedCateName);
    }

    function removeImage() {
        setFileKept(false);
        setListFile([]);
        setNewFileSelect([]);
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
            setListFile([URL.createObjectURL(compressedFile)]);
            setFileKept(false);

        } else {
            props.errorAlert('Định dạng file không được hỗ trợ');
        }
        setNewFileSelect(arr);
        // console.log(listFile);
    }

    async function submitChangeData() {
        const data = new FormData();

        data.append(`fileKept`, fileKept);
        newFileSelect.forEach((item) => {
            data.append(`fileSelected`, item.file);
        })
        data.append(`name`, selectedCateName);
        data.append(`pid`, parentCate ? Number(parentCate.id) : JSON.parse(null));
        data.append(`id`, selectedCate.id);

        ProductsApi.updateCategories(data, props.JWT).then((response) => {
            console.log('response : ', response);
            if (response.data.errCode == 0) {
                props.successAlert('Sửa nhóm sản phẩm thành công');
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

    async function deleteCategoryHandler() {
        ProductsApi.deleteCategory(selectedCate.id, props.JWT).then((response) => {
            console.log('response : ', response);
            if (response.data.errCode == 0) {
                props.successAlert('Xóa thành công');
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
                    Chỉnh sửa nhóm sản phẩm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên nhóm</Form.Label>
                        <Form.Control type="text" placeholder="" value={selectedCateName} onChange={(e) => changeNameCateHandler(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <DropdownButton id="dropdown-basic-button" title={`Nhóm trực thuộc: ${parentCate ? parentCate.name : 'Chưa lựa chọn'}`} onSelect={(e) => { dropDownHandler(e) }}>
                            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" >Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" >Something else</Dropdown.Item> */}
                            <Dropdown.Item eventKey="null" >Không lựa chọn nhóm trực thuộc</Dropdown.Item>

                            {
                                listCates.map((item, index) => {
                                    let selectedAttr = {};
                                    // if (item.id == parentCate.pid) {
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
                            <div className={`${styles.previewImgSec}`} >
                                <img src={listFile[0]} className={`${styles.uploadedImg}`} />
                                <FontAwesomeIcon icon={faTrash} className={`${styles.previewImageDeleteIcon}`} onClick={() => removeImage()} />

                            </div>
                        </div>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => submitChangeData()}>Xác nhận thay đổi</Button>
                <Button variant="danger" onClick={() => deleteCategoryHandler()}>Xóa nhóm này</Button>

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

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);