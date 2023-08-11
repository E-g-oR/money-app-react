import {FC} from "react";
import {Stack, Typography} from "@components";
import AddDepthModal from "@pages/depths/AddDepthModal.tsx";
import List from "@components/list/List.tsx";
import DepthCard from "@pages/depths/DepthCard.tsx";
import {motion} from "framer-motion";
import {useRequest, useTranslation} from "@utils/hooks.tsx";
import Api from "@api";
import useDataStore from "@store/data/data.slice.ts";
import {getDeptsList} from "@store/data/data.selectors.ts";

const DepthsPage: FC = () => {
    useRequest(Api.getDepthList, null)
    const t = useTranslation()

    const depthsList = useDataStore(getDeptsList)

    return <>
        <motion.div
            initial={{opacity: 0,}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <Stack spacing={"xs"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography as={"h2"}>
                    {t.depts.yourDepts}
                </Typography>
                <AddDepthModal/>
            </Stack>
        </motion.div>
        <List
            data={depthsList}
            isLoading={false}
            renderItem={item => <DepthCard depth={item}/>}
            fallback={t.depts.noDepthsFallback}
            getKey={depth => depth.id}
        />
    </>
}

export default DepthsPage
