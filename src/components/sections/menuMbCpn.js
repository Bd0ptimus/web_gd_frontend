import Link from 'next/link';
import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineHome, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';
import { RiMessage2Line } from 'react-icons/ri';
import { BsTelephone, BsWhatsapp } from 'react-icons/bs';


import styles from './menuMb.module.scss';
import { MENUS } from '../../data/menuList';
import FooterCpn from '@/components/layouts/footerCpn';
import * as Constants from '@/config/constants/Constants'
function MenuMbCpn({ userLoggedIn, closeMenu, userRole }) {

    return (
        <div className={`${styles.menuMain} d-block justify-content-center`}>
            <FontAwesomeIcon onClick={() => { closeMenu() }} icon={faXmark} size="2xl" style={{ marginTop: 5, marginLeft: 5, }} />

            {
                MENUS.map((menu, index) => {
                    if (userLoggedIn && userRole == Constants.ROLE_ADMIN) {
                        if (!menu.isParent) {
                            return (
                                <div className={`${styles.menuElement} d-flex justify-content-center`} key={menu.translationId}>
                                    <Link href={menu.path} className={`${styles.menuLink}`}>
                                        <FormattedMessage id={menu.translationId} />
                                    </Link>
                                </div>
                            );
                        }

                    } else {
                        if (!menu.forAdmin) {
                            return (
                                <div className={`${styles.menuElement} d-flex justify-content-center`} key={menu.translationId}>
                                    <Link href={menu.path} className={`${styles.menuLink}`}>
                                        <FormattedMessage id={menu.translationId} />
                                    </Link>
                                </div>
                            );
                        }
                    }


                })
            }
            <hr></hr>
            <div className={`d-block justify-content-center`}>
                <div className={`d-block`}>
                    <p className={`${styles.infoHeader}`} > Tỷ giá:</p>
                    <p className={`${styles.infoText}`}> USD/VND : 23,672.50 VND</p>
                    <p className={`${styles.infoText}`}> USD/RUB : 90,53 RUB </p>
                </div>
                <div className={`d-block`}>
                    <p className={`${styles.infoHeader}`}> Giá cước tham khảo:</p>
                    <p className={`${styles.infoText}`}> 10$/Kg + 10% bảo hiểm</p>
                    <p className={`${styles.infoText}`}> 30$/Kg (không bảo hiểm) </p>


                </div>
            </div>

            <hr></hr>
            <div className={`d-block justify-content-center mb-3`}>
                <div className={`${styles.infoText} d-flex justify-content-center`}>
                    <div >
                        <AiOutlineMail />
                    </div>
                    <span >
                        <span className={`${styles.infoHeader}`}>Email:</span > info@htk.asia
                    </span>
                </div>
                <div className={`${styles.infoText} d-flex justify-content-center`}>
                    <div className={`${styles.icon}`}>
                        <TbWorld />
                    </div>
                    <span>
                        <span className={`${styles.infoHeader}`}>Website:</span> https://htk-asia.com
                    </span>
                </div>
                <div className={`${styles.infoText} d-flex justify-content-center`}>
                    <div className={`${styles.icon}`}>
                        <BsWhatsapp />
                    </div>
                    <span>
                        <span className={`${styles.infoHeader}`}>Whatsapp:</span> +(84) 963 840 005
                    </span>
                </div>
                <div className={`${styles.infoText} d-flex justify-content-center`}>
                    <div className={`${styles.icon}`}>
                        <BsTelephone />
                    </div>
                    <span>
                        <span className={`${styles.infoHeader}`}>Điện thoại(Vi):</span> +(84) 963 840 005
                    </span>
                </div>
                <div className={`${styles.infoText} d-flex justify-content-center`}>
                    <div className={`${styles.icon}`}>
                        <BsTelephone />
                    </div>
                    <span>
                        <span className={`${styles.infoHeader}`}>Điện thoại(Nga):</span> +7 977 800 32-99
                    </span>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        userLoggedIn: state.system.userLoggedIn,
        userRole: state.system.userRole

    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuMbCpn);