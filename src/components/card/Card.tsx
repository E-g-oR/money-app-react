import {FC, ReactNode} from "react";
import {clsx} from "@utils/etc.ts";
import {spacing} from "@styles/theme.css.ts";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {assignInlineVars} from "@vanilla-extract/dynamic";
import * as styles from "./card.css"

export type Color = Exclude<keyof typeof colorScheme, "divider">

type Padding =
    | {
    padding?: keyof typeof spacing
    paddingX?: never
    paddingY?: never
} | {
    padding?: never
    paddingX: keyof typeof spacing
    paddingY: keyof typeof spacing
}

interface Props {
    children: ReactNode,
    className?: string,
    variant?: styles.CardVariant,
    color?: Color
}

export const Card: FC<Props & Padding> = ({
                                              children,
                                              className,
                                              padding,
                                              paddingY,
                                              paddingX,
                                              variant,
                                              color = "background"
                                          }) =>
    <div
        style={assignInlineVars({
            [styles.bg]: colorScheme[color].normal,
            [styles.bgLight]: colorScheme[color].light
        })}
        className={clsx(
            styles.card({variant}),
            sprinkles({padding, paddingY, paddingX}), className)
        }
    >
        {children}
    </div>
