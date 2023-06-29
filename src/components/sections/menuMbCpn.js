import Link from 'next/link';
import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import styles from './menuMb.module.scss';
import { MENUS } from '../../data/menuList';

function MenuMbCpn({ userLoggedIn }) {

    return (
        <div className={`${styles.menuMain} d-block justify-content-center`}>
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