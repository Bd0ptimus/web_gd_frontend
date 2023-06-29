import { combineReducers } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer, persistStore } from 'redux-persist';
// import createwebStorage from "redux-persist/lib/storage/createwebStorage";
import storage from "redux-persist/lib/storage";


import systemReducer from "./systemReducer";



const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};


const systemPersistConfig = {
    ...persistCommonConfig,
    key: 'system',
    whitelist: ['language', 'userLoggedIn', 'userId', 'userName', 'userEmail', 'userJWT']
};

const rootReducer = combineReducers({
    // router: connectRouter(history),
    system: persistReducer(systemPersistConfig, systemReducer),
});

// const store = createStore(rootReducer)
// console.log('root reducer store after createed : ', store.getState())
export default rootReducer

