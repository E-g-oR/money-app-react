import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {settingsReducer} from "@store/settings/settings.slice.ts";
import {APISecure} from "@store/api.ts";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist"
import * as process from "process";
import {accountsReducer} from "@store/accounts/accounts.slice.ts";

const persistConfig = {
    storage,
    key: "money-app-react",
    version: 1
};

const rootReducer = combineReducers({
    settings: settingsReducer,
    accounts: accountsReducer,
    [APISecure.reducerPath]: APISecure.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }).prepend([
            APISecure.middleware,
        ]),
    devTools: process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
