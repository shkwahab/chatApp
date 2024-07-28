import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import tokenValidationMiddleware from "./middleware/tokenValidation";
import authSlice from "./slices/auth-slice";


const rootReducer = combineReducers({
    authCtx: authSlice
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authCtx']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(tokenValidationMiddleware)
})

export default store

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


