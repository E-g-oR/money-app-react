import {Component, For, Resource} from "solid-js";
import {Stack, Typography} from "@/components";
import {TransactionCard} from "@/components/transaction-card";
// import {AccountWithOperations} from "@/types/accounts";
import {Motion} from "@motionone/solid";
import {sprinkles} from "@/styles/sprinkles.css";
import {Operation} from "@/types/accounts";
import {Pageable} from "@/types/api";

interface Props {
    transactions: Resource<Pageable<Operation>>
}

export const TransactionList: Component<Props> = ({transactions}) => {
    return <Stack
        vertical
        spacing={"s"}
    >
        {/*<Presence>*/}
        <For each={transactions()?.data}
             fallback={
                 <Typography as={"i"}>You dont have any transaction for that account yet.</Typography>
             }
        >
            {(operation, index) => <Motion.div
                initial={{opacity: 0, scale: 0.8, filter: "blur(5px)"}}
                animate={{opacity: 1, scale: 1, filter: "none"}}
                transition={{duration: 0.4, delay: index() * 0.1}}
                class={sprinkles({alignSelf: "stretch"})}
            >
                <TransactionCard operation={operation}/>
            </Motion.div>}
        </For>
        {/*</Presence>*/}
    </Stack>
}
