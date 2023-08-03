import {style} from "@vanilla-extract/css";
import {sizeRelative} from "@utils/etc.ts";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {sprinkles} from "@styles/sprinkles.css.ts";

export const overlay = style([{
    backdropFilter: `blur(${sizeRelative(10)})`,
    backgroundColor: colorScheme.background.normalTransparent,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10
},
    sprinkles({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: {
            tablet: "center",
            mobile: "flex-end"
        }
    })
])
export const shadow = style({
    boxShadow: `0px 10px 20px -5px ${colorScheme.text.darkTransparent}`
})

export const closeBtn = style({
    marginLeft: "auto"
})

export const modal = sprinkles({
    alignSelf: {
        tablet: "center",
        mobile: "stretch"
    },
    borderRadius: "m"
})
