import {FC, useEffect} from "react";
import {Stack, Typography} from "@components";
import AddTransactionModal from "@pages/accounts/AddTransactionModal.tsx";
import List from "@components/list";
import {TransactionCard} from "@components/transaction-card";
import {useTranslation} from "@utils/hooks.ts";
import useDataStore from "@store/data/data.slice.ts";
import {getTransactionsList} from "@store/data/data.selectors.ts";
import Api from "@api";

interface Props {
    accountId: number
}

const TransactionsView: FC<Props> = ({accountId}) => {

    const t = useTranslation()
    // const accountId = useDataStore(getActiveAccountId)
    const transactions = useDataStore(getTransactionsList)

    useEffect(() => {
        if (accountId) {
            Api.getTransactionsList(accountId)
        }
    }, [accountId])

    return <>
        <Stack alignItems={"center"} justifyContent={"space-between"}>
            <Typography>{t.transactions.recentTransactions}</Typography>
            <AddTransactionModal/>
        </Stack>
        <List
            data={transactions}
            isLoading={false}
            renderItem={transaction => <TransactionCard operation={transaction}/>}
            fallback={t.transactions.noTransactionsFallback}
            getKey={item => item.id}
        />
    </>
}

export default TransactionsView
