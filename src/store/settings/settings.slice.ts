import {Lang} from "@utils/constants.ts";
import {create} from "zustand";
import {persist} from "zustand/middleware";

export type ColorScheme = "light" | "dark" | "auto"

export interface SettingsStore {
    language: Lang,
    colorScheme: ColorScheme,
    setColorScheme: (colorScheme: ColorScheme) => void,
    setLanguage: (lang: Lang) => void
}


const useSettingsStore = create(
    persist<SettingsStore>(
        set => ({
            language: "en",
            colorScheme: "light",
            setColorScheme: colorScheme => set({colorScheme}),
            setLanguage: language => set({language}),
        }),
        {name: "settings-store"}
    )
)

export default useSettingsStore
