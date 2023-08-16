import {FC, memo, useMemo} from "react";
import {Card} from "@/components/card";
import {Stack} from "@/components/stack";
import {Typography} from "@/components/typography";
import {Operation, OperationType} from "@/types/accounts";
import * as styles from "./transaction-card.css"
import {useTranslation} from "@utils/hooks.tsx";

interface Props {
    operation: Operation
}

const TransactionCard: FC<Props> = ({operation}) => {
    const t = useTranslation()
    const relativeTime = useMemo(() => new Date(operation.created_at), [operation.created_at])

    return <Card
        className={styles.card}
        paddingY={"s"}
        paddingX={"l"}
        color={operation.type === OperationType.INCOME ? "success" : "error"}
        variant={"outlined"}
    >
        <div className={styles.decorator({type: operation.type})}/>
        <Stack spacing={"m"}>
            <Typography as={"h3"}>{operation.value}</Typography>
            <Stack vertical spacing={"xxs"} justifyContent={"space-between"}>
                <Typography
                    color={operation.type === OperationType.INCOME ? "success" : "error"}
                    fontWeight={"600"}>{operation.title}</Typography>
                <Typography colorTint={"light"} as={"small"}>{operation.description}</Typography>
            </Stack>
            <Typography
                as={"small"}
                className={styles.date}
                title={t.formatDate.intlFormat(new Date(operation.created_at))}
            >
                {t.formatDate.dateRelative(relativeTime)}
            </Typography>
        </Stack>
    </Card>
}
const TransactionCardComponent = memo(TransactionCard)
export default TransactionCardComponent;
