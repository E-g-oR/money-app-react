import {createTheme, createThemeContract} from "@vanilla-extract/css";
import {sizeRelative} from "@utils/etc.ts";
// import {sizeRelative} from "../utils/etc";

export const spacing = {
    xxs: "",
    xs: "",
    s: "",
    m: "",
    l: "",
    xl: "",
    xxl: "",
}

export const fontSize = {
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    normal: "",
    small: ""
}

export const theme = createThemeContract({
    spacing,
    fontSize,
    borderRadius: spacing,
    transition: ""
})

export const themeClassName = createTheme(theme, {
    spacing: {
        xxs: sizeRelative(4),
        xs: sizeRelative(8),
        s: sizeRelative(12),
        m: sizeRelative(16),
        l: sizeRelative(22),
        xl: sizeRelative(32),
        xxl: sizeRelative(64),
    },
    fontSize: {
        h1: sizeRelative(52),
        h2: sizeRelative(45),
        h3: sizeRelative(32),
        h4: sizeRelative(24),
        h5: sizeRelative(16),
        h6: sizeRelative(13),
        normal: sizeRelative(16),
        small: sizeRelative(13)
    },
    borderRadius: {
        xxs: sizeRelative(3),
        xs: sizeRelative(3),
        s: sizeRelative(6),
        m: sizeRelative(10),
        l: sizeRelative(16),
        xl: sizeRelative(24),
        xxl: sizeRelative(64),
    },
    transition: "0.2s"
})
