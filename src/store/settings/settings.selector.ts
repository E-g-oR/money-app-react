import {SettingsStore} from "@store/settings/settings.slice.ts";

export const getColorScheme = (store: SettingsStore) => store.colorScheme
export const getLanguage = (store: SettingsStore) => store.language
export const getSetLanguage = (store: SettingsStore) => store.setLanguage
export const getSetColorScheme = (store: SettingsStore) => store.setColorScheme
