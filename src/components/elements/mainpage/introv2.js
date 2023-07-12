import { FormattedMessage, injectIntl } from 'react-intl';
import Image from 'next/image';
import {
    faEarthAmericas,
    faTruckRampBox,
    faFileShield,
    faHandshake,
    faHeadset,
    faMoneyBillWave
} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './intro.module.scss';
import SendPriceRequestModal from '@/components/sections/sendPriceRequestModal';
function IntroV2() {
    const [priceRequestModal, setPriceRequestModal] = useState(false);


    return (
        <div className={`${styles.mainIntro} justify-content-center`}>
            <div className={`d-block justify-content-center ${styles.introContainer}`}>
                <div className={`w-100 d-flex justify-content-center`}>
                    <h3 className={`${styles.introHeading}`}>
                        HTK Asia, đơn vị nhập linh kiện Nga
                    </h3>
                </div>
                <div className={`w-100 d-flex justify-content-center row m-0`}>
                    <div className={` d-flex justify-content-center ${styles.introContainerV2}`}>
                        <div className={` d-flex justify-content-around ${styles.introSmSecV2}`}>
                            <div style={{ height: '50%', }} className={` ${styles.iconSecV2}`}>
                                <FontAwesomeIcon icon={faEarthAmericas} className={` ${styles.primaryIcon}`} />
                            </div>
                            <div style={{ height: '50%', }} className={` ${styles.textSecV2}`}>
                                <h3 className={` ${styles.introTextV2}`}>Đối tác của hơn 100 nhà cung cấp lớn</h3>
                            </div>
                        </div>

                    </div>

                    <div className={` d-flex justify-content-center ${styles.introContainerV2}`}>
                        <div className={` d-flex justify-content-around ${styles.introSmSecV2}`}>
                            <div style={{ height: '50%', }} className={` ${styles.iconSecV2}`}>
                                <FontAwesomeIcon icon={faTruckRampBox} className={` ${styles.primaryIcon}`} />
                            </div>
                            <div style={{ height: '50%', }} className={` ${styles.textSecV2}`}>
                                <h3 className={` ${styles.introTextV2}`}>Giao hàng toàn quốc</h3>
                            </div>
                        </div>

                    </div>

                    <div className={`d-flex justify-content-center ${styles.introContainerV2}`}>
                        <div className={` d-flex justify-content-around ${styles.introSmSecV2}`}>
                            <div style={{ height: '50%', }} className={` ${styles.iconSecV2}`}>
                                <FontAwesomeIcon icon={faFileShield} className={` ${styles.primaryIcon}`} />
                            </div>
                            <div style={{ height: '50%', }} className={` ${styles.textSecV2}`}>
                                <h3 className={` ${styles.introTextV2}`}>Bảo hiểm đơn hàng</h3>
                            </div>
                        </div>

                    </div>

                    <div className={`d-flex justify-content-center ${styles.introContainerV2}`}>
                        <div className={` d-flex justify-content-around ${styles.introSmSecV2}`}>
                            <div style={{ height: '50%', }} className={` ${styles.iconSecV2}`}>
                                <FontAwesomeIcon icon={faHandshake} className={` ${styles.primaryIcon}`} />
                            </div>
                            <div style={{ height: '50%', }} className={` ${styles.textSecV2}`}>
                                <h3 className={` ${styles.introTextV2}`}>Đảm bảo đơn hàng về tận tay quý khách</h3>
                            </div>
                        </div>

                    </div>

                    <div className={`d-flex justify-content-center ${styles.introContainerV2}`}>
                        <div className={` d-flex justify-content-around ${styles.introSmSecV2}`}>
                            <div style={{ height: '50%', }} className={` ${styles.iconSecV2}`}>
                                <FontAwesomeIcon icon={faHeadset} className={` ${styles.primaryIcon}`} />
                            </div>
                            <div style={{ height: '50%', }} className={` ${styles.textSecV2}`}>
                                <h3 className={` ${styles.introTextV2}`}>Tư vấn, hỗ trợ 24/7</h3>
                            </div>
                        </div>

                    </div>

                    <div className={` d-flex justify-content-center ${styles.introContainerV2}`}>
                        <div className={` d-flex justify-content-around ${styles.introSmSecV2}`}>
                            <div style={{ height: '50%', }} className={` ${styles.iconSecV2}`}>
                                <FontAwesomeIcon icon={faMoneyBillWave} className={` ${styles.primaryIcon}`} />
                            </div>
                            <div style={{ height: '50%', }} className={` ${styles.textSecV2}`}>
                                <h3 className={` ${styles.introTextV2}`}>Thanh toán linh hoạt</h3>
                            </div>
                        </div>

                    </div>



                </div>
            </div>
            <ToastContainer />

        </div >
    );
}

export default IntroV2;