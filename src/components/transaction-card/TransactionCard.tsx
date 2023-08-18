import {FC, memo, useMemo} from "react";
import {Card} from "@/components/card";
import {Stack} from "@/components/stack";
import {Typography} from "@/components/typography";
import {OperationType} from "@/types/accounts";
import {useTranslation} from "@utils/hooks.tsx";
import {OperationDto} from "@/types/API/data-contracts.ts";

interface Props {
    operation: OperationDto
}

const TransactionCard: FC<Props> = ({operation}) => {
    const t = useTranslation()
    const relativeTime = useMemo(() => new Date(operation.created_at), [operation.created_at])

    return <Card>
        <div className={""}/>
        <Stack className={"gap-3"}>
            <Typography as={"h3"}>{operation.value}</Typography>
            <Stack vertical className={"gap-2 justify-between"}>
                <Typography
                    color={operation.type === OperationType.INCOME ? "success" : "error"}
                    fontWeight={"600"}>{operation.title}</Typography>
                <Typography colorTint={"light"} as={"small"}>{operation.description}</Typography>
            </Stack>
            <Typography
                as={"small"}
                className={"text-xs flex-1 text-right"}
                title={t.formatDate.intlFormat(new Date(operation.created_at))}
            >
                {t.formatDate.dateRelative(relativeTime)}
            </Typography>
        </Stack>
    </Card>
}
const TransactionCardComponent = memo(TransactionCard)
export default TransactionCardComponent;
