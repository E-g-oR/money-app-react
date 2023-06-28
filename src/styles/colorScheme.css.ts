import {createTheme, createThemeContract} from "@vanilla-extract/css"


export const color = {
    light: "",
    lightTransparent: "",
    normal: "",
    normalTransparent: "",
    dark: "",
    darkTransparent: "",
}

export const colorScheme = createThemeContract({
    text: color,
    background: color,
    divider: null,
    primary: color,
    secondary: color,
    error: color,
    success: color,
    warning: color
})

export const lightScheme = createTheme(colorScheme, {
    text: {
        dark: "hsla(0, 0%, 0%, 1)",
        darkTransparent: "hsla(0, 0%, 0%, 0.3)",
        light: "hsla(0, 0%, 0%, 0.6)",
        lightTransparent: "hsla(0, 0%, 0%, 0.2)",
        normal: "hsla(0, 0%, 0%, 0.82)",
        normalTransparent: "hsla(0, 0%, 0%, 0.2)"
    },
    background: {
        dark: "hsla(210, 10%, 92%, 1)",
        darkTransparent: "hsla(210, 10%, 92%, 0.2)",
        light: "hsla(0, 0%, 100%, 1)",
        lightTransparent: "hsla(0, 0%, 100%, 0.2)",
        normal: "hsla(210, 20%, 98%, 1)",
        normalTransparent: "hsla(210, 20%, 98%, 0.2)"
    },
    divider: "hsla(0, 0%, 88%, 1)",
    primary: {
        dark: "hsla(210, 80%, 40%, 1)",
        darkTransparent: "hsla(210, 80%, 40%, 0.2)",
        light: "hsla(210, 80%, 60%, 1)",
        lightTransparent: "hsla(210, 80%, 60%, 0.2)",
        normal: "hsla(210, 79%, 46%, 1)",
        normalTransparent: "hsla(210, 79%, 46%, 0.2)"
    },
    secondary: {
        dark: "hsla(291, 65%, 35%, 1)",
        darkTransparent: "hsla(291, 65%, 35%, 0.2)",
        light: "hsla(291, 65%, 60%, 1)",
        lightTransparent: "hsla(291, 65%, 60%, 0.2)",
        normal: "hsla(291, 64%, 42%, 1)",
        normalTransparent: "hsla(291, 64%, 42%, 0.2)"
    },
    error: {
        dark: "hsla(0, 80%, 35%, 1)",
        darkTransparent: "hsla(0, 80%, 35%, 0.2)",
        light: "hsla(0, 60%, 70%, 1)",
        lightTransparent: "hsla(0, 60%, 70%, 0.2)",
        normal: "hsla(0, 65%, 51%, 1)",
        normalTransparent: "hsla(0, 65%, 51%, 0.2)"
    },
    success: {
        dark: "hsla(123, 55%, 27%, 1)",
        darkTransparent: "hsla(123, 55%, 27%, 0.2)",
        light: "hsla(123, 45%, 45%, 1)",
        lightTransparent: "hsla(123, 45%, 45%, 0.2)",
        normal: "hsla(123, 45%, 35%, 1)",
        normalTransparent: "hsla(123, 45%, 35%, 0.2)"
    },
    warning: {
        dark: "",
        darkTransparent: "",
        light: "",
        lightTransparent: "",
        normal: "hsla(27, 98%, 47%, 1)",
        normalTransparent: ""
    }
})

export const darkScheme = createTheme(colorScheme, {
    text: {
        dark: "hsla(0, 0%, 100%, 0.4)",
        darkTransparent: "hsla(0, 0%, 100%, 0.1)",
        light: "hsla(0, 0%, 100%, 1)",
        lightTransparent: "hsla(0, 0%, 100%, 0.7)",
        normal: "hsla(0, 0%, 100%, 0.75)",
        normalTransparent: "hsla(0, 0%, 100%, 0.5)"
    },
    background: {
        dark: "hsla(0, 0%, 7%, 1)",
        darkTransparent: "hsla(0, 0%, 7%, 0.3)",
        light: "hsla(0, 0%, 22%, 1)",
        lightTransparent: "hsla(0, 0%, 22%, 0.3)",
        normal: "hsla(0, 0%, 14%, 1)",
        normalTransparent: "hsla(0, 0%, 14%, 0.3)"
    },
    divider: "hsla(0, 0%, 28%, 1)",
    primary: {
        dark: "hsla(207, 90%, 61%, 1)",
        darkTransparent: "hsla(207, 90%, 61%, 0.3)",
        light: "hsla(207, 90%, 85%, 1)",
        lightTransparent: "hsla(207, 90%, 85%, 0.3)",
        normal: "hsla(207, 90%, 77%, 1)",
        normalTransparent: "hsla(207, 90%, 77%, 0.3)"
    },
    secondary: {
        dark: "hsla(291, 47%, 51%, 1)",
        darkTransparent: "hsla(291, 47%, 51%, 0.3)",
        light: "hsla(291, 50%, 80%, 1)",
        lightTransparent: "hsla(291, 50%, 80%, 0.3)",
        normal: "hsla(291, 47%, 71%, 1)",
        normalTransparent: "hsla(291, 47%, 71%, 0.3)"
    },
    error: {
        dark: "hsla(0, 65%, 51%, 1)",
        darkTransparent: "hsla(0, 65%, 51%, 0.3)",
        light: "hsla(4, 90%, 67%, 1)",
        lightTransparent: "hsla(4, 90%, 67%, 0.3)",
        normal: "hsla(4, 90%, 58%, 1)",
        normalTransparent: "hsla(4, 90%, 58%, 0.3)"
    },
    success: {
        dark: "hsla(123, 43%, 39%, 1)",
        darkTransparent: "hsla(123, 43%, 39%, 0.3)",
        light: "hsla(123, 40%, 67%, 1)",
        lightTransparent: "hsla(123, 40%, 67%, 0.3)",
        normal: "hsla(123, 38%, 57%, 1)",
        normalTransparent: "hsla(123, 38%, 57%, 0.3)"
    },
    warning: {
        dark: "hsla(30, 100%, 48%, 1)",
        darkTransparent: "hsla(30, 100%, 48%, 0.3)",
        light: "hsla(36, 100%, 67%, 1)",
        lightTransparent: "hsla(36, 100%, 67%, 0.3)",
        normal: "hsla(36, 100%, 57%, 1)",
        normalTransparent: "hsla(36, 100%, 57%, 0.3)"
    }
})
