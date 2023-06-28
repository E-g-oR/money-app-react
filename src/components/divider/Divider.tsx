import * as styles from "./divider.css"
import {FC} from "react";
import {clsx} from "@utils/etc.ts";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {spacing} from "@styles/theme.css.ts";

interface Props {
    vertical?: boolean;
    spacing?: keyof typeof spacing;
}

export const Divider: FC<Props> = ({vertical, spacing }) =>
    <div
        className={clsx(styles.divider({vertical}), sprinkles({
            marginY: !vertical ? spacing : undefined,
            marginX: vertical ? spacing : undefined,
        }))}
    />

