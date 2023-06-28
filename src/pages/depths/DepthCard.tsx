import {Component} from "solid-js";
import {Button, Card, Stack, Typography} from "@/components";
import {Depth} from "@/types/depths";
import Progress from "@/components/progress/Progress";
import * as styles from "./depths.css"
import PayDepthModal from "@/pages/depths/PayDepthModal";

interface Props {
    depth: Depth
}

const DepthCard: Component<Props> = ({depth}) => {
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
                <PayDepthModal depth={depth}/>
            </Stack>
        </Stack>
        <Progress max={depth.value} value={depth.valueCovered}/>
    </Card>
}

export default DepthCard
