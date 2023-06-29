import { FormattedMessage, injectIntl } from 'react-intl';
import Image from 'next/image';
import {
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './intro.module.scss';
import SendPriceRequestModal from '@/components/sections/sendPriceRequestModal';
function Intro() {
    const [priceRequestModal, setPriceRequestModal] = useState(false);

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
        <div className={`${styles.mainIntro} justify-content-center`}>
            <div className={`d-block justify-content-center`}>
                <div className={`w-100 d-flex justify-content-center`}>
                    <h3 className={`${styles.introHeading}`}>
                        <FormattedMessage id='intro.heading' />
                    </h3>
                </div>
                <div className={`${styles.introSec}`}>
                    <div className={`${styles.introColumn} d-flex justify-content-center`}>
                        <Image
                            src="/logo/main/intro/01.webp"
                            width={700}
                            height={500}
                            className={`${styles.imgSec}`}
                            alt="Logo"
                        />
                    </div>
                    <div className={`${styles.introColumn} ${styles.introTextSec} justify-content-center`}>
                        <div className={`d-block justify-content-center ${styles.introColumnSec}`}>
                            <div className={`d-flex justify-content-start ${styles.introText}`}>
                                <FontAwesomeIcon icon={faCheck} className={` ${styles.fontIcon}`} />

                                <h5 className={` ${styles.introText}`}>
                                    &ensp;<FormattedMessage id='intro.text1' />
                                </h5>

                            </div>
                            <div className={`d-flex justify-content-start ${styles.introText}`}>
                                <FontAwesomeIcon icon={faCheck} className={` ${styles.fontIcon}`} />

                                <h5 className={` ${styles.introText}`}>
                                    &ensp;<FormattedMessage id='intro.text2' />
                                </h5>

                            </div>
                            <div className={`d-flex justify-content-start ${styles.introText}`}>
                                <FontAwesomeIcon icon={faCheck} className={` ${styles.fontIcon}`} />

                                <h5 className={` ${styles.introText}`}>
                                    &ensp;<FormattedMessage id='intro.text3' />
                                </h5>

                            </div>
                            <div className={`d-flex justify-content-start ${styles.introText}`}>
                                <FontAwesomeIcon icon={faCheck} className={` ${styles.fontIcon}`} />

                                <h5 className={` ${styles.introText}`}>
                                    &ensp;<FormattedMessage id='intro.text4' />
                                </h5>

                            </div>
                            <div className={`d-flex justify-content-start ${styles.introText}`}>
                                <FontAwesomeIcon icon={faCheck} className={` ${styles.fontIcon}`} />

                                <h5 className={` ${styles.introText}`}>
                                    &ensp;<FormattedMessage id='intro.text5' />
                                </h5>

                            </div>

                            <div className={`d-flex ${styles.introText} ${styles.sendRequestSec}`}>
                                <div className={`${styles.sendRequestBtn}`} onClick={() => setPriceRequestModal(true)}>
                                    <h5>Gửi yêu cầu báo giá</h5>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <SendPriceRequestModal
                show={priceRequestModal}
                onHide={() => setPriceRequestModal(false)}
                errorAlert={(e) => errorAlert(e)}
                successAlert={(e) => successAlert(e)}

            />
            <ToastContainer />

        </div>
    );
}

export default Intro;