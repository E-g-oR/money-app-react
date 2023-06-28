import {globalStyle, style} from "@vanilla-extract/css";
import {colorScheme} from "./colorScheme.css";
import {theme} from "@styles/theme.css.ts";
import {sizeRelative} from "@utils/etc.ts";

export const app = style({
    backgroundColor: colorScheme.background.normal,
    color: colorScheme.text.normal,
    transition: "0.2s",
    width: "100%",
    flex: 1,
    height: "100vh",
})

globalStyle("body", {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: 1.5,
    fontWeight: 400,

    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    WebkitTextSizeAdjust: "100%",

    display: "flex",
})

globalStyle("#root", {
    flex: 1
})

globalStyle("*", {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
})
globalStyle("a", {
    textDecoration: "none"
})
globalStyle("h4", {
    fontSize: theme.fontSize.h4
})
globalStyle("button", {
    fontSize: theme.fontSize.normal
})
globalStyle("*::-webkit-scrollbar", {
    width: sizeRelative(10)
})
globalStyle("*::-webkit-scrollbar-track", {
    background: colorScheme.background.normal
})
globalStyle("*::-webkit-scrollbar-thumb", {
    backgroundColor: colorScheme.divider,
    borderRadius: sizeRelative(10)
})


