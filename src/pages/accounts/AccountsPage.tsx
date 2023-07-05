import {FC} from "react";
import {Stack, Typography} from "@components";
import {AddAccountModal} from "@pages/accounts/AddAccountModal.tsx";
import {motion} from "framer-motion"
import {useGetAccountsListQuery} from "@store/api.ts";
import List from "@components/list/List.tsx";
import {AccountCard} from "@pages/accounts/account-card/AccountCard.tsx";
import {useTranslation} from "@utils/hooks.ts";

const AccountsPage: FC = () => {
    const t = useTranslation()

    const {data: accountsList, isLoading: isLoadingAccountsList} = useGetAccountsListQuery("")
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
            isLoading={isLoadingAccountsList}
            renderItem={account => <AccountCard account={account}/>}
            fallback={t.accounts.noAccountsFallback}
            getKey={item => item.id}
        />
    </Stack>
}


export default AccountsPage;
