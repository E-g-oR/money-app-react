import {FC} from "react";
import {clsx} from "@utils/etc.ts";

interface Props {
    vertical?: boolean;
    spacing?: string;
    className?: string
}

export const Divider: FC<Props> = ({vertical, spacing, className}) =>
    <div
        className={clsx(
            vertical
                ? "border-r-2 self-stretch"
                : "border-t-2 w-full",
            "border-background-200 dark:border-background-700",
            className
        )}
    />

