import {FC} from "react";
import {Stack, Typography} from "@components";
import {AnimatePresence, motion} from "framer-motion";
import AccountNameHeader from "@pages/accounts/AccountNameHeader.tsx";
import AddTransactionModal from "@pages/accounts/AddTransactionModal.tsx";
import {useGetAccountQuery, useGetTransactionsListQuery} from "@store/api.ts";
import {useParams} from "react-router-dom";
import List from "@components/list/List.tsx";
import {TransactionCard} from "@components/transaction-card";


const AccountPage: FC = () => {
    const params = useParams()
    const {data: account} = useGetAccountQuery(Number(params.accountId))

    const {
        data: pageableTransactions,
        isLoading: isLoadingTransactions
    } = useGetTransactionsListQuery(Number(params.accountId))

    return <Stack vertical spacing={"s"} alignItems={"stretch"}>


        <AnimatePresence>
            {
                account && <motion.div
                    animate={{opacity: [0, 1]}}
                    transition={{duration: 0.3, easing: "ease-in"}}
                >
                    <AccountNameHeader
                        account={account}
                    />
                </motion.div>
            }

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
        <List
            data={pageableTransactions?.data}
            isLoading={isLoadingTransactions}
            renderItem={transaction => <TransactionCard operation={transaction}/>}
            fallback={"You dont have any transactions for this account."}
            getKey={item => item.id}
        />
    </Stack>
}

export default AccountPage
