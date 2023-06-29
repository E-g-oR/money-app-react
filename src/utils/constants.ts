import {BottomNavigationList} from "@components/bottom-navigation/BottomNavigation.tsx";
import {ROUTES} from "@utils/router.ts";

export const bottomNavigationItems: BottomNavigationList = [{
    label: "Home",
    icon: "UserIcon",
    path: ROUTES.main.path,
},{
    label: "Depths",
    icon: "UserIcon",
    path: ROUTES.depths.path,
},{
    label: "Depths",
    icon: "UserIcon",
    path: ROUTES.depths.path,
},{
    label: "settings",
    icon: "UserIcon",
    path: ROUTES.depths.path,
},] as const
