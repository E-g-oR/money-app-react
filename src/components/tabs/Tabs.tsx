import {Stack, Typography} from "@/components";
import * as styles from "./tabs.css"

export interface Tab {
    value: string | number;
    label: string;
}

interface Props<T> {
    value: T,
    values: ReadonlyArray<T>
    onChange: (value: T) => void,
    render: (value: T) => JSX.Element
}

function Tabs<T>({values, value, onChange, render}: Props<T>) {
    return <Stack spacing={"s"}>
        <For each={values}>
            {(tab) => <button
                onClick={() => onChange(tab)}
                class={styles.tab({isActive: tab === value()})}>
                <Typography>{render(tab)}</Typography>
            </button>}
        </For>
    </Stack>
}

export default Tabs;

interface TabProps {
    isActive: boolean;
}

