import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TreeMenu from 'react-simple-tree-menu'
import 'react-simple-tree-menu/dist/main.css';
import { Carousel } from "react-bootstrap";
import {
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './productElement.module.scss';

function ProductElement({ name, cate, urls, price, wholeSalePrice }) {
    // console.log(urls);
    return (
        <div className={`${styles.productElement} d-block justify-content-center`}>
            <div style={{ width: '100%', height: 70, marginTop: 5, marginBottom: 5 }} className={`d-block justify-content-center `}>
                <p style={{ margin: 2, }} className={`${styles.productName}`}> {name}</p>
                <p style={{ margin: 2, }} className={`${styles.productCategory}`}>  {cate}</p>
            </div>
            <div style={{ width: '100%', height: 200, marginTop: 5, marginBottom: 5 }} className={`d-block justify-content-center`}>
                <Carousel>
                    {
                        urls.length == 0
                            ?
                            <Carousel.Item style={{ width: '100%', height: 200 }} interval={4000}>

                                <img
                                    alt="Mountains"
                                    src={`/logo/logo_vert.webp`}
                                    // fill
                                    // sizes="100%"
                                    // placeholder="blur"
                                    // quality={10}
                                    // blurDataURL={`/logo/logo_vert.webp`}
                                    style={{
                                        objectFit: 'cover', // cover, contain, none
                                    }}
                                />
                            </Carousel.Item>

                            : urls.map((img, index) => {
                                return (
                                    <Carousel.Item style={{ width: '100%', height: 200 }} interval={4000}>

                                        <Image
                                            alt="Mountains"
                                            src={process.env.NEXT_PUBLIC_APP_BACKEND_URL + img.path}
                                            fill
                                            sizes="100%"
                                            placeholder="blur"
                                            quality={10}
                                            blurDataURL={`/logo/logo_vert.webp`}
                                            style={{
                                                objectFit: 'cover', // cover, contain, none
                                            }}
                                        />
                                    </Carousel.Item>

                                );
                            })
                    }

                    {/* <img src={`/logo/logo_vert.webp`} style={{ width: '100%', height: 200 }} alt="slides" /> */}
                </Carousel>
            </div>
            <div style={{ width: '100%', height: 20, marginTop: 10, marginBottom: 10 }} className={`d-flex justify-content-center ${styles.productPrice}`}>
                <p style={{ margin: 0, }}> Giá lẻ : {price ? price.toLocaleString("en-US") : 0} VND</p>
            </div>
            <div style={{ width: '100%', height: 20, marginTop: 10, marginBottom: 10 }} className={`d-flex justify-content-center ${styles.productPrice}`}>
                <p style={{ margin: 0, }}> Giá sỉ : {wholeSalePrice ? wholeSalePrice.toLocaleString("en-US") : 0} VND</p>
            </div>
            {/* <div style={{ width: '100%', height: 40, marginTop: 10, marginBottom: 10 }} className={`d-flex justify-content-center`}>
                <div className={`d-flex justify-content-center ${styles.cartIcon}`}>
                    <FontAwesomeIcon icon={faCartShopping} />

                </div>
            </div> */}
        </div>
    );
}

export default ProductElement;