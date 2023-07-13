import { Stack, Typography } from "@components";
import * as styles from "./tabs.css"
import {ReactNode} from "react";

export interface Tab {
    value: string | number;
    label: string;
}

interface Props<T> {
    value: T,
    values: ReadonlyArray<T>
    onChange: (value: T) => void,
    render: (value: T) => ReactNode
}

function Tabs<T>({values, value, onChange, render}: Props<T>) {
    return <Stack spacing={"s"}>
        {values.map((tab, index)=>
            <button
                key={index}
                onClick={()=> onChange(tab)}
                className={styles.tab({isActive: tab === value})}
            >
                <Typography>{render(tab)}</Typography>
            </button>
            )}
    </Stack>
}

export default Tabs;

interface TabProps {
    isActive: boolean;
}

