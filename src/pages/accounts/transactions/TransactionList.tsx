import {Pageable} from "@types/api.ts";
import {Operation} from "@types/accounts.ts";
import {FC} from "react";
import {Stack} from "@components";
import {TransactionCard} from "@components/transaction-card";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {motion} from "framer-motion"

interface Props {
    transactions: ReadonlyArray<Operation>
}

export const TransactionList: FC<Props> = ({transactions}) => {
    return <Stack
        vertical
        spacing={"s"}
    >
        {/*<Presence>*/}

        {transactions.map((operation, index) => <motion.div
            initial={{opacity: 0, scale: 0.8, filter: "blur(5px)"}}
            animate={{opacity: 1, scale: 1, filter: "none"}}
            transition={{duration: 0.4, delay: index * 0.1}}
            className={sprinkles({alignSelf: "stretch"})}
        >
            <TransactionCard operation={operation}/>
        </motion.div>)}

        {/*</Presence>*/}
    </Stack>
}
