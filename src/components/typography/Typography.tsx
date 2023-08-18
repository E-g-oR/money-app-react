import {createElement, FC, ReactNode} from "react";
import {clsx} from "@utils/etc.ts";

type Element = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span" | "i"

interface Props {
    as?: Element,
    children: ReactNode,
    color?: string,
    colorTint?: string,
    className?: string,
    fontSize?: string,
    fontWeight?: "400" | "500" | "600" | "700",
    title?: string,
}

const Typography: FC<Props> = ({
                                   as = "p",
                                   color = "text",
                                   colorTint = "normal",
                                   className,
                                   fontSize,
                                   fontWeight,
                                   children,
                                   ...props
                               }) => {
    return createElement(as, {
        className: clsx(
            className
        ),
        children,
        ...props
    })
}

export default Typography
