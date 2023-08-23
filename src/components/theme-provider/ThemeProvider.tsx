import {FC, ReactNode, useLayoutEffect} from "react";
import {getColorScheme} from "@store/settings/settings.selector.ts";
import {clsx} from "@utils/etc.ts";
import useSettingsStore from "@store/settings/settings.slice.ts";

interface Props {
    children: ReactNode
}

const ThemeProvider: FC<Props> = ({children}) => {
    const colorScheme = useSettingsStore(getColorScheme)

    useLayoutEffect(() => {
        if (colorScheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [colorScheme]);

    return <div className={clsx("overflow-x-hidden bg-background-50 text-background-900 fill-background-900 dark:bg-background-900 dark:text-background-200 dark:fill-background-200 transition")}>
        {children}
    </div>
}

export default ThemeProvider
