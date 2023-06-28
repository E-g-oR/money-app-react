import {settingsActions} from "@store/settings/settings.slice.ts";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {authActions} from "@store/auth/auth.slice.ts";


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
