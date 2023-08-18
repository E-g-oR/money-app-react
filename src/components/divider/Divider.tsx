import {FC} from "react";
import {clsx} from "@utils/etc.ts";

interface Props {
    vertical?: boolean;
    spacing?: string;
}

export const Divider: FC<Props> = ({vertical, spacing}) =>
    <div
        className={clsx(vertical ? "border-2 h-full" : "border-t-2 w-full", "border-background-200 dark:border-background-700")}
    />

