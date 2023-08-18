import {style} from "@vanilla-extract/css";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {sizeRelative} from "@utils/etc.ts";

export const listBody = style([
    sprinkles({display: "flex", gap: {mobile: "s", tablet: "m"}})
    , {
        flexWrap: "wrap",
        // maxWidth: sizeRelative(650)
    }
])

export const listItem = style({
    flex: 1,
    minWidth: sizeRelative(315)
})
