import {clsx} from "@/utils/etc";
import {FC, ReactNode} from "react";


interface Props {
    children: ReactNode,
    spacing?: string,
    vertical?: boolean,
    alignItems?: string,
    className?: string
    justifyContent?: string
}

// TODO: add spacing, alignItems, justifyContent props
const Stack: FC<Props> = ({
                              children,
                              spacing,
                              vertical = false,
                              alignItems = "stretch",
                              justifyContent,
                              className
                          }) =>
    <div
        className={clsx(
            "flex",
            vertical ? "flex-col" : undefined,
            className
        )}
    >
        {children}
    </div>

export default Stack
