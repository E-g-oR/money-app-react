import {createElement, FC, ReactNode} from "react";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {clsx, oneOf} from "@utils/etc.ts";
import {fontSize} from "@styles/theme.css.ts";
import {sprinkles} from "@styles/sprinkles.css.ts";

type Element = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span" | "i"

interface Props {
    as?: Element,
    children: ReactNode,
    color?: Exclude<keyof typeof colorScheme, "divider">,
    colorTint?: keyof typeof colorScheme.text,
    className?: string,
    fontSize?: keyof typeof fontSize,
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
            sprinkles({fontSize: fontSize ?? oneOf(as)(["p", "i", "span"]) ? "normal" : as, fontWeight}),
            className
        ),
        style: {
            color: colorScheme[color][colorTint]

        },
        children,
        ...props
    })
}

export default Typography
