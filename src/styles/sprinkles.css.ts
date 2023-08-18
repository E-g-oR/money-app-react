import {theme} from "./theme.css";

export const alignItems = [
    'stretch',
    'flex-start',
    'center',
    'flex-end'
] as const

export const justifyContent = [
    'stretch',
    'flex-start',
    'center',
    'flex-end',
    'space-around',
    'space-between'
] as const

const responsiveProperties = {
    conditions: {
        mobile: {},
        tablet: {'@media': 'screen and (min-width: 768px)'},
        desktop: {'@media': 'screen and (min-width: 1024px)'}
    },
    defaultCondition: 'mobile',
    responsiveArray: ["mobile", "tablet", "desktop"],
    properties: {
        display: ["initial", "flex", "block", "grid", "none"],
        flexDirection: ["row", "column", "row-reverse", "column-reverse"],
        justifyContent,
        alignItems,
        alignSelf: [
            'stretch',
            'flex-start',
            'center',
            'flex-end'
        ],
        // gridTemplateColumns: "",
        fontWeight: ["400", "500", "600", "700"],
        cursor: ["pointer", "not-allowed", "text"],

        paddingTop: theme.spacing,
        paddingBottom: theme.spacing,
        paddingRight: theme.spacing,
        paddingLeft: theme.spacing,
        padding: theme.spacing,

        marginTop: theme.spacing,
        marginBottom: theme.spacing,
        marginRight: theme.spacing,
        marginLeft: theme.spacing,
        margin: theme.spacing,

        gap: theme.spacing,

        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,
        borderBottomLeftRadius: theme.borderRadius,
        borderBottomRightRadius: theme.borderRadius,
        borderRadius: theme.borderRadius,

        fontSize: theme.fontSize,
    },
    shorthands: {
        paddingX: ["paddingLeft", "paddingRight"],
        paddingY: ["paddingTop", "paddingBottom"],

        marginX: ["marginLeft", "marginRight"],
        marginY: ["marginTop", "marginBottom"],

        borderTopRadius: ["borderTopLeftRadius", "borderTopRightRadius"],
        borderBottomRadius: ["borderBottomLeftRadius", "borderBottomRightRadius"],
        borderRightRadius: ["borderTopRightRadius", "borderBottomRightRadius"],
        borderLeftRadius: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    }
}

export const sprinkles =
    responsiveProperties

// It's a good idea to export the Sprinkles type too
// export type Sprinkles = Parameters<typeof sprinkles>[0];
