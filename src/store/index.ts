import {configureStore} from "@reduxjs/toolkit";
import {settingsReducer} from "@store/settings/settings.slice.ts";
import {authReducer} from "@store/auth/auth.slice.ts";


export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        auth: authReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
