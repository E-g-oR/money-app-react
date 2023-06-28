import { styleVariants } from "@vanilla-extract/css";
import { sizeRelative } from "@utils/etc";
import { recipe } from "@vanilla-extract/recipes";

export const iconSize = styleVariants({
  normal: {
    width: sizeRelative(24),
    height: sizeRelative(24),
  },
  large: {
    width: sizeRelative(50),
    height: sizeRelative(50),
  },
  huge: {
    width: sizeRelative(150),
    height: sizeRelative(150),
  },
  auto: {
    height: "auto",
    width: "auto",
  },
});

export const icon = recipe({
  variants: {
    size: iconSize,
  },
  defaultVariants: {
    size: "normal",
  },
});
