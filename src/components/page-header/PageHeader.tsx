import {FC, memo, ReactNode} from "react";
import {Stack, Typography} from "@components";
import {motion} from "framer-motion"

interface Props {
    header: string,
    icon?: ReactNode
}

const PageHeader: FC<Props> = ({header, icon}) => {
    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
        <Stack className={"items-center justify-between gap-2 mb-2"}>
            <Typography as={"h1"}>{header}</Typography>
            {icon}
        </Stack>
    </motion.div>
}
const PageHeaderComponent = memo(PageHeader)
export default PageHeaderComponent
