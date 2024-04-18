import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google';
import { connect } from 'react-redux';
import { useState, useEffect, useRef, useLayoutEffect  } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpload,
    faQrcode,
    faCircleCheck,
    faCircleXmark,
    faDownload, 
    faTrash,
    faMagnifyingGlass,
    faPenToSquare,
    faPlay,
    faStop
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
    Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { Scanner } from '@yudiel/react-qr-scanner';
import Box from "@mui/material/Box";
import * as XLSX from "xlsx";

import * as Constants from '@/config/constants/Constants';
import ToastCpn from '@/components/layouts/toastCpn';
import SearchFileCpn from '@/components/layouts/searchFileCpn';
import useCommonFunction from '@/helpers/commonFunction';
import {ssrAxiosGet} from '@/helpers/ssrAxiosRequest';
import useAxiosRequest from '@/helpers/axiosRequest';
import Instruction from '@/components/sections/instruction';
import UpdateKizModal from '@/components/sections/updateKizModal';
function Extend({ data }) {
    return (
        <>
            <div className="d-block justify-content-center" style={{paddingTop:250, paddingBottom:350}}>
                <div className="d-flex justify-content-center text-center">
                    Vui lòng liên hệ với admin của chúng tôi để được tư vấn gia hạn
                </div>

                <div className="d-flex justify-content-center">
                    <p className="text-center my-0 mx-2">
                        <a href="tel:+79859817817">+7 (985) 981 78 17</a>
                    </p>
                </div>

                <div className="d-flex justify-content-center">
                    <p style={{ fontSize: 12 }}> <Link href="https://www.facebook.com/nvt3591?mibextid=LQQJ4d">Trongnguyen</Link></p>
                </div>
            </div>
            
        </>
    )
}


export default Extend;