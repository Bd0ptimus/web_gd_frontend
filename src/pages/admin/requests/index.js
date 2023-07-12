import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import HeaderCpn from "@/components/layouts/headerCpn";
import FooterCpn from "@/components/layouts/footerCpn";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Button as PrimeReactButton } from 'primereact/button';
import {
    faPenToSquare,
    faTrash,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Carousel, Dropdown } from "react-bootstrap";
import { connect } from 'react-redux';
import moment from 'moment';


import mainStyles from '../../index.module.scss';
import requestsApi from '@/api/request';
import * as Constants from '@/config/constants/Constants';
import RequestStatusTag from '@/components/elements/admin/request/requestStatusTag';
import ChangeStatusDropdown from '@/components/elements/admin/request/changeStatusDropdown';
function RequestManagerIndex({ data, JWT }) {

    const [requestData, setRequestData] = useState([]);
    const router = useRouter()

    useEffect(() => {
        setRequestData(data.requests.data.requests);
    }, [data]);

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
        router.replace("/admin/requests");
    }

    const itemTemplate = (request) => {
        // console.log('--->check product cate name: ', product.Product_Category);
        return (
            <div className="col-12">
                <div className="flex flex-column l:flex-row l:align-items-start p-4 gap-2">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-1">
                            <div className="text-xl font-bold text-900">{request.requestCode}</div>
                            <div className="text-l font-bold text-500">{moment(request.createdAt).format('HH:mm DD-MM-YYYY')}</div>

                            {/* <PrimeReact.Rating value={product.rating} readOnly cancel={false}></PrimeReact.Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <h6 className="font-bold" style={{ margin: 0, }}>Tên người gửi yêu cầu : </h6>
                                    <span className="font-semibold">{request.name}</span>
                                </span>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <h6 className="font-bold" style={{ margin: 0, }}>Email người gửi yêu cầu : </h6>
                                    <span className="font-semibold">{request.email}</span>
                                </span>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <h6 className="font-bold" style={{ margin: 0, }}>Trạng thái : </h6>
                                    <span className="font-semibold"><RequestStatusTag statusId={request.status}></RequestStatusTag></span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            {/* <div className="text-2xl font-bold text-900">{product.name}</div> */}
                            {/* <PrimeReact.Rating value={product.rating} readOnly cancel={false}></PrimeReact.Rating> */}
                            <div className="block align-items-center gap-3">
                                <h6 style={{ margin: 0, }}>Mô tả : </h6>
                                <span className="font-semibold">{request.des}</span>

                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">

                            {/* <span className="text-2xl font-semibold">{request.request_files}VND</span> */}
                            <div className={`d-block justify-content-end`}>
                                {
                                    request.request_files.map((file, index) => {
                                        return (
                                            <div className={`d-block justify-content-end`}>

                                                <Link href={process.env.NEXT_PUBLIC_APP_BACKEND_URL + file.filePath}>
                                                    {file.filePath}
                                                </Link>
                                            </div>
                                        );
                                    })
                                }

                                <div className={`d-flex justify-content-end m-1`}>

                                    <ChangeStatusDropdown
                                        status={request.status}
                                        requestId={request.id}
                                        errorAlert={(e) => errorAlert(e)}
                                        successAlert={(e) => successAlert(e)}
                                        reloadPage={() => reloadPage()}
                                    />
                                </div>
                                <div className={`d-flex justify-content-end m-1`}>

                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            <FontAwesomeIcon icon={faList} />

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Chỉnh sửa</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2" style={{ color: 'red', }}>Xóa</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
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
                    <DataView value={requestData} itemTemplate={itemTemplate} paginator rows={10} />

                </div>
                <ToastContainer />

                <FooterCpn></FooterCpn>
            </div>
        </>

    )
}

export async function getServerSideProps() {
    let data = {};
    let requests = await requestsApi.getAllRequests();
    console.log('requests : ', requests.data.data.requests);
    data.requests = requests.data;
    return { props: { data } }
}

function mapStateToProps(state) {
    return { JWT: state.system.userJWT };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestManagerIndex);