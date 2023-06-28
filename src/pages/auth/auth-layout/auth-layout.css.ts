import {sprinkles} from "../../../styles/sprinkles.css";
import {style} from "@vanilla-extract/css";

export const layout = style([
    {
        width: "100%",
        height: "100%",
    },
    sprinkles({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    })])
