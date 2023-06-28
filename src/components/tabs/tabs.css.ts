import {recipe} from "@vanilla-extract/recipes";
import {style} from "@vanilla-extract/css";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {theme} from "@styles/theme.css.ts";

export const tab = recipe({
    base: [sprinkles({paddingX: "m", paddingY: "s", cursor: "pointer"}), style({
        border: "none",
        position: "relative",
        backgroundColor: colorScheme.background.dark,
        transition: theme.transition,
        selectors: {
            [`&::after`]: {
                content: "",
                display: "block",
                position: "absolute",
                left: "10%",
                width: "80%",
                height: 3,
                borderRadius: theme.borderRadius.m,
                backgroundColor: colorScheme.primary.normal,
                transition: theme.transition
            },
            [`&:hover`]: {
                backgroundColor: colorScheme.background.light
            }
        }
    })],
    variants: {
        isActive: {
            true: {
                selectors: {
                    [`&::after`]: {
                        opacity: 1,
                        bottom: 5,
                    }
                }
            },
            false: {
                selectors: {
                    [`&::after`]: {
                        opacity: 0,
                        bottom: 0,
                    }
                }
            }
        }
    }
})
