import {FC} from "react";
import {Stack, Typography} from "@components";
import {TransactionCard} from "@components/transaction-card";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {motion} from "framer-motion"
import {useGetTransactionsListQuery} from "@store/api.ts";

interface Props {
    accountId: number
}

export const TransactionList: FC<Props> = ({accountId}) => {
    const {data: transactionsList, isLoading} = useGetTransactionsListQuery(accountId)
    return <Stack
        vertical
        spacing={"s"}
    >
        {/*<Presence>*/}
        {
            isLoading
                ?
                <Typography>Loading...</Typography>
                : transactionsList && transactionsList.data.length > 0
                    ?
                    transactionsList.data.map((operation, index) => <motion.div
                        initial={{opacity: 0, scale: 0.8, filter: "blur(5px)"}}
                        animate={{opacity: 1, scale: 1, filter: "none"}}
                        transition={{duration: 0.4, delay: index * 0.1}}
                        className={sprinkles({alignSelf: "stretch"})}
                    >
                        <TransactionCard operation={operation}/>
                    </motion.div>)
                    :
                    <Typography>You dont have any transactions for that account.</Typography>
        }
        {/*</Presence>*/}
    </Stack>
}
