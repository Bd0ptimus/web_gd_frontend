import React, { useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import dynamic from 'next/dynamic'
import { getCookie, setCookie } from 'cookies-next'

import EN from '../../translations/en.json';
import VI from '../../translations/vi.json';
import RU from '../../translations/ru.json';
import * as actions from "../../store/action";
import * as Constants from '../../config/constants/Constants';
import {NextUIProvider} from '@nextui-org/react'


function IntlProviderWrapper({ children, lang, changeLanguage, userLogout }) {
    const [storageLang, setStorageLang] = useState("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let storageLang = JSON.parse(localStorage.getItem('persist:system')).language;
            setStorageLang(storageLang);
            // changeLanguage(storageLang);
        }

    }, [lang, Constants])
    const jwt = getCookie('JWT');
    if (!jwt) {
        userLogout()
    }
    const language = storageLang !== "" ? storageLang : lang;
    const messages = useMemo(() => {
        switch (language) {
            case Constants.LANGUAGE_EN:
                return EN;
                break;

            case Constants.LANGUAGE_VI:
                return VI;
                break;

            case Constants.LANGUAGE_RU:
                return RU;
                break;

            default:
                return VI;
                break;

        }

    }, [language]);

    return (
        <IntlProvider messages={messages} locale="vi" defaultLocale="vi" >
            {/* <NextUIProvider> */}
                {children}
            {/* </NextUIProvider> */}

        </IntlProvider>

    );
}

function mapStateToProps(state) {
    return { lang: state.system.language };
}

function mapDispatchToProps(dispatch) {
    return {
        changeLanguage: (langId) => dispatch(actions.changeSystemLanguage(langId)),
        userLogout: () => dispatch(actions.userLogout()),
    };
}

export default dynamic(() => Promise.resolve(connect(mapStateToProps, mapDispatchToProps)(IntlProviderWrapper)), {
    ssr: false
})