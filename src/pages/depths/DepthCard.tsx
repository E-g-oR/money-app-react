import {Card, Stack, Typography} from "@components";
import {FC, memo} from "react";
import PayDeptModal from "@pages/depths/PayDeptModal.tsx";
import Progress from "@components/progress/Progress.tsx";
import {DeptDto} from "@/types/API/data-contracts.ts";
import {clsx} from "@utils/etc.ts";

interface Props {
    depth: DeptDto
}

const DepthCard: FC<Props> = ({depth}) =>
    <Card className={clsx(
        "py-2 px-3",
        depth.valueCovered >= depth.value
            ? "opacity-50 grayscale"
            : ""
    )}>
        <Stack className={"items-start justify-between"}>
            <Stack vertical className={"gap-0.5"}>
                <Typography as={"h5"}>{depth.title}</Typography>
                <Typography>{depth.description}</Typography>
            </Stack>
            <Stack className={"gap-2 items-center"}>
                <Typography as={"h5"}>
                    {depth.valueCovered} / {depth.value}
                </Typography>
                {depth.value > depth.valueCovered && <PayDeptModal dept={depth}/>}
            </Stack>
        </Stack>
        <Progress max={depth.value} value={depth.valueCovered}/>
    </Card>

const DeptCardComponent = memo(DepthCard)

export default DeptCardComponent
