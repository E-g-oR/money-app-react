import {clsx} from "@/utils/etc";
import {FC, ReactNode} from "react";


interface Props {
    children: ReactNode,
    spacing?:string,
    vertical?: boolean,
    alignItems?: string,
    className?: string
    justifyContent?: string
}

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
            className
        )}
    >
        {children}
    </div>

export default Stack
