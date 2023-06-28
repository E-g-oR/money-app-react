import {recipe} from "@vanilla-extract/recipes";
import {colorScheme} from "@styles/colorScheme.css.ts";

export const divider = recipe({
    base: {
        borderColor: colorScheme.divider,
        borderStyle: "solid",
        borderWidth: 1
    },
    variants: {
        vertical: {
            true: {
                width: 0,
                // height: "100%"
                alignSelf: "stretch"
            },
            false: {
                width: "100%",
                height: 0
            }
        }
    },
    defaultVariants: {
        vertical: false
    }
})
