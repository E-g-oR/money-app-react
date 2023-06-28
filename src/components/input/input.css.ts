import {createVar, globalStyle, style} from "@vanilla-extract/css";
import {recipe} from "@vanilla-extract/recipes";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {theme} from "@styles/theme.css.ts";
import {colorScheme} from "@styles/colorScheme.css.ts";

export const bg = createVar()
export const bgFocus = createVar()
export const decoratorBg = createVar()
export const text = createVar()

export const label = recipe({
    base: [{
        position: "relative",
        // backgroundColor: colorScheme.background.light,
        overflow: "hidden",
    },
        sprinkles({
            gap: "m",
            borderRadius: "xs"
            // paddingX: "s"
        })
    ],
    variants: {
        fullWidth: {
            true: {
                width: "100%"
            }
        }
    },
    defaultVariants: {
        fullWidth: false
    }
})
export const input = style([{
        background: "transparent",
        // borderWidth: 0,
        borderStyle: "solid",
        borderColor: bg,
        flex: 1,
        width: "100%",
        color: text,
        fontSize: theme.fontSize.normal,
        backgroundColor: bg,
        transition: theme.transition,
        outline: "none",
        selectors: {
            ["&:focus"]: {
                backgroundColor: bgFocus,
                borderColor: colorScheme.background.normal
            }
        }
    },
        sprinkles({
            paddingX: "s",
            paddingY: "xs",
            // marginX:"s"
        })
    ],
)

export const decorator = style({
    height: 2,
    width: "100%",
    backgroundColor: decoratorBg,
    position: "absolute",
    bottom: -3,
    transition: theme.transition
})

globalStyle(`${input}:focus + ${decorator}`, {
    bottom: 0
})
