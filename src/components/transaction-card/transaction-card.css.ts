import {style, styleVariants} from "@vanilla-extract/css";
import {colorScheme} from "@/styles/colorScheme.css";
import {theme} from "@/styles/theme.css";
import {recipe} from "@vanilla-extract/recipes";
import {OperationType} from "@/types/accounts.ts";

export const type: Record<OperationType, string> = styleVariants({
    [OperationType.EXPENSE]: {
        backgroundColor: colorScheme.error.normal,
    },
    [OperationType.INCOME]: {
        backgroundColor: colorScheme.success.normal,
    },
})
export const card = style({
    position: "relative",
    overflow: "hidden",
    alignSelf: "stretch"
})
export const decorator = recipe({
    base: {
        position: "absolute",
        top: 0,
        left: 0,
        width: theme.spacing.xs,
        height: "100%"
    },
    variants: {
        type
    },
    defaultVariants: {
        type: OperationType.EXPENSE
    }
})

export const date = style({
    flex: 1,
    textAlign: "end"
})
