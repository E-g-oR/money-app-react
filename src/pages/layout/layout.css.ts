import {style} from "@vanilla-extract/css";
import {sprinkles} from "@styles/sprinkles.css.ts";

export const layoutContent = style([{
    flex: 1,
}, sprinkles({paddingTop: "xxl"})])
export const layout = style({
    height: "100%",
})
