import {FC, useEffect, useState} from "react";
import {Stack, Typography} from "@components";
import {AnimatePresence, motion} from "framer-motion";
import AccountNameHeader from "@pages/accounts/AccountNameHeader.tsx";
import AddTransactionModal from "@pages/accounts/AddTransactionModal.tsx";
import {
    useGetAccountQuery,
    useGetChartDataQuery,
    useGetChartFiltersQuery,
    useGetTransactionsListQuery
} from "@store/api.ts";
import {useParams} from "react-router-dom";
import List from "@components/list/List.tsx";
import {TransactionCard} from "@components/transaction-card";
import {useTranslation} from "@utils/hooks.ts";
import Tabs from "@components/tabs";

const accountPageTabs = ["transactions", "chart",] as const
const year = 2023
const month = 6
const AccountPage: FC = () => {
    const t = useTranslation()
    const params = useParams()

    const {data: chartData} = useGetChartDataQuery({year, month, view: "year"})

    useEffect(() => {
        console.log(chartData)
    }, [chartData])

    const {data: chartFilters} = useGetChartFiltersQuery(Number(params.accountId))

    const {data: account} = useGetAccountQuery(Number(params.accountId))

    const {
        data: pageableTransactions,
        isLoading: isLoadingTransactions
    } = useGetTransactionsListQuery(Number(params.accountId))

    const [tab, setTab] = useState<typeof accountPageTabs[number]>(accountPageTabs[0])

    return <Stack vertical spacing={"s"} alignItems={"stretch"}>


        <AnimatePresence>
            {account &&
                <motion.div
                    animate={{opacity: [0, 1]}}
                    transition={{duration: 0.3, easing: "ease-in"}}
                >
                    <AccountNameHeader
                        account={account}
                    />
                </motion.div>}
        </AnimatePresence>
        <Stack spacing={"xl"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography as={"h2"}>{account?.value ?? 0}</Typography>
            <Stack vertical spacing={"s"}>
                <Typography>{t.common.incomes}: {account?.income}</Typography>
                <Typography>{t.common.expenses}: {account?.expenses}</Typography>
            </Stack>
        </Stack>

        <Tabs value={tab} values={accountPageTabs} onChange={setTab} render={item => item}/>

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
    </Stack>
}

export default AccountPage
