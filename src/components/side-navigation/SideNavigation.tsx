import {FC, Fragment} from "react";
import {ROUTES} from "@utils/router.ts";
import {icons} from "@icons";
import SideNavigationItem from "@components/side-navigation/SideNavigationItem.tsx";
import {useDeviceType} from "@utils/responsive.ts";
import {motion} from "framer-motion"

export interface SideNavItem {
    text: string,
    icon: keyof typeof icons
    path: string
}

// TODO: use data from transaction
const sideNavItems: ReadonlyArray<SideNavItem> = [{
    text: "Accounts", icon: "AccountBalance", path: ROUTES.main.path
}, {
    text: "Depts", icon: "Payments", path: ROUTES.depths.path
}, {
    text: "Settings", icon: "SettingsIcon", path: ROUTES.settings.path
}, {
    text: "Profile", icon: "UserIcon", path: ROUTES.profile.path
},]

const SideNavigation: FC = () => {
    const device = useDeviceType()
    return <motion.div
        layout
        className={"sticky top-0 bottom-0 left-0 transition bg-background-200/50 backdrop-blur dark:bg-background-800 rounded-r-2xl border-2 border-background-200 dark:border-background-700 shadow-2xl px-2 lg:px-5 py-16 lg:w-full max-w-sm"}
    >
        <nav className={"flex flex-col gap-2"}>
            {sideNavItems.map(item => <Fragment key={item.path}>
                <SideNavigationItem item={item} hideText={device.deviceType === "tablet"}/>
            </Fragment>)}
        </nav>

    </motion.div>
}

export default SideNavigation
