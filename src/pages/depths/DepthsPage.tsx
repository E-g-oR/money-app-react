import {FC} from "react";
import {Stack, Typography} from "@components";
import AddDepthModal from "@pages/depths/AddDepthModal.tsx";
import List from "@components/list/List.tsx";
import DepthCard from "@pages/depths/DepthCard.tsx";
import {useGetDepthsListQuery} from "@store/api.ts";
import {motion} from "framer-motion";

const DepthsPage: FC = () => {
    const {data: depthsList, isLoading: isLoadingDepths} = useGetDepthsListQuery(undefined)
    return <>
        <motion.div
            initial={{opacity: 0,}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <Stack spacing={"xs"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography as={"h2"}>
                    Your depths
                </Typography>
                <AddDepthModal/>
            </Stack>
        </motion.div>
        <List
            data={depthsList}
            isLoading={isLoadingDepths}
            renderItem={item => <DepthCard depth={item}/>}
            fallback={"You dont have any depths. Congratulations!"}
            getKey={depth => depth.id}
        />
    </>
}

export default DepthsPage
