import {style} from "@vanilla-extract/css";
import {sprinkles} from "@styles/sprinkles.css.ts";

export const layoutContent = style([{
    flex: 1,
}])
export const layout = style([{
    height: "100%",
    overflowY: "auto",
    width: "100vw",
    display: "grid",

}, sprinkles({})])
