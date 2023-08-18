import {FC} from "react";

interface Props {
    max: number,
    value: number
}

const Progress: FC<Props> = ({max, value}) => <progress
    className={"appearance-none h-1.5 rounded overflow-hidden flex-1 w-full [&::-webkit-progress-value]:bg-success-600 [&::-moz-progress-bar]:bg-green-600 [&::-webkit-progress-bar]:bg-background-300"}
    value={value}
    max={max}
/>

export default Progress
