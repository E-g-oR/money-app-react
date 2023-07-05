import {Card, Stack, Typography} from "@components";
import {Dept} from "@/types/depths";
import * as styles from "./depths.css"
import {FC} from "react";
import PayDepthModal from "@pages/depths/PayDepthModal.tsx";
import Progress from "@components/progress/Progress.tsx";

interface Props {
    depth: Dept
}

const DepthCard: FC<Props> = ({depth}) => {
    return <Card padding={"s"}>
        <Stack spacing={"m"} justifyContent={"space-between"} alignItems={"flex-start"}>
            <Stack vertical spacing={"xs"}>
                <Typography as={"h5"}>{depth.title}</Typography>
                <Typography>{depth.description}</Typography>
            </Stack>
            <Stack alignItems={"flex-end"} spacing={"s"}>
                <Typography
                    as={"h4"}
                    className={styles.depthValue}
                >
                    {depth.valueCovered} / {depth.value}
                </Typography>
                {depth.value !== depth.valueCovered && <PayDepthModal dept={depth}/>}
            </Stack>
        </Stack>
        <Progress max={depth.value} value={depth.valueCovered}/>
    </Card>
}

export default DepthCard
