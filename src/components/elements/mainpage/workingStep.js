import Image from 'next/image';
import { FormattedMessage, injectIntl } from 'react-intl';

import styles from './workingStep.module.scss';
import { WORKINGSTEP } from '@/data/workingStep';
function WorkingStep() {

    return (
        <div className={`justify-content-center ${styles.mainContainer}`}>
            {
                WORKINGSTEP.map((item, index) => {
                    return (<div className={`d-block justify-content-center ${styles.elements}`} key={item.translationId}>
                        <div className={`d-flex justify-content-center`}>
                            <Image
                                src={item.imgPath}
                                width={100}
                                height={60}
                                className={`${styles.logo}`}
                                alt="Logo"
                            />
                        </div>

                        <p className={`d-flex justify-content-center`}>
                            <FormattedMessage id={item.translationId} />
                        </p>

                    </div>);
                })
            }

        </div>
    );

}

export default WorkingStep;