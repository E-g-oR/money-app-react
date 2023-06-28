import {createVar, styleVariants} from "@vanilla-extract/css";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {recipe} from "@vanilla-extract/recipes";

export type CardVariant = "outlined" | "soft" | "solid" | "plain"

export const bg = createVar()
export const bgLight = createVar()

const cardVariant: Record<CardVariant, string> = styleVariants({
    outlined: {
        backgroundColor: colorScheme.background.dark,
        borderColor: bgLight,
    },
    soft: {
        backgroundColor: bgLight,
        borderColor: bgLight,
    },
    solid: {
        backgroundColor: bg,
        borderColor: bg
    },
    plain: {
        backgroundColor: colorScheme.background.dark,
        borderColor: colorScheme.background.dark,
    },
})

export const card = recipe({
    base: [{
        // backgroundColor: colorScheme.background.dark,
        borderWidth: 1,
        borderStyle: "solid"
    }, sprinkles({
        // padding: "m",
        borderRadius: "m"
    })],
    variants: {
        variant: cardVariant
    },
    defaultVariants: {
        variant: "plain"
    }
})
