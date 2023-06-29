import {FC} from "react";
import * as styles from "./bottom-navigation.css.ts"
import {icons} from "@icons";
import {Stack} from "@components";
import {bottomNavigationItems} from "@utils/constants.ts";
import BottomNavigationItem from "@components/bottom-navigation/BottomNavigationItem.tsx";

export interface BottomNavigationItemType {
    label: string,
    path: string,
    icon: keyof typeof icons,
}

export type BottomNavigationList = ReadonlyArray<BottomNavigationItemType>


const BottomNavigation: FC = () =>
    <Stack
        className={styles.bottomNavigation}
        justifyContent={"stretch"}
        alignItems={"center"}
    >
    {bottomNavigationItems.map(item => <BottomNavigationItem key={item.path} item={item}/>)}
</Stack>

export default BottomNavigation
