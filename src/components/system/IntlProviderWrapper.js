import React, { useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import dynamic from 'next/dynamic'

import EN from '../../translations/en.json';
import VI from '../../translations/vi.json';
import RU from '../../translations/ru.json';
import * as actions from "../../store/action";
import * as Constants from '../../config/constants/Constants';


function IntlProviderWrapper({ children, lang, changeLanguage }) {
    const [storageLang, setStorageLang] = useState("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let storageLang = JSON.parse(localStorage.getItem('persist:system')).language;
            setStorageLang(storageLang);
            console.log('--->storage  : ', JSON.parse(localStorage.getItem('persist:system')).language);
            // changeLanguage(storageLang);
        }

    }, [lang, Constants])

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
    console.log('--> check messages : ', messages, ' -- language : ', language)


    return (
        <IntlProvider messages={messages} locale="vi" defaultLocale="vi" >
            {children}
        </IntlProvider>

    );
}

function mapStateToProps(state) {
    return { lang: state.system.language };
}

function mapDispatchToProps(dispatch) {
    return {
        changeLanguage: (langId) => dispatch(actions.changeSystemLanguage(langId)),
    };
}

export default dynamic(() => Promise.resolve(connect(mapStateToProps, mapDispatchToProps)(IntlProviderWrapper)), {
    ssr: false
})