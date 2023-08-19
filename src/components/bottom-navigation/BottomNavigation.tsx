import {FC} from "react";
import {icons} from "@icons";
import {Stack} from "@components";
import {bottomNavigationItems} from "@utils/constants.ts";
import BottomNavigationItem from "@components/bottom-navigation/BottomNavigationItem.tsx";
import {BottomNavigationKey} from "@utils/translation";

export interface BottomNavigationItemType {
    label: string,
    key: BottomNavigationKey,
    path: string,
    icon: keyof typeof icons,
}

export type BottomNavigationList = ReadonlyArray<BottomNavigationItemType>


const BottomNavigation: FC = () =>
    <Stack
        className={"sticky bottom-0 bg-background-50/40 dark:bg-background-900/40 backdrop-blur border-t-2 border-background-200 dark:border-background-700"}
        justifyContent={"stretch"}
        alignItems={"center"}
    >
    {bottomNavigationItems.map(item => <BottomNavigationItem key={item.key} item={item}/>)}
</Stack>

export default BottomNavigation
