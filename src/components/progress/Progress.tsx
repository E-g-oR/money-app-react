import * as styles from "./progress.css"
import {FC} from "react";

interface Props {
    max: number,
    value: number
}

const Progress: FC<Props> = ({max, value}) => <progress
    className={styles.progress}
    value={value}
    max={max}
/>

export default Progress
