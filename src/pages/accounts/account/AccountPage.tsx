import {FC, lazy, Suspense, useEffect, useMemo, useState} from "react";
import {Stack, Typography} from "@components";
import {AnimatePresence, motion} from "framer-motion";
import AccountNameHeader from "@pages/accounts/account/AccountNameHeader.tsx";
import {useParams} from "react-router-dom";
import {useRequest, useTranslation} from "@utils/hooks.tsx";
import Tabs from "@components/tabs";
import TransactionsView from "./transactions-view";
import useDataStore from "@store/data/data.slice.ts";
import {getAccountsById, getActiveAccountId, getSetActiveAccountId} from "@store/data/data.selectors.ts";
import Api from "@api";
import SavingInfoModal from "@pages/accounts/account/SavingInfoModal.tsx";
import AddSavingModal from "@pages/accounts/account/AddSavingModal.tsx";

const ChartView = lazy(() => import("./chart-view"))

const accountPageTabs = ["transactions", "chart",] as const
const AccountPage: FC = () => {
    const t = useTranslation()
    const params = useParams<"accountId">()
    const setActiveAccountId = useDataStore(getSetActiveAccountId)

    useEffect(() => {
        setActiveAccountId(params.accountId ?? "")
    }, [params.accountId, setActiveAccountId])

    const accountId = useDataStore(getActiveAccountId)
    useRequest(Api.getAccount, accountId ?? 0)

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
        {account?.saving ? <Stack alignItems={"center"} justifyContent={"space-between"}>
                <Typography
                    as={"h5"}
                >{account.saving.name}: <Typography
                    as={"span"}
                    fontWeight={"400"}
                >{account.saving.value}</Typography>
                </Typography>
                <SavingInfoModal/>

            </Stack> :
            <Stack justifyContent={"space-between"} alignItems={"center"}>
                <Typography>Add saving to this account</Typography>
                <Stack spacing={"s"}>
                    <SavingInfoModal/>
                    <AddSavingModal/>
                </Stack>
            </Stack>}

        <Tabs value={tab} values={accountPageTabs} onChange={setTab} render={item => item}/>
        <Suspense fallback={"loading"}>
            {tab === "chart"
                ? <ChartView accountId={parseInt(params.accountId ?? "")}/>
                : <TransactionsView accountId={Number(params.accountId)}/>}
        </Suspense>

    </Stack>
}
export default AccountPage
