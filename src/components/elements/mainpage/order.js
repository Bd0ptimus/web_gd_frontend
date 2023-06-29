import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage, injectIntl } from 'react-intl';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import styles from './order.module.scss';
import requestsApi from '@/api/request';
import CheckRequestDataModal from '@/components/sections/checkRequestDataModal';
function Order() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [note, setNote] = useState('');
    const [requestCode, setRequestCode] = useState('');
    const [requestShow, setRequestShow] = useState(false);
    const [requestData, setRequestData] = useState({});

    async function handleClickForm() {
        // if (name == '' || email == '' || note == '') {
        //     toast.warning("Vui lòng nhập đầy đủ thông tin!", {
        //         position: toast.POSITION.TOP_RIGHT
        //     })
        // } else {
        //     console.log('abc1');

        //     toast.success("Thông tin đã được gửi!", {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        //     setName('');
        //     setEmail('');
        //     setNote('');
        // }

        if (requestCode == '') {
            toast.warning("Vui lòng nhập đầy đủ thông tin!", {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            requestsApi.getRequestData(requestCode).then((response) => {
                console.log('response : ', response);
                if (response.data.errCode == 0) {
                    successAlert('Đã tìm thấy yêu cầu của bạn');
                    setRequestData(response.data.data.request);
                    setRequestShow(true);
                } else {
                    errorAlert('Không tìm thấy yêu cầu của bạn!');
                }
            }).catch((e) => {
                errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
                console.log(e)

            });
        }
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
            <div className={`${styles.orderMain} d-block justify-content-center`}>
                <h3>Kiểm tra với mã yêu cầu báo giá</h3>
                <div className={`d-flex justify-content-center`}>
                    <div className={`d-block justify-content-center ${styles.inputForm}`}>
                        <input onChange={(e) => setRequestCode(e.target.value)} placeholder='Mã yêu cầu' />
                        {/* <input onChange={(e) => setEmail(e.target.value)} placeholder='Email liên hệ' />
                        <textarea onChange={(e) => setNote(e.target.value)} placeholder='Ghi chú' ></textarea> */}
                        <div className={`d-flex justify-content-center`}>
                            <button onClick={() => handleClickForm()}>Gửi</button>

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.wave}>
                <div className={`d-flex justify-content-start ${styles.imgSec}`}>
                    <Image
                        src="/logo/logo_vert.webp"
                        width={200}
                        height={200}
                        alt="Logo"
                    />
                </div>
            </div>
            <CheckRequestDataModal
                requestData={requestData}
                show={requestShow}
                onHide={() => setRequestShow(false)}
                errorAlert={(e) => errorAlert(e)}
                successAlert={(e) => successAlert(e)}
            />
            <ToastContainer />

        </>

    );

}

export default Order;