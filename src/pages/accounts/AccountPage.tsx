import {FC} from "react";
import {Stack, Typography} from "@components";
import {AnimatePresence, motion} from "framer-motion";
import AccountNameHeader from "@pages/accounts/AccountNameHeader.tsx";
import AddTransactionModal from "@pages/accounts/AddTransactionModal.tsx";
import {TransactionList} from "@pages/accounts/transactions/TransactionList.tsx";
import {Account, Operation, OperationType} from "@/types/accounts.ts";

export const account: Account = {
    name: "test",
    value: 125,
    description: "asdfasdf",
    userId: 1,
    id: 1,
    expenses: 134,
    income: 1234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
}

const transactions: ReadonlyArray<Operation> = [{
    type: OperationType.INCOME,
    value: 1324,
    description: "asdfasdf",
    userId: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    id: 1,
    accountId: 1,
    title: "title"
}]

const AccountPage: FC = () => {

    return <Stack vertical spacing={"s"} alignItems={"stretch"}>


        <AnimatePresence>
            <motion.div
                animate={{opacity: [0, 1]}}
                transition={{duration: 0.3, easing: "ease-in"}}
            >
                <AccountNameHeader
                    account={account}
                />
            </motion.div>
        </AnimatePresence>

        <Stack spacing={"xl"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography as={"h2"}>{account?.value ?? 0}</Typography>
            <Stack vertical spacing={"s"}>
                <Typography>Income: {account?.income}</Typography>
                <Typography>Expense: {account?.expenses}</Typography>
            </Stack>
        </Stack>
        <Stack alignItems={"center"} justifyContent={"space-between"}>
            <Typography>Recent transactions</Typography>
            <AddTransactionModal/>
        </Stack>
        <TransactionList transactions={transactions}/>
    </Stack>
}

export default AccountPage
