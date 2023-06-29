import Head from 'next/head'
import Image from 'next/image'
import HeaderCpn from "@/components/layouts/headerCpn";
import FooterCpn from "@/components/layouts/footerCpn";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { DataView } from 'primereact/dataview';
import { Button as PrimeReactButton } from 'primereact/button';
import {
    faPenToSquare,
    faTrash,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'primeflex/primeflex.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import { Carousel } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';


import mainStyles from '../../index.module.scss';
import ProductsApi from '@/api/products';
import AddProductModal from '@/components/sections/addProductModal';
import EditProductModal from '@/components/sections/editProductModal';
import ProductApi from '@/api/products';
function ProductsManager({ data, JWT }) {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [modalAddShow, setModalAddShow] = useState(false);
    const router = useRouter()

    useEffect(() => {
        //setSelectedProduct({});
    }, []);

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
        router.replace("/admin/products/productManager");
    }

    function editProductHandler(productId) {
        setSelectedProduct(data.products.data.data.filter((item) => item.id == productId)[0]);
        console.log(selectedProduct);
        setModalShow(true);
    }

    async function deleteProductHandler(productId) {
        ProductApi.deleteProduct(productId, JWT).then((response) => {
            console.log('response : ', response);
            if (response.data.errCode == 0) {
                successAlert('Xóa sản phẩm thành công');
                reloadPage();
            } else {
                errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
            }
        }).catch((e) => {
            errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
            console.log(e)

        });
    }

    const itemTemplate = (product) => {
        // console.log('--->check product cate name: ', product.Product_Category);
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-2">

                    <div className={`w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round`}>
                        <Carousel>
                            {product.Product_Attachments.map((item) => (
                                <Carousel.Item key={item.id} style={{ width: 200, height: 200 }} interval={4000}>
                                    {/* <img src={process.env.NEXT_PUBLIC_APP_BACKEND_URL + item.path} style={{ width: 200, height: 200 }} alt="slides" /> */}
                                    <img
                                        alt="Products"
                                        src={process.env.NEXT_PUBLIC_APP_BACKEND_URL + item.path}
                                        // fill
                                        // sizes="100%"
                                        // placeholder="blur"
                                        // quality={10}
                                        // blurDataURL={`/logo/logo_vert.webp`}
                                        style={{
                                            objectFit: 'cover', // cover, contain, none
                                        }}
                                    />

                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>

                    {/* <Image
                        src={product.Product_Attachments[0] ? process.env.NEXT_PUBLIC_APP_BACKEND_URL + product.Product_Attachments[0].path : "/logo/logo.webp"}
                        width={100}
                        height={100}
                        className={`w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round`}
                        alt="Logo"
                    /> */}
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.name}`} alt={product.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            {/* <PrimeReact.Rating value={product.rating} readOnly cancel={false}></PrimeReact.Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <h6 style={{ margin: 0, }}>Nhóm sản phẩm : </h6>
                                    <span className="font-semibold">{product.Product_Category ? product.Product_Category.name : ''}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            {/* <div className="text-2xl font-bold text-900">{product.name}</div> */}
                            {/* <PrimeReact.Rating value={product.rating} readOnly cancel={false}></PrimeReact.Rating> */}
                            <div className="block align-items-center gap-3">
                                <h6 style={{ margin: 0, }}>Mô tả : </h6>
                                <span className="font-semibold">{product.des}</span>

                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-l font-semibold">Giá lẻ: {product.price ? product.price.toLocaleString("en-US") : 0}VND</span>
                            <span className="text-l font-semibold">Giá sỉ : {product.wholeSalePrice ? product.wholeSalePrice.toLocaleString("en-US") : 0}VND</span>

                            <div className={`d-flex justify-content-end`}>
                                <PrimeReactButton className="p-button-rounded" onClick={() => editProductHandler(product.id)} style={{ backgroundColor: '#1D71B9', border: '0px' }}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </PrimeReactButton>
                                <PrimeReactButton className="p-button-rounded" onClick={() => deleteProductHandler(product.id)} style={{ backgroundColor: 'red', border: '0px' }}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </PrimeReactButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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
                <div className={`${mainStyles.bodySec}`} >
                    <div className={`d-flex justify-content-center`} style={{ margin: 20 }}>
                        <PrimeReactButton className="p-button-rounded" onClick={() => setModalAddShow(true)} style={{ backgroundColor: '#1db937', border: '0px' }}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm sản phẩm
                        </PrimeReactButton>
                    </div>
                    <div className="card">
                        <DataView value={data.products.data.data} itemTemplate={itemTemplate} paginator rows={10} />
                    </div>
                </div>


                <AddProductModal
                    show={modalAddShow}
                    listCates={data.categories.data.data}
                    onHide={() => setModalAddShow(false)}
                    errorAlert={(e) => errorAlert(e)}
                    successAlert={(e) => successAlert(e)}
                    reloadPage={() => reloadPage()}
                />

                <EditProductModal
                    selectedProduct={selectedProduct}
                    show={modalShow}
                    listCates={data.categories.data.data}
                    onHide={() => setModalShow(false)}
                    errorAlert={(e) => errorAlert(e)}
                    successAlert={(e) => successAlert(e)}
                    reloadPage={() => reloadPage()}
                />
                <ToastContainer />

                <FooterCpn></FooterCpn>


            </div>
        </>

    )
}

export async function getServerSideProps() {
    let data = {};
    let products = await ProductsApi.getAllProducts();
    let categories = await ProductsApi.getAllCategories();

    // console.log('test getServerSideProps in serverside props : ', JSON.stringify(products.data.data.data));
    // categories.data.data.data.map((item, index) => {
    //     item.label = item.name;
    //     item.key = item.id;
    // });
    data.products = products.data;
    data.categories = categories.data;

    // console.log(data.categories.data.data);
    return { props: { data } }

}

function mapStateToProps(state) {
    return { JWT: state.system.userJWT };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsManager);