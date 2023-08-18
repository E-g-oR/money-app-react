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
            className
        )}
    >
        {children}
    </div>
