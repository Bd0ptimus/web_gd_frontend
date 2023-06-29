import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import reduxStore, { persistor } from '../redux';
import IntlProviderWrapper from '@/components/system/IntlProviderWrapper';
export default function App({ Component, pageProps }) {

    return (
        <Provider store={reduxStore}>
            <IntlProviderWrapper>

                <PersistGate persistor={persistor} >
                    {
                        () => (
                            <Component {...pageProps} />
                        )
                    }
                </PersistGate>
            </IntlProviderWrapper>



        </Provider>

    );
}