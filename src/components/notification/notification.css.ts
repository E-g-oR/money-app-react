import { style, styleVariants } from "@vanilla-extract/css";
import { sizeRelative } from "@utils/etc";
import { recipe } from "@vanilla-extract/recipes";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {theme} from "@styles/theme.css.ts";
// import { colorScheme, theme } from "@styles/theme.css";

export const variant = styleVariants({
  error: {
    backgroundColor: colorScheme.error.normal,
  },
  success: {
    backgroundColor: colorScheme.success.normalTransparent,
    borderColor: colorScheme.success.normal
  },
  info: {
    backgroundColor: colorScheme.primary.normal,
  },
  warning: {
    backgroundColor: colorScheme.warning.normal,
  },
});

export const wrap = style({
  position: "fixed",
  top: sizeRelative(80),
  right: sizeRelative(30),
  zIndex: 9999,
});

export const notification = recipe({
  base: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.l,
    paddingRight: theme.spacing.l,
    borderRadius: theme.spacing.xs,
    borderWidth: 1,
    borderStyle: "solid",
    backdropFilter: `blur(${theme.spacing.s})`
  },
  variants: {
    type: variant,
  },
  defaultVariants: {
    type: "info",
  },
});
