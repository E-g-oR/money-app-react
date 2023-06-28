import {style} from "@vanilla-extract/css";
import {theme} from "@styles/theme.css.ts";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {sizeRelative} from "@utils/etc.ts";
import {recipe} from "@vanilla-extract/recipes";

export const select = style({
    width: "100%",
    position: "relative"
})

export const item = style([{
    transition: theme.transition,
    selectors: {
        ["&:hover"]: {
            backgroundColor: colorScheme.background.light
        }
    }
}, sprinkles({
    borderRadius: "s",
    cursor: "pointer"
})])

export const list = style({
    position: "absolute",
    top: sizeRelative(50),
    maxHeight: sizeRelative(200),
    zIndex: 5,
    width: "100%",
    overflow: "auto",
})

export const chevron = recipe({
    base:{
        width: sizeRelative(24),
        transition: theme.transition,
    },
    variants: {
        isOpen: {
            true: {
                transform: "scaleY(-100%)"
            }
        }
    },
    defaultVariants: {
        isOpen: false
    }
})
