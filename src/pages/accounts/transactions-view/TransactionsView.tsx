import {FC} from "react";
import {Stack, Typography} from "@components";
import AddTransactionModal from "@pages/accounts/AddTransactionModal.tsx";
import List from "@components/list";
import {TransactionCard} from "@components/transaction-card";
import {useTranslation} from "@utils/hooks.ts";
import {useGetTransactionsListQuery} from "@store/api.ts";

interface Props {
    accountId: number
}

const TransactionsView: FC<Props> = ({accountId}) => {

    const t = useTranslation()

    const {
        data: pageableTransactions,
        isLoading: isLoadingTransactions
    } = useGetTransactionsListQuery(accountId)

    return <>
        <Stack alignItems={"center"} justifyContent={"space-between"}>
            <Typography>{t.transactions.recentTransactions}</Typography>
            <AddTransactionModal/>
        </Stack>
        <List
            data={pageableTransactions?.data}
            isLoading={isLoadingTransactions}
            renderItem={transaction => <TransactionCard operation={transaction}/>}
            fallback={t.transactions.noTransactionsFallback}
            getKey={item => item.id}
        />
    </>
}

export default TransactionsView
