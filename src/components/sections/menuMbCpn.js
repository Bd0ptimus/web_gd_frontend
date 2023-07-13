import Link from 'next/link';
import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './menuMb.module.scss';
import { MENUS } from '../../data/menuList';

function MenuMbCpn({ userLoggedIn, closeMenu }) {

    return (
        <div className={`${styles.menuMain} d-block justify-content-center`}>
            <FontAwesomeIcon onClick={() => { closeMenu() }} icon={faXmark} size="2xl" style={{ marginTop: 5, marginLeft: 5, }} />

            {
                MENUS.map((menu, index) => {
                    if (userLoggedIn) {
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
                    <p className={`${styles.infoText}`}> Theo cân : 15$/Kg</p>
                    <p className={`${styles.infoText}`}> Bảo hiểm : 10% </p>

                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return { userLoggedIn: state.system.userLoggedIn };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuMbCpn);