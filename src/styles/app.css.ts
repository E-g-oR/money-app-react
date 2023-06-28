import {globalStyle, style} from "@vanilla-extract/css";
import {colorScheme} from "./colorScheme.css";
import {sizeRelative} from "@/utils/etc";
import {theme} from "@/styles/theme.css";

export const app = style({
    backgroundColor: colorScheme.background.normal,
    color: colorScheme.text.normal,
    transition: "0.2s",
    // width: "100vw",
    height: "100vh"
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


