import {createElement, FC, ReactNode} from "react";
import {clsx, oneOf} from "@utils/etc.ts";
import {match} from "ts-pattern";

type Element = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span" | "i" | "strong"
const boldText: ReadonlyArray<Element> = ["strong", "h1", "h2", "h3", "h4", "h5", "h6"]
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

const getFontSize = (element: Element) => match(element)
    .with("h1", ()=> "text-4xl sm:text-5xl")
    .with("h2", ()=> "text-3xl sm:text-4xl")
    .with("h3", ()=> "text-2xl sm:text-3xl")
    .with("h4", ()=> "text-xl sm:text-2xl")
    .with("h5", ()=> "text-lg sm:text-xl")
    .with("h6", ()=> "text-base sm:text-lg")
    .otherwise(()=> "text-base")

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
            getFontSize(as),
            oneOf(as)(boldText) ? "font-bold": "font-normal",
            "leading-normal",
            // "text-background-900 dark:text-background-100",
            className
        ),
        children,
        ...props
    })
}

export default Typography
