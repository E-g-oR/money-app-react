import {getLanguage} from "@store/settings/settings.selector.ts";
import {DICTIONARY, Translation} from "@utils/translation";
import useSettingsStore from "@store/settings/settings.slice.ts";


/**
 * Hook to get dictionary of selected language for interface
 */
export const useTranslation = (): Translation => {
    const lang = useSettingsStore(getLanguage)
    return DICTIONARY[lang] ?? DICTIONARY.en
}
