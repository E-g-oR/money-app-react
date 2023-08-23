import {FC} from "react";
import {BottomNavigationItemType} from "@components/bottom-navigation/BottomNavigation.tsx";
import {NavLink} from "react-router-dom";
import IconComponent from "@icons";
import {Stack, Typography} from "@components";
import {useTranslation} from "@utils/hooks.tsx";

interface Props {
    item: BottomNavigationItemType
}

const BottomNavigationItem: FC<Props> = ({item}) => {
    const t = useTranslation()
    return <NavLink to={item.path} style={{width: "100%"}}>
        {({isActive}) => <Stack
            vertical
            className={`items-center hover:bg-primary-600 hover:text-background-100 hover:fill-background-100 transition py-2 ${isActive ? "bg-primary-500 text-background-100 fill-background-100" : ""}`}
        >
            <IconComponent icon={item.icon}/>
            <Typography color={isActive ? "background" : "text"}>{t.navigation[item.key]}</Typography>
        </Stack>}
    </NavLink>
}

export default BottomNavigationItem
