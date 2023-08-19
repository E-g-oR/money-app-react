import {IconButton} from "@/components/button";
import {Container} from "@/components/container";
import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@utils/router.ts";
import {getColorScheme, getSetColorScheme} from "@store/settings/settings.selector.ts";
import useSettingsStore from "@store/settings/settings.slice.ts";

export const AppHeader: FC = () => {
    const navigate = useNavigate()
    const colorScheme = useSettingsStore(getColorScheme)
    const setColorScheme = useSettingsStore(getSetColorScheme)

    return <div className={"sticky top-0 z-10 bg-background-50/30 dark:bg-background-900/30 backdrop-blur border-b-2 border-background-200 dark:border-background-700 py-3"}>
        <Container>
            <div className={"flex items-center justify-between"}>
                <IconButton
                    onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
                    icon={"SettingsIcon"}
                    variant={"outlined"}
                />
                <IconButton
                    onClick={() => navigate(ROUTES.profile.path)}
                    icon={"UserIcon"}
                    variant={"outlined"}
                />
            </div>
        </Container>
    </div>
}
