import {FC, useMemo} from "react";
import {Card} from "@/components/card";
import {Stack} from "@/components/stack";
import {Typography} from "@/components/typography";
import {Operation, OperationType} from "@/types/accounts";
import * as styles from "./transaction-card.css"
import {useTranslation} from "@utils/hooks.ts";

interface Props {
    operation: Operation
}

const TransactionCard: FC<Props> = ({operation}) => {
    const t = useTranslation()
    const relativeTime = useMemo(() => Date.parse(operation.created_at), [operation.created_at])

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
            <Stack vertical spacing={"xxs"}>
                <Typography
                    color={operation.type === OperationType.INCOME ? "success" : "error"}
                    fontWeight={"600"}>{operation.title}</Typography>
                <Typography colorTint={"light"} as={"small"}>{operation.description}</Typography>

            </Stack>
            <div title={t.formatDate.intlFormat(new Date(operation.created_at))}>
                <Typography as={"small"} className={styles.date}>
                    {t.formatDate.dateRelative(relativeTime)}
                </Typography>
            </div>

        </Stack>

    </Card>
}

export default TransactionCard;
