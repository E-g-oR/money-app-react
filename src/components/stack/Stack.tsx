import {alignItems, justifyContent, sprinkles} from "@/styles/sprinkles.css";
import {theme} from "@/styles/theme.css";
import {clsx} from "@/utils/etc";
import * as styles from "./stack.css"
import {FC, ReactNode} from "react";


interface Props {
    children: ReactNode,
    spacing?: keyof typeof theme.spacing,
    vertical?: boolean,
    alignItems?: typeof alignItems[number],
    className?: string
    justifyContent?: typeof justifyContent[number]
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
            styles.stack,
            sprinkles({
                gap: spacing,
                flexDirection: vertical ? "column" : "row",
                alignItems,
                justifyContent
            }),
            className
        )}
    >
        {children}
    </div>

export default Stack
