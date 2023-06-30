import {style} from "@vanilla-extract/css";
import {sizeRelative} from "@utils/etc.ts";
import {colorScheme} from "@styles/colorScheme.css.ts";

export const header = style([{
    backdropFilter: `blur(${sizeRelative(15)})`,
    backgroundColor: colorScheme.background.normalTransparent,
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: colorScheme.divider,
    zIndex: 2
}])
