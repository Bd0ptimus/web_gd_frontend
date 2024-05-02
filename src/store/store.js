import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducer/rootReducer';

const makeStore = (context) => createStore(rootReducer);
export const wrapper = createWrapper(makeStore, { 
    debug: true,     
    storeKey: 'yourUniqueStoreKey',
});

