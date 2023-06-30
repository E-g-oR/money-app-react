import {FC, useEffect, useState} from "react";
import {Button, IconButton, Input, Modal, Stack} from "@components";
import {useCreateAccountMutation} from "@store/api.ts";


export const AddAccountModal: FC = () => {

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
            title={"Create new account"}
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
                        placeholder={"account name"}
                        value={accountName}
                        onChange={setAccountName}
                        fullWidth
                    />
                    <Input
                        placeholder={"account value"}
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
                    >Confirm</Button>
                </Stack>
            </form>


        </Modal>
        <IconButton
            onClick={() => setIsOpen(true)}
            icon={"Add"}
        />
    </>
}
