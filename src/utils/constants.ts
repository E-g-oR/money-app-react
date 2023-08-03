import {BottomNavigationList} from "@components/bottom-navigation/BottomNavigation.tsx";
import {ROUTES} from "@utils/router.ts";

export const bottomNavigationItems: BottomNavigationList = [{
    label: "Accounts",
    icon: "AccountBalance",
    key: "accounts",
    path: ROUTES.main.path,
}, {
    label: "Depths",
    icon: "Payments",
    key: "depts",
    path: ROUTES.depths.path,
}, {
    label: "Settings",
    icon: "SettingsIcon",
    key: "settings",
    path: ROUTES.settings.path,
}, {
    label: "Profile",
    icon: "UserIcon",
    key: "profile",
    path: ROUTES.profile.path,
},] as const


export type Lang = "en" | "ru" | "es" | "fr" | "by"
export interface LanguageSelectItem {
    value: Lang,
    title: string
}

export const languageSelect: ReadonlyArray<LanguageSelectItem> = [{
    title: "English",
    value: "en",
},{
    title: "Русский",
    value: "ru",
},{
    title: "Español",
    value: "es",
},{
    title: "Français",
    value: "fr",
},{
    title: "Беларуская",
    value: "by",
},] as const

