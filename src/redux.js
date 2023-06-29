import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import rootReducer from './store/reducer/rootReducer';

// const environment = process.env.NODE_ENV || "development";
// let isDevelopment = environment === "development";

// //hide redux logs
// isDevelopment = false;


// export const history = createBrowserHistory({ basename: process.env.REACT_APP_ROUTER_BASE_NAME });

// const reduxStateSyncConfig = {
//     whitelist: [
//         actionTypes.APP_START_UP_COMPLETE,
//     ]
// }

// const rootReducer = createRootReducer(history);
// const middleware = [
//     routerMiddleware(history),
//     thunkMiddleware,
//     createStateSyncMiddleware(reduxStateSyncConfig),
// ]
// if (isDevelopment) middleware.push(logger);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reduxStore = createStore(rootReducer);

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

export default reduxStore;

