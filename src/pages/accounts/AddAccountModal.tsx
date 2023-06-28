import {FC, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, IconButton, Input, Modal, Stack} from "@components";

interface Props {
    onConfirm: () => void;
}

export const AddAccountModal: FC<Props> = ({onConfirm}) => {
    const params = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [accountValue, setAccountValue] = useState("")

    const resetForm = () => {
        setAccountValue("")
        setAccountName("")
    }

    const onSubmit = async () => {
        if (Number(accountValue) || Number(accountValue) === 0) {
            onConfirm()
            setIsOpen(false)
            resetForm()
        }
    }

    return <>
        <Modal
            title={"Create new account"}
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
        >
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
                    onClick={onSubmit}
                >Confirm</Button>
            </Stack>
        </Modal>
        <IconButton
            onClick={() => setIsOpen(true)}
            icon={"CloseIcon"}
        />
    </>
}
