import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducers from "./reducer";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['authData'] 
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);

const persistedReducer = persistReducer(persistConfig, rootReducers);


const store = createStore(persistedReducer, composeEnhancers(middleware));
const persistor = persistStore(store);


// let store = createStore(rootReducers, composeEnhancers(middleware));

// const store = createStore(
//     rootReducers /* preloadedState, */,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export {store,
persistor};