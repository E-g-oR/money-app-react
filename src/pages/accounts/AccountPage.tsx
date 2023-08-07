import {FC, useEffect, useMemo, useState} from "react";
import {Stack, Typography} from "@components";
import {AnimatePresence, motion} from "framer-motion";
import AccountNameHeader from "@pages/accounts/AccountNameHeader.tsx";
import {useParams} from "react-router-dom";
import {useRequest, useTranslation} from "@utils/hooks.ts";
import Tabs from "@components/tabs";
import TransactionsView from "@pages/accounts/transactions-view";
import useDataStore from "@store/data/data.slice.ts";
import {getAccountsById, getActiveAccountId, getSetActiveAccountId} from "@store/data/data.selectors.ts";
import Api from "@api";
import ChartView from "@pages/accounts/chart-view";

const accountPageTabs = ["transactions", "chart",] as const
const AccountPage: FC = () => {
    const t = useTranslation()
    const params = useParams<"accountId">()
    const setActiveAccountId = useDataStore(getSetActiveAccountId)

    useEffect(() => {
        setActiveAccountId(params.accountId ?? "")
    }, [params.accountId, setActiveAccountId])

    const accountId = useDataStore(getActiveAccountId)
    useRequest(Api.getAccount, accountId)

    const accountsById = useDataStore(getAccountsById)
    const account = useMemo(() => accountsById[accountId ?? 0], [accountId, accountsById])

    const [tab, setTab] = useState<typeof accountPageTabs[number]>(accountPageTabs[0])


    return <Stack
        vertical
        spacing={"s"}
        alignItems={"stretch"}
    >
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
        {tab === "chart"
            ? <ChartView accountId={parseInt(params.accountId ?? "")}/>
            // ? null
            : <TransactionsView accountId={Number(params.accountId)}/>}
    </Stack>
}

export default AccountPage
