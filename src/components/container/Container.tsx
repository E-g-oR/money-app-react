import {FC, ReactNode} from "react";
import {theme} from "@styles/theme.css.ts";
import {clsx} from "@utils/etc.ts";
import {sprinkles} from "@styles/sprinkles.css.ts";

interface Props {
    children: ReactNode
    spacing?: keyof typeof theme.spacing,
    className?: string
}

export const Container: FC<Props> = (
    {
        children,
        spacing = "m",
        className,
    }) =>
    <div
        className={clsx(sprinkles({padding: spacing}), className)}
    >
        {children}
    </div>

