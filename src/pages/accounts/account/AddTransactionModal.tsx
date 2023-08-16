import {Button, IconButton, Input, Modal, Select, Stack, Typography} from "@components";
import {FC, useCallback, useState} from "react";
import {OperationType} from "@/types/accounts.ts";
import {useTranslation} from "@utils/hooks.tsx";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import useDataStore from "@store/data/data.slice.ts";
import {getActiveAccountId} from "@store/data/data.selectors.ts";
import Api from "@api";

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

interface AddTransactionForm {
    transactionType: OperationTypeValue,
    transactionValue: string,
    transactionTitle: string,
    transactionDescription: string
}

const AddTransactionModal: FC = () => {
    const t = useTranslation()
    const accountId = useDataStore(getActiveAccountId)

    const {handleSubmit, control, reset} = useForm<AddTransactionForm>({
        defaultValues: {
            transactionValue: "",
            transactionType: values[0],
            transactionDescription: "",
            transactionTitle: ""
        }
    })

    const [isOpen, setIsOpen] = useState(false)

    const onSubmit: SubmitHandler<AddTransactionForm> = useCallback(({
                                                                         transactionType,
                                                                         transactionValue,
                                                                         transactionTitle,
                                                                         transactionDescription
                                                                     }) => {
        Api.createTransaction({
            title: transactionTitle,
            description: transactionDescription,
            value: parseFloat(transactionValue),
            type: transactionType.value,
            accountId: accountId ?? 0,
        }, t.notifications.transaction.created).then(() => {
            setIsOpen(false)
            reset()
        })
    }, [accountId, t, reset])

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack vertical spacing={"s"}>
                    <Controller control={control}
                                name={"transactionType"}
                                render={({field}) => <Select
                                    {...field}
                                    variants={values}
                                    renderVariants={a => <Typography>{a.label}</Typography>}
                                />}
                    />
                    <Controller control={control}
                                rules={{
                                    required: true,
                                    min: 0.01
                                }}
                                name={"transactionValue"}
                                render={({field, fieldState}) => <Input
                                    isError={!!fieldState.error}
                                    type={"number"}
                                    fullWidth
                                    placeholder={t.common.value}
                                    {...field}
                                />}
                    />

                    <Controller control={control}
                                rules={{
                                    required: true
                                }}
                                render={({field, fieldState}) => <Input
                                    isError={!!fieldState.error}
                                    fullWidth
                                    placeholder={t.common.title}
                                    {...field}
                                />}
                                name={"transactionTitle"}
                    />
                    <Controller control={control}
                                render={({field}) => <Input fullWidth placeholder={t.common.description} {...field}/>}
                                name={"transactionDescription"}
                    />


                    <Button
                        type={"submit"}
                        onClick={handleSubmit(onSubmit)}
                    >{t.actions.create}</Button>
                </Stack>
            </form>

        </Modal>

    </>
}

export default AddTransactionModal
