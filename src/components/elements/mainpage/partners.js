import Image from 'next/image';
import { FormattedMessage, injectIntl } from 'react-intl';

import styles from './partners.module.scss';
import { PARTNERS } from '@/data/partners';
function Partners() {
    return (
        <div className={`${styles.partnerMain} d-block justify-content-center`}>
            <div className={`d-flex justify-content-center`}>
                <h3>
                    <FormattedMessage id="partner.heading" />
                </h3>
            </div>
            <div className={`${styles.partnerImgSec} justify-content-center`}>
                {
                    PARTNERS.map((item, index) => {
                        return (
                            <div className={`d-flex justify-content-around`} key={item.id}>
                                <Image
                                    src={item.path}
                                    width={200}
                                    height={200}
                                    className={`${styles.imgSec}`}
                                    alt="Logo"
                                />

                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Partners;