import {FC, memo} from "react";
import {clsx} from "@utils/etc.ts";
import IconComponent from "@icons";
import {Typography} from "@components";
import {NavLink} from "react-router-dom";
import {SideNavItem} from "./SideNavigation.tsx";
import {motion} from "framer-motion"

interface Props {
    item: SideNavItem
}

const SideNavigationItem: FC<Props> = ({item}) => <NavLink
    to={item.path}
    key={item.path}
>
    {({isActive}) => <div
        className={clsx(
            "relative flex gap-4 py-2 px-4 rounded hover:bg-background-200 dark:hover:bg-background-900 transition",
            isActive ? "bg-background-50 dark:bg-background-900 border border-background-200 dark:border-background-700 text-primary-500 dark:text-primary-300" : ""
        )}
    >
        <IconComponent icon={item.icon}/>
        <Typography>{item.text}</Typography>
        {isActive && <motion.div className={"absolute bg-primary-500 dark:bg-primary-300 rounded w-1 h-1/2 left-0 top-1/4"} layoutId={"activeDecorator"}/>}
    </div>}
</NavLink>
const SideNavigationItemComponent = memo(SideNavigationItem)
export default SideNavigationItemComponent

