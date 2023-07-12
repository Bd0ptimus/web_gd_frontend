import Link from 'next/link';
import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
    faCaretDown,
    faCaretUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './menu.module.scss';
import { MENUS } from '../../data/menuList';

function MenuCpn({ userLoggedIn }) {
    const [menu1, setMenu1] = useState(false);

    useEffect(() => {

    }, MENUS)

    function setMenuOpen(index) {
        switch (index) {
            case 1:
                setMenu1(!menu1);
                break;
        }
    }

    function getMenuOpen(index) {
        switch (index) {
            case 1:
                return menu1;
                break;
        }
    }

    return (
        <div className={`${styles.menuMain}  justify-content-start`}>
            {

                MENUS.map((menu, index) => {
                    if (userLoggedIn) {
                        if (menu.isParent) {

                            return (
                                <div className={`${styles.menuElement} d-block justify-content-center`} key={menu.translationId}>
                                    <div className={`${styles.menuLink}`} onClick={() => setMenuOpen(menu.id)}>
                                        <FormattedMessage id={menu.translationId} />&nbsp;
                                        <FontAwesomeIcon icon={getMenuOpen(menu.id) ? faCaretUp : faCaretDown} />

                                    </div>

                                    <div className={` justify-content-center`} style={{ display: getMenuOpen(menu.id) ? 'block' : 'none', backgroundColor: 'white', }}>
                                        {
                                            menu.childs.map((child, i) => {
                                                return (<div className={`d-flex justify-content-center`}>
                                                    <Link href={child.path} className={`${styles.menuLink}`}>
                                                        <FormattedMessage id={child.translationId} />
                                                    </Link>
                                                </div>);
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        } else {
                            if (!menu.isSubmenu) {
                                return (
                                    <div className={`${styles.menuElement} d-flex justify-content-center`} key={menu.translationId}>
                                        <Link href={menu.path} className={`${styles.menuLink}`}>
                                            <FormattedMessage id={menu.translationId} />
                                        </Link>
                                    </div>);
                            }

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

export default connect(mapStateToProps, mapDispatchToProps)(MenuCpn);