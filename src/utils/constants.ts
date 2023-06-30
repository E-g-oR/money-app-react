import {BottomNavigationList} from "@components/bottom-navigation/BottomNavigation.tsx";
import {ROUTES} from "@utils/router.ts";

export const bottomNavigationItems: BottomNavigationList = [{
    label: "Accounts",
    icon: "AccountBalance",
    path: ROUTES.main.path,
}, {
    label: "Depths",
    icon: "Payments",
    path: ROUTES.depths.path,
}, {
    label: "Settings",
    icon: "SettingsIcon",
    path: ROUTES.settings.path,
}, {
    label: "Profile",
    icon: "UserIcon",
    path: ROUTES.profile.path,
},] as const
