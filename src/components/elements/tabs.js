import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from './tabs.module.scss';
function tabs (props) {
    const [optionSelected, setOptionSelected] = useState('');

    useEffect(() => {
        if (props.valueSelect) {
            setOptionSelected(props.valueSelect)
        }
    }, [props.valueSelect])

    function optionSelectedHandler (value) {
        setOptionSelected(value)
        props.response(value)
    }
    return (
        <>
            <div className={`d-flex justify-content-start ${styles.tabsSec}`}>
                {
                    props.options.map((option) => {
                        return (
                            <div className={`col-6 col-md-3 ${styles.tabSec} ${optionSelected == option.value ? styles.tabSelected : ''}`} onClick={() => optionSelectedHandler(option.value)} key={option.value}>
                                <div className={`text-center ${styles.tabText}`}>{option.content}</div>
                            </div>
                        )
                    })
                }
                {/* <div className={`col-6 col-md-3 ${styles.tabSec} ${styles.tabSelected}`}>
                    <div className={`text-center ${styles.tabText}`}> Lớp 10</div>
                </div>
                <div className={`col-6 col-md-3 ${styles.tabSec}`}>
                    <div className={`text-center ${styles.tabText}`}> Lớp 11</div>
                </div>
                <div className={`col-6 col-md-3 ${styles.tabSec}`}>
                    <div className={`text-center ${styles.tabText}`}> Lớp 12</div>
                </div>
                <div className={`col-6 col-md-3 ${styles.tabSec}`}>
                    <div className={`text-center ${styles.tabText}`}> Lớp TSA</div>
                </div> */}
            </div>

        </>
    );
}

export default tabs;