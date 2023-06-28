import {style} from "@vanilla-extract/css";
import {sizeRelative} from "@utils/etc.ts";
import {theme} from "@styles/theme.css.ts";
import {colorScheme} from "@styles/colorScheme.css.ts";

export const progress = style({
    WebkitAppearance: "none",
    appearance: "none",
    position: "relative",
    width: "100%",
    height: sizeRelative(5),
    fontSize: theme.fontSize.normal,
    selectors: {
        [`&::-webkit-progress-bar`]: {
            backgroundColor: colorScheme.text.normalTransparent,
            borderRadius: theme.borderRadius.m,
            overflow: "hidden"
        },
        [`&::-webkit-progress-value`]: {
            backgroundColor: colorScheme.success.normal,
            transition: theme.transition
        }
    }
})
