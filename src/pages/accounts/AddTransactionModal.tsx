import {Button, IconButton, Input, Modal, Select, Stack, Typography} from "@/components";
import {FC, useCallback, useState} from "react";
import {useParams} from "react-router-dom";
import {OperationNew, OperationType} from "@types/accounts.ts";

interface OperationTypeValue {
    label: string;
    value: OperationType
}

const values: ReadonlyArray<OperationTypeValue> = [{
    label: "Expense",
    value: OperationType.EXPENSE,
}, {
    label: "Income",
    value: OperationType.INCOME,
},]


const AddTransactionModal: FC = () => {

    const params = useParams()
    const [isOpen, setIsOpen] = useState(false)

    const [value, setValue] = useState(values[0])
    const [operationValue, setOperationValue] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    const resetForm = useCallback(() => {
        setValue(values[0])
        setDescription("")
        setTitle("")
        setOperationValue("")
    }, [setValue, setDescription, setTitle, setOperationValue])

    const onConfirm = useCallback(async (newOperation: OperationNew) => {
        if (newOperation.value && newOperation.title) {
            // setOperations(prev => prev.concat(newOperation))
            // await createTransaction(newOperation)

            setIsOpen(false)
            resetForm()
        }
    }, [setIsOpen, resetForm])

    return <>
        <IconButton onClick={() => setIsOpen(true)} icon={"UserIcon"}/>
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={"Add new operation"}
        >
            <Stack vertical spacing={"s"}>
                <Select
                    value={value}
                    variants={values}
                    renderVariants={a => <Typography>{a.label}</Typography>}
                    onChange={setValue}
                />
                <Input
                    type={"number"}
                    fullWidth
                    placeholder={"value"}
                    value={operationValue}
                    onChange={setOperationValue}
                />
                <Input fullWidth placeholder={"title"} value={title} onChange={setTitle}/>
                <Input fullWidth placeholder={"description"} value={description} onChange={setDescription}/>
                <Button onClick={() => onConfirm({
                    value: Number(operationValue),
                    title,
                    description,
                    accountId: Number(params.accountId),
                    type: value.value
                })}>Confirm</Button>
            </Stack>
        </Modal>

    </>
}

export default AddTransactionModal
