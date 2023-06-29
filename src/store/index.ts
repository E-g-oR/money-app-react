import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {settingsReducer} from "@store/settings/settings.slice.ts";
import {authReducer} from "@store/auth/auth.slice.ts";
import {APISecure} from "@store/api.ts";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist"

const persistConfig = {
    storage,
    key: "Vzor-SPO",
};

const rootReducer = combineReducers({
    settings: settingsReducer,
    auth: authReducer,
    [APISecure.reducerPath]: APISecure.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
