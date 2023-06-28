import {RootState} from "@store";

export const getColorScheme = (state: RootState) => state.settings.colorScheme
export const getLanguage = (state: RootState) => state.settings.language
