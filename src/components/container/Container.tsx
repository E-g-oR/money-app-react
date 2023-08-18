import {FC, ReactNode} from "react";
// import {theme} from "@styles/theme.css.ts";
import {clsx} from "@utils/etc.ts";
// import {sprinkles} from "@styles/sprinkles.css.ts";

interface Props {
    children: ReactNode
    spacing?: string,
    className?: string
}

export const Container: FC<Props> = (
    {
        children,
        spacing = "m",
        className,
    }) =>
    <div
        className={clsx("px-3 md:px-5", className)}
    >
        {children}
    </div>

