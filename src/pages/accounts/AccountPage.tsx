import {FC} from "react";
import {useParams} from "react-router-dom";
import {Stack, Typography} from "@components";
import {AnimatePresence, m} from "framer-motion";
import AccountNameHeader from "@pages/accounts/AccountNameHeader.tsx";
import AddTransactionModal from "@pages/accounts/AddTransactionModal.tsx";
import {TransactionList} from "@pages/accounts/transactions/TransactionList.tsx";

const AccountPage:FC = () => {

    const params = useParams()
    // const [account, {refetch: refetchAccount}] = useSt(params?.accountId, getAccountById,)
    // const [transactions, {refetch: refetchTransactions}] = createResource<Pageable<Operation>>(
    //     {
    //         accountId: Number(params.accountId),
    //         page: 1
    //     }, getTransactionsByAccountId
    // )


    return <Stack vertical spacing={"s"} alignItems={"stretch"}>


        <AnimatePresence >
                <m.div
                    animate={{opacity: [0, 1]}}
                    transition={{duration: 0.3, easing: "ease-in"}}
                >
                    <AccountNameHeader
                        account={}
                    />
                </m.div>
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
            <AddTransactionModal />
        </Stack>
        <TransactionList transactions={transactions}/>
    </Stack>
}

export default AccountPage
