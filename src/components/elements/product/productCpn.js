import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TreeMenu from 'react-simple-tree-menu'
import 'react-simple-tree-menu/dist/main.css';
import {
    faFileExcel,
    faFileArrowUp,
    faList,
    faXmark,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ProductsApi from '@/api/products';
import styles from './index.module.scss';
import ProductElement from '@/components/elements/product/productElement';
import SendPriceRequestModal from '@/components/sections/sendPriceRequestModal';
import * as Utils from '@/utils';
import SearchRequestOrderModal from '@/components/sections/searchRequestOrderModal';
function ProductCpn({ data, styleProps }) {
    const [treeData, setTreeData] = useState([]);
    const [page, setPage] = useState(1)
    const [categoryChoose, setCategoryChoose] = useState(null);
    const [productData, setProductData] = useState([]);
    const [numberProduct, setNumberProduct] = useState(0);
    const [filterListOpen, setFilterListOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [priceRequestModal, setPriceRequestModal] = useState(false);
    useEffect(() => {
        setProductData(data.products.data.products.rows);
        setNumberProduct(data.totalProducts);
        let tree = []
        if (data.categories.data.data.length == 0) {
            tree = [];

        } else {
            tree = Utils.listToTree(data.categories.data.data);

            tree.unshift({
                id: null,
                pid: null,
                name: 'Tất cả',
                label: 'Tất cả',
                key: null,
            })
        }
        setTreeData(tree);
        const input = document.querySelector("input[class=rstm-search]");
        input.setAttribute("placeholder", "Nhóm sản phẩm");


    }, [data]);



    async function changePageHandler(page) {
        let products = await ProductsApi.getAllProductsPagination(page, categoryChoose);
        setProductData(products.data.data.products.rows);
        setNumberProduct(products.data.data.products.count);

    }

    async function setSelectedCate(data) {
        setCategoryChoose(data.id);
        setPage(1);
        let products = await ProductsApi.getAllProductsPagination(page, data.id);
        setProductData(products.data.data.products.rows);
        setNumberProduct(products.data.data.products.count);

    }

    function errorAlert(message) {
        toast.warning(`${message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function successAlert(message) {
        toast.success(`${message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }


    return (
        <>
            <div className={`${styles.productPage}`}>
                <div className={`${styles.categorySec}`}>
                    <div className={`${styles.sendRequest}`}>
                        <div onClick={() => setPriceRequestModal(true)} className={`d-flex justify-content-start ${styles.sendRequestButton}`} >
                            <FontAwesomeIcon icon={faFileArrowUp} />
                            <h6 style={{ margin: 0, padding: 2, }}>Gửi yêu cầu báo giá</h6>
                        </div>
                    </div>
                    <div className={`${styles.sendRequest}`}>
                        <div onClick={() => setSearchModalOpen(true)} className={`d-flex justify-content-start ${styles.sendRequestButton}`} >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <h6 style={{ margin: 0, padding: 2, }}>Tra cứu tình trạng đơn hàng</h6>
                        </div>
                    </div>
                    <div className={`${styles.filterSec}`} style={styleProps}>
                        <div className={`d-flex justify-content-center ${styles.filterElement} `} onClick={() => setFilterListOpen(!filterListOpen)}>
                            <FontAwesomeIcon icon={faList} />
                        </div>
                        <div className={`d-flex justify-content-center ${styles.filterElement}`} onClick={() => setPriceRequestModal(true)}>
                            <FontAwesomeIcon icon={faFileArrowUp} />
                        </div>

                        <div className={`d-flex justify-content-center ${styles.filterElement}`} onClick={() => setSearchModalOpen(true)}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div>
                    <div className={`${styles.filterCategoryList}`}>
                        <TreeMenu data={treeData} onClickItem={({ key, label, id, pid }) => {
                            console.log('onclick in tree :', label);
                            setSelectedCate({ id: id, name: label, pid: pid });
                        }} />
                    </div>

                    <div className={`${styles.filterCategoryListMb}`} style={{ display: filterListOpen ? 'block' : 'none' }}>
                        <div className={`d-flex justify-content-end`}>
                            <FontAwesomeIcon icon={faXmark} size="2xl" style={{ fontSize: 40, }} onClick={() => setFilterListOpen(!filterListOpen)} />
                        </div>
                        <TreeMenu data={treeData} onClickItem={({ key, label, id, pid }) => {
                            console.log('onclick in tree :', label);
                            setSelectedCate({ id: id, name: label, pid: pid });
                        }} />
                    </div>
                </div>

                <div className={`${styles.productSec} d-block justify-content-center`}>
                    <div className={`${styles.productElementSec} d-flex justify-content-center`}>
                        {
                            productData.map((item, index) => {
                                return (
                                    <ProductElement name={item.name} cate={item.Product_Category ? item.Product_Category.name : ''} urls={item.Product_Attachments ? item.Product_Attachments : []} price={item.price} wholeSalePrice={item.wholeSalePrice} />
                                );
                            })
                        }
                    </div>
                    <div className={` d-flex justify-content-center`}>
                        <PaginationControl
                            page={page}
                            between={4}
                            total={Math.floor(numberProduct / process.env.NEXT_PUBLIC_APP_PRODUCT_USER_PAGINATION_OFFSET)}
                            limit={1}
                            changePage={(page) => {
                                setPage(page);
                                changePageHandler(page);
                                console.log(page)
                            }}
                            ellipsis={1}
                        />

                    </div>
                </div>
            </div >

            <SendPriceRequestModal
                show={priceRequestModal}
                onHide={() => setPriceRequestModal(false)}
                errorAlert={(e) => errorAlert(e)}
                successAlert={(e) => successAlert(e)}

            />

            <SearchRequestOrderModal
                show={searchModalOpen}
                onHide={() => setSearchModalOpen(false)}
                errorAlert={(e) => errorAlert(e)}
                successAlert={(e) => successAlert(e)}
            />

            <ToastContainer />

        </>);
}



export default ProductCpn;