import {settingsActions} from "@store/settings/settings.slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {authActions} from "@store/auth/auth.slice.ts";
import {getLanguage} from "@store/settings/settings.selector.ts";
import {match} from "ts-pattern";
import {en, es, ru, Translation} from "@utils/translation";


const actions = {
    ...settingsActions,
    ...authActions
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
    const lang = useSelector(getLanguage)
    return match(lang)
        .with("es", () => es)
        .with("en", () => en)
        .with("ru", () => ru)
        .otherwise(() => ru)
}
