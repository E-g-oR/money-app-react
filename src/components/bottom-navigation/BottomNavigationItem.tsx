import {FC} from "react";
import {BottomNavigationItemType} from "@components/bottom-navigation/BottomNavigation.tsx";
import {NavLink} from "react-router-dom";
import IconComponent from "@icons";
import {Stack, Typography} from "@components";
import * as styles from "./bottom-navigation.css.ts"

interface Props {
    item: BottomNavigationItemType
}

const BottomNavigationItem: FC<Props> = ({item}) =>
    <NavLink to={item.path} style={{width: "100%"}}>
        {({isActive}) => <Stack
            vertical
            alignItems={"center"}
            className={styles.item({isActive})}
        >
            <IconComponent icon={item.icon}/>
            <Typography color={isActive ? "background" : "text"}>{item.label}</Typography>
        </Stack>}
    </NavLink>

export default BottomNavigationItem
