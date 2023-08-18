import {FC, ReactNode} from "react";
import {getColorScheme} from "@store/settings/settings.selector.ts";
import {clsx} from "@utils/etc.ts";
import useSettingsStore from "@store/settings/settings.slice.ts";

interface Props {
    children: ReactNode
}

const ThemeProvider: FC<Props> = ({children}) => {
    const colorScheme = useSettingsStore(getColorScheme)
    return <div className={clsx("themeClassName", colorScheme === "dark" ? "darkScheme" : "lightScheme", "app")}>
        {children}
    </div>
}

export default ThemeProvider
