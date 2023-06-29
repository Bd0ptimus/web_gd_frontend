import { useState, useEffect } from 'react';

import styles from './requestStatusTag.module.scss';
import * as Constants from '@/config/constants/Constants';

function RequestStatusTag({ statusId }) {
    const [tagName, setTagName] = useState('');
    const [tagColor, setTagColor] = useState('');

    useEffect(() => {
        console.log(statusId);
        const statusData = Constants.REQUEST_STATUS_SLUG.filter((item) => item.id == statusId);
        console.log('RequestStatusTag : ', statusData);
        setTagName(statusData[0] ? statusData[0].slug : '');
        setTagColor(statusData[0] ? statusData[0].tagColor : '');
    }, [statusId])


    return (
        <div className={`${styles.tagMain}`} style={{ backgroundColor: tagColor }}>
            {tagName}
        </div>
    );
}

export default RequestStatusTag;