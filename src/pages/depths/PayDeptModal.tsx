import {FC, useCallback, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Api from "@api";
import {Button, Input, Modal, Select, Stack, Typography} from "@components";
import {useTranslation} from "@utils/hooks.tsx";
import useDataStore from "@store/data/data.slice.ts";
import {getAccountsList} from "@store/data/data.selectors.ts";
import {AccountDto, DeptDto} from "@/types/API/data-contracts.ts";

interface Props {
    dept: DeptDto
}

interface PayDeptForm {
    accountToPayFrom: AccountDto,
    valueToPay: string
}

const PayDeptModal: FC<Props> = ({dept}) => {
    const t = useTranslation()
    const accountsList = useDataStore(getAccountsList)

    const {control, handleSubmit, reset, getValues} = useForm<PayDeptForm>({
        defaultValues: {
            valueToPay: (dept.value - dept.valueCovered).toString(),
            accountToPayFrom: accountsList[0]
        }
    })

    const [isOpen, setIsOpen] = useState(false)

    const onSubmit: SubmitHandler<PayDeptForm> = useCallback(payDeptForm => {
        const value = parseFloat(payDeptForm.valueToPay)
        if (value <= dept.value - dept.valueCovered) {
            Api.payDept({
                value: parseFloat(payDeptForm.valueToPay),
                accountId: payDeptForm.accountToPayFrom.id
            }, dept.id, t.notifications.dept.updated).then(() => {
                setIsOpen(false)
                reset()
            })
        }
    }, [setIsOpen, reset, dept, t])

    return dept && accountsList.length ?
        <>
            <Modal
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                title={`${t.depts.payFor} "${dept.title}"`}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack vertical spacing={"s"}>
                        <Typography>
                            {t.depts.needsToCloseDept(dept.value - dept.valueCovered)}
                        </Typography>
                        <Controller control={control}
                                    name={"accountToPayFrom"}
                                    render={({field}) =>
                                        <Select
                                            variants={accountsList ?? []}
                                            renderVariants={(account: AccountDto) => <Typography
                                                as={"span"}>{account?.name} - {account?.value}</Typography>}
                                            {...field}
                                        />
                                    }
                        />
                        <Controller control={control}
                                    rules={{
                                        required: true,
                                        min: {value: 0.01, message: "Вы не можете заплатить 0"},
                                        max: {
                                            value: getValues("accountToPayFrom").value,
                                            message: "Вы не можете заплатить больше, чем есть на аккаунте"
                                        }
                                    }}
                                    name={"valueToPay"}
                                    render={({field, fieldState}) =>
                                        <Input
                                            isError={fieldState.invalid}
                                            {...field}
                                        />}
                        />
                        <Button
                            type={"submit"}
                            onClick={handleSubmit(onSubmit)}
                        >{t.actions.pay}</Button>
                    </Stack>
                </form>
            </Modal>
            <Button
                size={"sm"}
                variant={"outlined"}
                color={"secondary"}
                onClick={() => setIsOpen(true)}
            >{t.actions.pay}</Button>
        </>
        : null
}

export default PayDeptModal
