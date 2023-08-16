import {FC} from "react";
import {Stack, Typography} from "@components";
import {AddAccountModal} from "@pages/accounts/AddAccountModal.tsx";
import {motion} from "framer-motion"
import List from "@components/list/List.tsx";
import {AccountCard} from "@pages/accounts/account/account-card/AccountCard.tsx";
import {useRequest, useTranslation} from "@utils/hooks.tsx";
import Api from "@/api";
import useDataStore from "@store/data/data.slice.ts";
import {getAccountsList} from "@store/data/data.selectors.ts";

const AccountsPage: FC = () => {
    const t = useTranslation()
    const accountsList = useDataStore(getAccountsList)

    const {isLoading} = useRequest(Api.getAccountsList, null)

    return <Stack vertical spacing={"m"}>
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <Stack justifyContent={"space-between"} alignItems={"center"}>
                <Typography as={"h2"}>{t.accounts.yourAccounts}</Typography>
                <AddAccountModal/>
            </Stack>
        </motion.div>
        <List
            data={accountsList}
            isLoading={isLoading}
            renderItem={account => <AccountCard account={account}/>}
            fallback={t.accounts.noAccountsFallback}
            getKey={item => item.id}
        />
    </Stack>
}


export default AccountsPage;
