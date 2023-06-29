import { FormattedMessage, injectIntl } from 'react-intl';
import {
    faUserPlus,
    faEarthAmericas,
    faFileCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './overview.module.scss';

function Overview() {
    return (
        <div className={`${styles.overviewMain} justify-content-around`}>
            <div className={`${styles.overviewSec} justify-content-center`}>
                <div className={`${styles.innerSec} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center`}>
                        <FontAwesomeIcon icon={faUserPlus} className={` ${styles.icon}`} />

                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <h6 className={` ${styles.text}`}>
                            <FormattedMessage id="overview.title1" />
                        </h6>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <h6 className={` ${styles.text}`}>
                            <FormattedMessage id="overview.text1" />
                        </h6>
                    </div>
                </div>


            </div>
            <div className={`${styles.overviewSec}  justify-content-center`}>
                <div className={`${styles.innerSec} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center`}>
                        <FontAwesomeIcon icon={faEarthAmericas} className={` ${styles.icon}`} />

                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <h6 className={` ${styles.text}`}>
                            <FormattedMessage id="overview.title2" />
                        </h6>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <h6 className={` ${styles.text}`}>
                            <FormattedMessage id="overview.text2" />
                        </h6>
                    </div>
                </div>


            </div>
            <div className={`${styles.overviewSec}  justify-content-center`}>
                <div className={`${styles.innerSec} d-block justify-content-center`}>
                    <div className={`d-flex justify-content-center`}>
                        <FontAwesomeIcon icon={faFileCircleCheck} className={` ${styles.icon}`} />

                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <h6 className={` ${styles.text}`}>
                            <FormattedMessage id="overview.title3" />
                        </h6>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <h6 className={` ${styles.text}`}>
                            <FormattedMessage id="overview.text3" />
                        </h6>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Overview;