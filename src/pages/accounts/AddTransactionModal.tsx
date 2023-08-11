import {Button, IconButton, Input, Modal, Select, Stack, Typography} from "@/components";
import {FC, useCallback, useState} from "react";
import {useParams} from "react-router-dom";
import {OperationType} from "@/types/accounts.ts";
import {useTranslation} from "@utils/hooks.tsx";
import Api from "@api";
import {CreateOperationDto} from "@/types/API/data-contracts.ts";

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
    const t = useTranslation()
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

    const createTransaction = useCallback((newTransaction: CreateOperationDto) => {
        Api.createTransaction(newTransaction, t.notifications.transaction.created).then(() => {
            setIsOpen(false)
            resetForm()
        })
    }, [setIsOpen, resetForm, t])

    return <>
        <IconButton
            onClick={() => setIsOpen(true)}
            icon={"Add"}
        />
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={t.transactions.createTransactionTitle}
        >
            <form onSubmit={e => {
                e.preventDefault()
                createTransaction({
                    value: Number(operationValue),
                    title,
                    description,
                    accountId: Number(params.accountId),
                    type: value.value
                })
            }}>
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
                        placeholder={t.common.value}
                        value={operationValue}
                        onChange={setOperationValue}
                    />
                    <Input fullWidth placeholder={t.common.title} value={title} onChange={setTitle}/>
                    <Input fullWidth placeholder={t.common.description} value={description} onChange={setDescription}/>
                    <Button
                        type={"submit"}
                        onClick={() => {
                            createTransaction({
                                value: Number(operationValue),
                                title,
                                description,
                                accountId: Number(params.accountId),
                                type: value.value
                            })
                        }}
                    >{t.actions.create}</Button>
                </Stack>
            </form>

        </Modal>

    </>
}

export default AddTransactionModal
