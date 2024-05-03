import {Input} from "@nextui-org/react";
import { useEffect, useState, useRef } from 'react';

import styles from './selectionV1.module.scss';


function selectionV1 (props) {
    const [valueContent, setValueContent] = useState('');
    const [value, setValue] = useState('');

    const [select, setSelect] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (props.valueSelect) {
            optionSelected(props.valueSelect)
        }
    }, [props.valueSelect])
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setSelect(false);
        }
    };
    document.addEventListener('click', handleClickOutside, true);
    const onChangeHandler = () => {
        setValueContent(valueContent)
    }

    const optionSelected = (optionValue) => {
        const optionSelectedDetail = props.options.find(item => item.value == optionValue)
        console.log('optionSelectedDetail : ', optionSelectedDetail, '--> options : ', props.options)
        setValueContent(optionSelectedDetail?.content)
        setValue(optionSelectedDetail?.value)
        props.response(optionSelectedDetail?.value)
        setTimeout (() => {
            setSelect(false)
        } , 130 );
    }
    return (
        <>
            <div ref={ref} className={`justify-content-center w-100 ${styles.mainSec}`}>
                <Input
                    type="text"
                    label={props.label}
                    labelPlacement='outside'
                    variant="bordered"
                    placeholder={props.placeholder}
                    onClick={() => setSelect(!select)}
                    onChange={() => onChangeHandler()}
                    value={valueContent}
                    endContent={props.endContent}
                />
                {
                    select && (
                        <div className={`${styles.selectionSec}`}>
                            {
                                props.options.map((item) => {
                                    return(
                                        <div className={`d-flex justify-content-center my-1 ${styles.optionsSec}`} key={item.value}>
                                            <div className={`text-center ${styles.optionsCell} ${value == item.value ? styles.optionSelected : ''}`} onClick={() => optionSelected(item.value)}>{item.content}</div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                }
            </div>

        </>
    );
}

export default selectionV1;