import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google';
import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpload,
    faQrcode,
    faCircleCheck,
    faCircleXmark,
    faDownload, 
    faTrash,
    faMagnifyingGlass
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
    Input,
    Link,
    Chip } from "@nextui-org/react";
import { Scanner } from '@yudiel/react-qr-scanner';
import Box from "@mui/material/Box";
import * as XLSX from "xlsx";
import { useRouter } from 'next/router';

import * as Constants from '@/config/constants/Constants';
import FooterCpn from '@/components/layouts/footerCpn';
import ToastCpn from '@/components/layouts/toastCpn';
import SearchFileCpn from '@/components/layouts/searchFileCpn';
const inter = Inter({ subsets: ['latin'] })
import useCommonFunction from '@/helpers/commonFunction';
import HeaderCpn from '@/components/layouts/headerCpn';
import Instruction from '@/components/sections/instruction';
import {ssrAxiosGet} from '@/helpers/ssrAxiosRequest';
import CreateAccountModal from '@/components/sections/createAccountModal'
import EditAccountModal from '@/components/sections/editAccountModal'
function AccountManager({ data }) {
    const router = useRouter()
    const commonFunction = useCommonFunction();
    const [users, setUsers] = useState([]);
    const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);
    const [openEditAccountModal, setOpenEditAccountModal] = useState(false)
    const [userSelected, setUserSelected] = useState({})
    useEffect(() => {
        setUsers(data.users)
    }, [data.users])

    const columns = [
        { name: "Tên", uid: "name" },
        { name: "Email", uid: "email" },
        { name: "Mật khẩu", uid: "password" },
        { name: "Trạng thái", uid: "status" },
        { name: "Thao tác", uid: "action" },

    ];

    const statusColorMap = {
        active: "success",
        blocked: "danger",
    };

    function closeCreateAccountModalHandler () {
        setOpenCreateAccountModal(false)
        router.replace("/admin/account");
    }
    function openCreateAccountModalHandler () {
        setOpenCreateAccountModal(true)
    }

    function openEditAccountModalHandler (userId) {
        try {
            const user = users.find(user => user.id === userId)
            setUserSelected(user)
            setOpenEditAccountModal(true)
        } catch (e) {
            ToastCpn.toastWarning('Đã có lỗi xảy ra');
        }
    }

    function closeEditAccountModalHandler () {
        setOpenEditAccountModal(false)
        router.replace("/admin/account");
    }


    return (
        <>
            <div className={`mt-5`}>
                <Head>
                    <title>Hỗ trợ quét mã kiz </title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
            </div>
            <div>
                <div className="container py-4" style={{minHeight: '85vh'}}>
                    <div className="py-4">
                        <div  className="d-flex justify-content-between">
                            <Button
                                variant="bordered"
                                onClick = {() => openCreateAccountModalHandler()}
                            >
                                Thêm tài khoản
                            </Button>
                        </div>
                    </div>
                    
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
                                users.map((item) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <p className="text-bold text-sm capitalize">{item.name}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <p className="text-bold text-sm capitalize">{item.email}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <p className="text-bold text-sm capitalize">{item.password}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Chip className="capitalize" color={statusColorMap[item.status]} size="sm" variant="flat">
                                                    {item.status}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <div className="relative flex items-center gap-2">
                                                    <Button variant="bordered"
                                                    onClick={() => openEditAccountModalHandler(item.id)}>Thay đổi thông tin</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <ToastCpn/>
                    <CreateAccountModal 
                        show={openCreateAccountModal}
                        onHide={() => closeCreateAccountModalHandler()}/>
                    <EditAccountModal
                        data = {userSelected}
                        show={openEditAccountModal}
                        onHide={() => closeEditAccountModalHandler()}
                    />
                </div>
            </div>
        </>
    )
}
export async function getServerSideProps(context) {
    const accountRes = await ssrAxiosGet(context, `/api/account/get-accounts`);
    if (accountRes.errCode != 0) {
        res.writeHead(302, { Location: '/error404' });
        res.end();
        return null
    }
    const data = accountRes.data
    return { props: { data } }
}

export default AccountManager;