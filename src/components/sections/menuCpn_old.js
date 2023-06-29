import Link from 'next/link';
import React, { Component, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import styles from './menu.module.scss';
import { MENUS } from '../../data/menuList';

function MenuCpn({ userLoggedIn }) {
    return (
        <div className={`${styles.menuMain}  justify-content-end`}>
            {
                MENUS.map((menu, index) => {
                    if (userLoggedIn) {
                        return (
                            <div className={`${styles.menuElement} d-flex justify-content-center`} key={menu.translationId}>
                                <Link href={menu.path} className={`${styles.menuLink}`}>
                                    <FormattedMessage id={menu.translationId} />
                                </Link>
                            </div>
                        );
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuCpn);