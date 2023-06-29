import { FormattedMessage, injectIntl } from 'react-intl';

import styles from './howWorking.module.scss';

function HowWorking() {
    return (
        <div className={`${styles.howWorkingMain}`}>
            <div>
                <h3 className={`${styles.titleHeader} ${styles.header}`}>  <FormattedMessage id='howWorking.header' /></h3>
            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title1' /> </h5>
                <p>  <FormattedMessage id='howWorking.text11' /></p>
                <p>  <FormattedMessage id='howWorking.text12' /></p>
                <p>  <FormattedMessage id='howWorking.text13' /></p>
                <ul>
                    <li>
                        <p>  <FormattedMessage id='howWorking.text14' /></p>
                    </li>
                    <li>
                        <p>  <FormattedMessage id='howWorking.text15' /></p>
                    </li>
                    <li>
                        <p>  <FormattedMessage id='howWorking.text16' /></p>
                    </li>
                </ul>
            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title2' /> </h5>
                <p>  <FormattedMessage id='howWorking.text21' /></p>

            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title3' /> </h5>
                <p>  <FormattedMessage id='howWorking.text31' /></p>

            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title4' /> </h5>
                <p>  <FormattedMessage id='howWorking.text41' /></p>

            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title5' /> </h5>
                <p>  <FormattedMessage id='howWorking.text51' /></p>

            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title6' /> </h5>
                <p>  <FormattedMessage id='howWorking.text61' /></p>

            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title7' /> </h5>
                <p>  <FormattedMessage id='howWorking.text71' /></p>
                <p>  <FormattedMessage id='howWorking.text72' /></p>


            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title8' /> </h5>
                <p>  <FormattedMessage id='howWorking.text81' /></p>

            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title9' /> </h5>
                <p>  <FormattedMessage id='howWorking.text91' /></p>

            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title10' /> </h5>
                <p>  <FormattedMessage id='howWorking.text101' /></p>

            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title11' /> </h5>
                <p>  <FormattedMessage id='howWorking.text111' /></p>
                <p>  <FormattedMessage id='howWorking.text112' /></p>


            </div>
            <div>
                <h5 className={`${styles.titleHeader} ${styles.title}`}>  <FormattedMessage id='howWorking.title12' /> </h5>
                <p>  <FormattedMessage id='howWorking.text121' /></p>


            </div>

        </div>);
}

export default HowWorking;