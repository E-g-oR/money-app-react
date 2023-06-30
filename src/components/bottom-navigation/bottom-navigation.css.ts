import {style} from "@vanilla-extract/css";
import {theme} from "@styles/theme.css.ts";
import {recipe} from "@vanilla-extract/recipes";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {sprinkles} from "@styles/sprinkles.css.ts";

export const bottomNavigation = style([{
    backdropFilter: `blur(${theme.spacing.m})`,
    position: "sticky",
    bottom: 0,
    borderTopStyle: "solid",
    borderTopWidth: 2,
    borderTopColor: colorScheme.divider
}])

export const item = recipe({
    base: [{
        color: colorScheme.text.normal,
        transition: theme.transition,
        alignSelf: "stretch",
        flex: 1,
        width: "100%",
        selectors: {
            [`&:hover`]: {
                backgroundColor: colorScheme.primary.normalTransparent
            }
        }

    }, sprinkles({padding: "xs"})],
    variants: {
        isActive: {
            true: {
                backgroundColor: colorScheme.primary.normal,
                color: colorScheme.background.normal
            },
            false: {}
        }
    },
    defaultVariants: {
        isActive: false
    }
})
