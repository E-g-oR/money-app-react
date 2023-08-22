import {FC, ReactNode} from "react";
import {clsx} from "@utils/etc.ts";

interface Props {
    children: ReactNode,
    className?: string,
    variant?: string,
    color?:string}

export const Card: FC<Props > = ({
                                              children,
                                              className,
                                              variant,
                                              color = "background"
                                          }) =>
    <div
        className={clsx(
            "border border-background-200 dark:border-background-700 rounded-md",
            className
        )}
    >
        {children}
    </div>
