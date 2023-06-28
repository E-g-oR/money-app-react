import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ColorScheme = "light" | "dark" | "auto"

interface SettingsSlice {
    language: string,
    colorScheme: "light" | "dark" | "auto"
}

const initialState: SettingsSlice = {
    colorScheme: "dark",
    language: "en",
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
            state.colorScheme = action.payload
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload
        }
    }
})

export const settingsActions = settingsSlice.actions,
    settingsReducer = settingsSlice.reducer
