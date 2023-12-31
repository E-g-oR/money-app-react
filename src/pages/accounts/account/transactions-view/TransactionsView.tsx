import {FC, memo} from "react";
import {Stack, Typography} from "@components";
import AddTransactionModal from "@pages/accounts/account/AddTransactionModal.tsx";
import List from "@components/list";
import {TransactionCard} from "@components/transaction-card";
import {useRequest, useTranslation} from "@utils/hooks.tsx";
import useDataStore from "@store/data/data.slice.ts";
import {getTransactionsList} from "@store/data/data.selectors.ts";
import Api from "@api";

interface Props {
    accountId: number
}

const TransactionsView: FC<Props> = ({accountId}) => {
    useRequest(Api.getTransactionsList, accountId)

    const t = useTranslation()
    const transactions = useDataStore(getTransactionsList)

    return <>
        <Stack className={"items-center justify-between"}>
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

const TransactionsViewComponent = memo(TransactionsView)

export default TransactionsViewComponent
