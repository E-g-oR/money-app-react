import {FC, useCallback, useState} from "react";
import {Button, IconButton, Input, Modal, Stack} from "@components";
import {useTranslation} from "@utils/hooks.tsx";
import Api from "@api";
import {CreateAccountDto} from "@/types/API/data-contracts.ts";

export const AddAccountModal: FC = () => {
    const t = useTranslation()

    const [isOpen, setIsOpen] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [accountValue, setAccountValue] = useState("")

    const closeModal = useCallback(() => {
        setIsOpen(false)
        setAccountName("")
        setAccountValue("")
    }, [setAccountName, setAccountValue, setIsOpen])

    const createAccount = useCallback((body: CreateAccountDto) => {
        Api.createAccount(body).then(() => {
            closeModal()
        })
    }, [closeModal])

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
                    description: ""
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
                                description: ""
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
