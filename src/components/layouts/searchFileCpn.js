import {
    Button,
    Input
} from "@nextui-org/react";
import {
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, useState } from 'react';
import ToastCpn from "./toastCpn";
import filesApi from "@/api/file";
import { useRouter } from 'next/router';
import useAxiosRequest from '@/helpers/axiosRequest'
function SearchFileCpn(props) {
    const axiosRequest = useAxiosRequest()
    const router = useRouter()
    const [fileNumber, setFileNumber] = useState(null)

    const findFileHandler = async () => {
        if (fileNumber == null) {
            ToastCpn.toastWarning('Hãy nhập mã số file');
            return
        }
        const fileResponse = await axiosRequest.axiosGet(`/api/file/get-file/${fileNumber}`);
        if (fileResponse.status == 200 && fileResponse.errCode == 0) {
            router.replace(`/${fileNumber}`);
        } else {
            ToastCpn.toastWarning('không tìm thấy file với mã số : ' + fileNumber);
        }
    }
    return (
        <>
            <div className="py-4">
                <div className="d-flex justify-content-start">
                    <div className="col-md-2 col-6">
                        <Input
                            size="xs"
                            underlined
                            labelPlaceholder="Default"
                            color="default"
                            label="Mã số file"
                            type="number"
                            onChange = {(e) => setFileNumber(e.target.value)}/>

                    </div>
                    <Button
                        startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                        onClick={findFileHandler}
                    >
                        Tìm File
                    </Button>
                </div>
            </div>
            <ToastCpn/>
        </>
    );
}

export default SearchFileCpn;