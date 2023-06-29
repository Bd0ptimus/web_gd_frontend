import Head from 'next/head'
import Image from 'next/image'
import HeaderCpn from "@/components/layouts/headerCpn";
import FooterCpn from "@/components/layouts/footerCpn";
import { useEffect, useState } from 'react';
import TreeMenu from 'react-simple-tree-menu'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import 'react-simple-tree-menu/dist/main.css';


import mainStyles from '../../index.module.scss';
import ProductsApi from '@/api/products';
import styles from './productCategory.module.scss';
import EditCategoryModal from '@/components/sections/editCategoryModal';
import AddCategoryModal from '@/components/sections/addCategoryModal';
// import './test.css'

function ProductCategoryManager({ data }) {
    const [treeData, setTreeData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalAddShow, setModalAddShow] = useState(false);

    const [selectedCate, setSelectedCate] = useState({});
    const router = useRouter()

    useEffect(() => {
        console.log('check data : ', data.categories.data.data);
        if (data.categories.data.data.length == 0) {
            let tree = [];
        } else {
            var treeVal = data.categories.data.data, tree = function (data, root) {
                return data.reduce(function (o, { id, pid, name, label, key }) {
                    o[id] = o[id] || { id, pid, name, label, key };
                    o[pid] = o[pid] || { id: pid };
                    o[pid].nodes = o[pid].nodes || [];
                    o[pid].nodes.push(o[id]);
                    return o;
                }, {})[root].nodes;
            }(treeVal, null);
            console.log(tree);
        }

        setTreeData(tree);
    }, [data])


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

    function reloadPage() {
        router.push("/admin/products/productCategoryManager");
    }

    return (
        <>
            <div>
                <Head>
                    <title>Quản lý nhóm sản phẩm </title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            </div>
            <div>
                <HeaderCpn></HeaderCpn>
                <div className={`${mainStyles.bodySec}`}>
                    <div style={{ margin: 20 }} className={`d-flex justify-content-center`}>
                        <Button onClick={() => setModalAddShow(true)}>Thêm nhóm sản phẩm</Button>

                    </div>

                    <div>
                        <TreeMenu data={treeData} onClickItem={({ key, label, id, pid }) => {
                            console.log('onclick in tree :', label);
                            setSelectedCate({ id: id, name: label, pid: pid });
                            setModalShow(true);// user defined prop
                        }} />


                    </div>
                </div>
                <EditCategoryModal
                    show={modalShow}
                    selectedCate={selectedCate}
                    listCates={data.categories.data.data}
                    onHide={() => setModalShow(false)}
                    errorAlert={(e) => errorAlert(e)}
                    successAlert={(e) => successAlert(e)}
                    reloadPage={() => reloadPage()}
                />

                <AddCategoryModal
                    show={modalAddShow}
                    listCates={data.categories.data.data}
                    onHide={() => setModalAddShow(false)}
                    errorAlert={(e) => errorAlert(e)}
                    successAlert={(e) => successAlert(e)}
                    reloadPage={() => reloadPage()}
                />
                <ToastContainer />

                <FooterCpn></FooterCpn>


            </div>
        </>);
}

export async function getServerSideProps() {
    let data = {};
    let categories = await ProductsApi.getAllCategories();
    // console.log('test in serverside props : ', JSON.stringify(categories.data.data.data));
    categories.data.data.data.map((item, index) => {
        item.label = item.name;
        item.key = item.id;
    });
    data.categories = categories.data;

    // console.log(data.categories.data.data);
    return { props: { data } }

}

export default ProductCategoryManager;