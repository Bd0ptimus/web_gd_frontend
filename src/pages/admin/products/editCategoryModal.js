import React, { Component, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';

import ProductsApi from '@/api/products';

function EditCategoryModal(props) {
    const [parentCate, setParentCate] = useState({});
    const [listCates, setListCates] = useState([]);
    const [selectedCate, setSelectedCate] = useState({});
    const [selectedCateName, setSelectedCateName] = useState('');


    useEffect(() => {
        setSelectedCateName(props.selectedCate.name);
        setSelectedCate(props.selectedCate);
        setListCates(props.listCates);
        setParentCate(props.listCates.filter(cate => cate.id == selectedCate.pid)[0]);
        // console.log('setSelectedCate : ', JSON.stringify(selectedCate));
        // console.log('setListCates : ', JSON.stringify(listCates));
        // console.log('setParentCate : ', JSON.stringify(parentCate));
        // console.log('selectedCateName : ', selectedCateName);


        // console.log('in use effect EditCategoryModal', JSON.stringify(props.listCates.filter(cate => cate.id === props.selectedCate.pid)[0].name));
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



    async function submitChangeData() {
        ProductsApi.updateCategories({
            name: selectedCateName,
            pid: parentCate ? parentCate.id : null,
            id: selectedCate.id
        }, props.JWT).then((response) => {
            console.log('response : ', response);
            if (response.data.errCode == 0) {
                props.successAlert('Thay đổi thành công');
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