import {ReactNode} from "react";
import {Stack, Typography} from "@components";
import {AnimatePresence, motion} from "framer-motion"

interface Props<T> {
    data: ReadonlyArray<T> | undefined,
    isLoading: boolean,
    renderItem: (item: T) => ReactNode,
    fallback: string,
    getKey: (item: T) => string | number
}

function List<T>({renderItem, isLoading, data, fallback, getKey}: Props<T>) {
    return <Stack vertical spacing={"s"}>
        <AnimatePresence>
            {isLoading && <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.8}}
            >
                <Typography as={"i"}>Loading...</Typography>
            </motion.div>}
            {!isLoading && data && data.length > 0
                ? data.map((item, index) => <motion.div
                    key={getKey(item)}
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                    transition={{delay: index * 0.1}}
                >
                    {renderItem(item)}
                </motion.div>)
                : <Typography as={"i"}>{fallback}</Typography>}
        </AnimatePresence>
    </Stack>
}

export default List
