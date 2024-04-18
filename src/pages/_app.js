import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

import reduxStore, { persistor } from '../redux';
import IntlProviderWrapper from '@/components/system/IntlProviderWrapper';
import {NextUIProvider} from '@nextui-org/react'
import { wrapper } from '../store/store';
import HeaderCpn from '@/components/layouts/headerCpn';
import FooterCpn from '@/components/layouts/footerCpn';

function App({ Component, pageProps }) {
    return (
        <FluentProvider theme={teamsLightTheme}>
            <Provider store={reduxStore}>
                <IntlProviderWrapper>

                    <PersistGate persistor={persistor} >
                        {
                            () => (
                                <NextUIProvider>
                                    <HeaderCpn/>
                                    <Component {...pageProps} />
                                    <FooterCpn />
                                </NextUIProvider>
                            )
                        }
                    </PersistGate>
                </IntlProviderWrapper>
            </Provider>
        </FluentProvider>

    );
}
export default App;


// export default wrapper.withRedux(App);
