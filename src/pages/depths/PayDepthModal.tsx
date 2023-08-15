import {Button, Input, Modal, Select, Stack, Typography} from "@components";
import {FC, useCallback, useEffect, useState} from "react";
import {useTranslation} from "@utils/hooks.tsx";
import Api from "@api";
import useDataStore from "@store/data/data.slice.ts";
import {getAccountsList} from "@store/data/data.selectors.ts";
import {AccountDto, DeptDto, PayDepthDto} from "@/types/API/data-contracts.ts";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

interface Props {
    dept: DeptDto
}

const getAmountToPay = (accountValue: number, depth: DeptDto): number => {
    const amountToPay = depth.value - depth.valueCovered
    return amountToPay > accountValue ? accountValue : amountToPay
}

interface PayDepthForm {
    accountToPayFrom: AccountDto,
    valueToPay: string
}

const PayDepthModal: FC<Props> = ({dept}) => {
    const t = useTranslation()
    const accountsList = useDataStore(getAccountsList)

    const {control, handleSubmit, getValues} = useForm<PayDepthForm>({
        defaultValues: {
            valueToPay: (dept.value - dept.valueCovered).toString(),
            accountToPayFrom: accountsList[0]
        }
    })


    const [isOpen, setIsOpen] = useState(false)
    const [accountToPayFrom, setAccountToPayFrom] = useState(accountsList?.[0])

    const [valueToPay, setValueToPay] = useState(
        getAmountToPay(accountToPayFrom?.value ?? 0, dept).toString()
    )

    const onClose = useCallback(() => {
        setIsOpen(false)
        setAccountToPayFrom(accountsList?.[0])
    }, [setAccountToPayFrom, setIsOpen, accountsList])

    const payDepth = useCallback((body: PayDepthDto) => {
        Api.payDepth(body, dept.id, t.notifications.dept.updated).then(() => {
            onClose()
        })
    }, [onClose, dept.id, t])

    useEffect(() => {
        setValueToPay(getAmountToPay(accountToPayFrom?.value ?? 0, dept).toString())
    }, [setValueToPay, accountToPayFrom?.value, dept, accountsList])

    const onSubmit: SubmitHandler<PayDepthForm> = useCallback(payDeptForm => {
        payDepth({value: parseFloat(payDeptForm.valueToPay), accountId: payDeptForm.accountToPayFrom.id})
    }, [payDepth, getValues])

    return dept &&
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

                        <Controller
                            control={control}
                            name={"accountToPayFrom"}
                            render={({field}) =>
                                <Select
                                    {...field}
                                    variants={accountsList ?? []}
                                    renderVariants={(account) => <span>{account?.name} - {account?.value}</span>}
                                />
                            }
                        />
                        <Controller
                            control={control}
                            name={"valueToPay"}
                            render={({field}) => <Input {...field}/>}
                        />
                        <Button
                            type={"submit"}
                            onClick={handleSubmit(onSubmit)}
                        >{t.actions.pay}</Button>
                    </Stack>
                </form>
            </Modal>
            <Button
                // isDisabled={Number(valueToPay) === 0}
                size={"xs"}
                variant={"outline"}
                color={"secondary"}
                onClick={() => setIsOpen(true)}
            >{t.actions.pay}</Button>
        </>
}

export default PayDepthModal
