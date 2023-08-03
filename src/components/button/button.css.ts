import {recipe} from "@vanilla-extract/recipes";
import {spacing, theme} from "@styles/theme.css.ts";
import {createVar, styleVariants} from "@vanilla-extract/css";
import {sizeRelative} from "@utils/etc.ts";

export type ButtonVariant = "outline" | "solid" | "soft" | "clear"

export type ButtonSize = keyof typeof spacing


export const bg = createVar()
export const bgHover = createVar()
export const bgActive = createVar()
export const bgTransparent = createVar()
export const bgTransparentHover = createVar()
export const bgTransparentActive = createVar()
export const text = createVar()
export const textHover = createVar()
export const textActive = createVar()

export const variant: Record<ButtonVariant, string> = styleVariants({
    solid: {
        backgroundColor: bg,
        color: text,
        borderColor: bg,
        selectors: {
            ["&:hover"]: {
                backgroundColor: bgHover,
                color: textHover,
            },
            ["&:focus"]: {
                backgroundColor: bgHover,
                color: textHover,
            },
            ["&:active"]: {
                backgroundColor: bgActive,
                color: textActive
            }
        }
    },
    outline: {
        background: "transparent",
        color: bg,
        borderColor: bg,
        selectors: {
            ["&:hover"]: {
                backgroundColor: bgTransparentHover,
                color: bgHover,
                borderColor: bgHover,
            },
            ["&:focus"]: {
                backgroundColor: bgTransparentHover,
                color: bgHover,
                borderColor: bgHover,
            },
            ["&:active"]: {
                backgroundColor: bgTransparentActive,
                color: bgActive,
                borderColor: bgActive,
            }
        }
    },
    soft: {
        background: bgTransparent,
        color: bg,
        borderColor: "transparent",
        selectors: {
            ["&:hover"]: {
                backgroundColor: bgTransparentHover,
                color: bgHover,
            },
            ["&:focus"]: {
                backgroundColor: bgTransparentHover,
                color: bgHover,
            },
            ["&:active"]: {
                backgroundColor: bgTransparentActive,
                color: bgActive,
            }
        }
    },
    clear: {
        background: "transparent",
        color: bg,
        borderColor: "transparent",
        selectors: {
            ["&:hover"]: {
                backgroundColor: bgTransparentHover,
                color: bgHover,
            },
            ["&:focus"]: {
                backgroundColor: bgTransparentHover,
                color: bgHover,
            },
            ["&:active"]: {
                backgroundColor: bgTransparentActive,
                color: bgActive,
            }
        }
    },
})

export const size: Record<ButtonSize, string> = styleVariants({
    xxs: {
        padding: `${sizeRelative(4)} ${theme.spacing.xs}`,
        borderRadius: theme.borderRadius.xs,
    },
    xs: {
        padding: `${sizeRelative(4)} ${theme.spacing.xs}`,
        borderRadius: theme.borderRadius.xs,
    },
    s: {
        padding: `${theme.spacing.xs} ${theme.spacing.s}`,
        borderRadius: theme.borderRadius.s,
    },
    m: {
        padding: `${theme.spacing.xs} ${theme.spacing.m}`,
        borderRadius: theme.borderRadius.s,
    },
    l: {
        padding: `${theme.spacing.m} ${theme.spacing.l}`,
        borderRadius: theme.borderRadius.s,
    },
    xl: {
        padding: `${theme.spacing.m} ${theme.spacing.xl}`,
        borderRadius: theme.borderRadius.s,
    },
    xxl: {
        padding: `${theme.spacing.m} ${theme.spacing.xl}`,
        borderRadius: theme.borderRadius.s,
    }
})

export const button = recipe({
    base: {
        transition: theme.transition,
        backdropFilter: `blur(${theme.borderRadius.m})`,
        cursor: "pointer",
        borderStyle: "solid",
        borderWidth: 2,
        textTransform: "uppercase",
        // borderRadius: theme.borderRadius.s,
        selectors: {
            [`&:disabled`]:{
                cursor: "not-allowed",
                filter: "grayscale(1)"
            }
        }
    },
    variants: {
        variant,
        size
    },
    defaultVariants: {
        variant: "solid",
        size: "m"
    }
})

export const iconButton = recipe({
    base: {
        transition: theme.transition,
        backdropFilter: `blur(${theme.borderRadius.m})`,
        cursor: "pointer",
        borderStyle: "solid",
        borderWidth: 2,
        textTransform: "uppercase"
        // borderRadius: theme.borderRadius.s
    },
    variants: {
        variant,
    },
    defaultVariants: {
        variant: "solid",
    }
})
