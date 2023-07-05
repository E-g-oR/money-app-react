import {FC, useEffect, useState} from "react";
import {Button, IconButton, Input, Modal, Stack} from "@components";
import {useCreateAccountMutation} from "@store/api.ts";
import {useTranslation} from "@utils/hooks.ts";


export const AddAccountModal: FC = () => {
    const t = useTranslation()
    const [createAccount, {isSuccess}] = useCreateAccountMutation()

    const [isOpen, setIsOpen] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [accountValue, setAccountValue] = useState("")

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false)
            setAccountName("")
            setAccountValue("")
        }
    }, [isSuccess, setAccountName, setAccountValue, setIsOpen])

    return <>
        <Modal
            title={t.actions.create + " " + t.accounts.account}
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
        >
            <form onSubmit={e => {
                e.preventDefault()
                createAccount({
                    value: Number(accountValue),
                    name: accountName,
                })
            }}>
                <Stack vertical spacing={"s"}>
                    <Input
                        placeholder={t.common.title}
                        value={accountName}
                        onChange={setAccountName}
                        fullWidth
                    />
                    <Input
                        placeholder={t.common.value}
                        type={"number"}
                        value={accountValue}
                        onChange={setAccountValue}
                        fullWidth
                    />
                    <Button
                        type={"submit"}
                        onClick={() => {
                            createAccount({
                                value: Number(accountValue),
                                name: accountName,
                            })
                        }}
                    >{t.actions.create}</Button>
                </Stack>
            </form>


        </Modal>
        <IconButton
            onClick={() => setIsOpen(true)}
            icon={"Add"}
        />
    </>
}
