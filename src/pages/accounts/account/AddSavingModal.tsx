import {FC, memo, useCallback, useState} from "react";
import {Button, IconButton, Modal, Select, Stack, Typography} from "@components";
import useDataStore from "@store/data/data.slice.ts";
import {getAccountsList, getActiveAccountId} from "@store/data/data.selectors.ts";
import {AccountDto} from "@/types/API/data-contracts.ts";
import {useTranslation} from "@utils/hooks.tsx";
import Api from "@api";

const AddSavingModal: FC = () => {
    const t = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const accountsList = useDataStore(getAccountsList)
    const accountId = useDataStore(getActiveAccountId)
    const [selectedAccount, setSelectedAccount] = useState(accountsList[0])

    const addSavingToAccount = useCallback(() => {
        if (accountId) {
            Api.addSavingToAccount(accountId, selectedAccount.id).then(() => {
                setIsOpen(false)
            })
        }
    }, [accountId, selectedAccount])

    return <>
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} title={"add saving to this account"}>
            <Stack vertical spacing={"s"}>
                <Select
                    value={selectedAccount}
                    variants={accountsList}
                    onChange={setSelectedAccount}
                    renderVariants={(account: AccountDto) => <Typography>{account.name}</Typography>}
                />
                <Button onClick={addSavingToAccount}>{t.actions.submit}</Button>
            </Stack>
        </Modal>
        <IconButton
            color={"secondary"}
            variant={"soft"}
            icon={"Add"}
            onClick={() => setIsOpen(true)}
        />
    </>
}
const AddSavingModalComponent = memo(AddSavingModal)

export default AddSavingModalComponent
