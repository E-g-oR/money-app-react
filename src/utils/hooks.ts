import {settingsActions} from "@store/settings/settings.slice.ts";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";


const actions = {
    ...settingsActions
}

/**
 * Hook to use actions without dispatch
 */
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}
