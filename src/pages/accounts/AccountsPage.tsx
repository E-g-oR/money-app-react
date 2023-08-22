import {FC} from "react";
import {Stack} from "@components";
import {AddAccountModal} from "@pages/accounts/AddAccountModal.tsx";
import List from "@components/list/List.tsx";
import {AccountCard} from "@pages/accounts/account/account-card/AccountCard.tsx";
import {useRequest, useTranslation} from "@utils/hooks.tsx";
import Api from "@/api";
import useDataStore from "@store/data/data.slice.ts";
import {getAccountsList} from "@store/data/data.selectors.ts";
import PageHeader from "@components/page-header/PageHeader.tsx";

const AccountsPage: FC = () => {
    const t = useTranslation()
    const accountsList = useDataStore(getAccountsList)

    const {isLoading} = useRequest(Api.getAccountsList, null)

    return <Stack vertical className={"gap-3"}>
        <PageHeader header={t.accounts.yourAccounts} icon={<AddAccountModal/>}/>
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
