'use client'

import Link from 'next/link';
import Image from 'next/image';
import styles from './zaloButton.module.scss';
import useAxiosRequest from '@/helpers/axiosRequest';
function ZaloButton() {

    return (
        <div className={`${styles.buttonSec}`} style={{width:50, height:50,position:'fixed',bottom:20,right:20,borderRadius:'50%', zIndex:2000}}>
            <Link href="https://zalo.me/0876034555" target="_blank">
                <Image src="/logo/zalo.jpg" height={50} width={50} style={{borderRadius:'50%'}}>
                </Image>
            </Link>
        </div>
    
    );
}

export default ZaloButton;
