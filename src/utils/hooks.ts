import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {getLanguage} from "@store/settings/settings.selector.ts";
import {match} from "ts-pattern";
import {en, es, ru, Translation} from "@utils/translation";
import useSettingsStore from "@store/settings/settings.slice.ts";


const actions = {
}

/**
 * Hook to use actions without dispatch
 */
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}

/**
 * Hook to get dictionary of selected language for interface
 */
export const useTranslation = (): Translation => {
    const lang = useSettingsStore(getLanguage)
    // TODO: use just record of dictionaries instead of function
    return match(lang)
        .with("es", () => es)
        .with("en", () => en)
        .with("ru", () => ru)
        .otherwise(() => ru)
}
