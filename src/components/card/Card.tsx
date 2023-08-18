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
            "border-2 rounded-md py-2 px-1",
            className
        )}
    >
        {children}
    </div>
