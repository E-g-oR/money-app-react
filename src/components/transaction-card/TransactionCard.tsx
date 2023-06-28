import * as styles from "./transaction-card.css"
import {Card} from "@/components/card";
import {Stack} from "@/components/stack";
import {Typography} from "@/components/typography";
import {Operation, OperationType} from "@/types/accounts";
import {formatDistanceToNow} from "date-fns"
import {FC} from "react";

interface Props {
    operation: Operation
}

const TransactionCard: FC<Props> = ({operation}) => {
    const relativeTime = Date.parse(operation.created_at)

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
            <Stack vertical spacing={"xs"}>
                <Typography
                    color={operation.type === OperationType.INCOME ? "success" : "error"}
                    fontWeight={"600"}>{operation.title}</Typography>
                <Typography colorTint={"light"} as={"small"}>{operation.description}</Typography>

            </Stack>
            <Typography as={"small"}>
                <span>
                    {formatDistanceToNow(relativeTime, {addSuffix: true})}
                </span>
            </Typography>
        </Stack>

    </Card>
}

export default TransactionCard;
