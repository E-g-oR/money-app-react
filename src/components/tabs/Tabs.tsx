import {Stack, Typography} from "@components";
import {memo, ReactNode} from "react";
import {motion} from "framer-motion"

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
    return <Stack className={"gap-2"}>
        {values.map((tab, index) =>
            <button
                key={index}
                onClick={() => onChange(tab)}
                className={"relative hover:bg-background-200 dark:hover:bg-background-800 px-3 py-2 rounded transition"}
            >
                <Typography>{render(tab)}</Typography>
                {value === tab && <motion.div
                    layoutId={"activeTab"}
                    className={"absolute h-1 w-1/2 left-1/4 bottom-0 rounded-t bg-primary-500"}
                />}
            </button>
        )}
    </Stack>
}

const TabsComponent = memo(Tabs)

export default TabsComponent;
