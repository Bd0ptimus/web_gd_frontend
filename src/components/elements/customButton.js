import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

function customButton (props) {
    const [buttonText, setButtonText] = useState('');
    const [textColor, setTextColor] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [url, setUrl] = useState('');

    const ref = useRef(null);
    useEffect(() => {
        setButtonText(props.buttonText)
        setTextColor(props.textColor)
        setBgColor(props.backgroundColor)
        setUrl(props.url)
    }, [props])
    return (
        <>
            <Link href={`${url}`} className={`d-flex justify-content-center`} style={{backgroundColor:bgColor, textDecoration:'none', padding:'15px 20px', fontSize:16, fontWeight:600, borderRadius:8}}>
                <p className={`m-0`} style={{color:textColor}}>{buttonText}</p>
            </Link>

        </>
    );
}

export default customButton;