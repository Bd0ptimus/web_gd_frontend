import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

import reduxStore, { persistor } from '../redux';
import IntlProviderWrapper from '@/components/system/IntlProviderWrapper';
import {NextUIProvider} from '@nextui-org/react'

export default function App({ Component, pageProps }) {


    return (
        <FluentProvider theme={teamsLightTheme}>
            <Provider store={reduxStore}>
                <IntlProviderWrapper>

                    <PersistGate persistor={persistor} >
                        {
                            () => (
                                <NextUIProvider><Component {...pageProps} /></NextUIProvider>
                                
                            )
                        }
                    </PersistGate>
                </IntlProviderWrapper>
            </Provider>
        </FluentProvider>

    );
}