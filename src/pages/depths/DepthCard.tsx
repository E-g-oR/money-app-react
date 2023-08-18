import {Card, Stack, Typography} from "@components";
import {FC, memo} from "react";
import PayDeptModal from "@pages/depths/PayDeptModal.tsx";
import Progress from "@components/progress/Progress.tsx";
import {DeptDto} from "@/types/API/data-contracts.ts";

interface Props {
    depth: DeptDto
}

const DepthCard: FC<Props> = ({depth}) =>
    <Card padding={"s"}>
        <Stack spacing={"m"} justifyContent={"space-between"} alignItems={"flex-start"}>
            <Stack vertical spacing={"xs"}>
                <Typography as={"h5"}>{depth.title}</Typography>
                <Typography>{depth.description}</Typography>
            </Stack>
            <Stack alignItems={"flex-end"} spacing={"s"}>
                <Typography
                    as={"h4"}
                >
                    {depth.valueCovered} / {depth.value}
                </Typography>
                {depth.value > depth.valueCovered && <PayDeptModal dept={depth}/>}
            </Stack>
        </Stack>
        <Progress max={depth.value} value={depth.valueCovered}/>
    </Card>

const DeptCardComponent = memo(DepthCard)

export default DeptCardComponent
