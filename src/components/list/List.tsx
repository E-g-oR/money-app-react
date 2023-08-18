import {ReactNode} from "react";
import {Stack, Typography} from "@components";
import {motion} from "framer-motion"
import {useTranslation} from "@utils/hooks.tsx";
// import * as styles from "./list.css.ts"

interface Props<T> {
    data: ReadonlyArray<T> | undefined,
    isLoading: boolean,
    renderItem: (item: T) => ReactNode,
    fallback: string,
    getKey: (item: T) => string | number
}

function List<T>({renderItem, isLoading, data, fallback, getKey}: Props<T>) {
    const t = useTranslation()
    return <Stack vertical spacing={"s"}>
        {isLoading && <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
        >
            <Typography as={"i"}>{t.common.loading}...</Typography>
        </motion.div>}
        <Stack vertical className={"gap-2 md:gap-3"}>
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
        </Stack>

    </Stack>
}

export default List
