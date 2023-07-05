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
    key: "depths",
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
