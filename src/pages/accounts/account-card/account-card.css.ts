import {style} from "@vanilla-extract/css";
import {sprinkles} from "@styles/sprinkles.css.ts";

export const accountMain = style({
    width: 150,
    flex: "0 0 150px"
})

export const rightSide = style([{
    flex: 1,
}, sprinkles({justifyContent: "space-between", alignSelf: "center"})])
