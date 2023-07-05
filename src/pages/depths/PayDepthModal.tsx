import {Button, Input, Modal, Select, Stack, Typography} from "@components";
import {Dept} from "@/types/depths";
import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getAccounts} from "@store/accounts/accounts.selector.ts";
import {usePayDepthMutation} from "@store/api.ts";
import {useTranslation} from "@utils/hooks.ts";

interface Props {
    dept: Dept
}

const getAmountToPay = (accountValue: number, depth: Dept): number => {
    const amountToPay = depth.value - depth.valueCovered
    return amountToPay > accountValue ? accountValue : amountToPay
}

const PayDepthModal: FC<Props> = ({dept}) => {
    const t = useTranslation()
    const accountsList = useSelector(getAccounts)

    const [payDepth, {isSuccess}] = usePayDepthMutation()

    const [isOpen, setIsOpen] = useState(false)

    const [accountToPayFrom, setAccountToPayFrom] = useState(accountsList?.[0])
    const [valueToPay, setValueToPay] = useState(
        getAmountToPay(accountToPayFrom?.value ?? 0, dept).toString()
    )

    useEffect(() => {
        setValueToPay(getAmountToPay(accountToPayFrom?.value ?? 0, dept).toString())
    }, [setValueToPay, accountToPayFrom?.value, dept])

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false)
        }
    }, [isSuccess, setIsOpen])

    return dept &&
        <>
            <Modal
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                title={`${t.depts.payFor} "${dept.title}"`}
            >
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        if (accountToPayFrom) {
                            payDepth({
                                value: Number(valueToPay),
                                depthId: dept.id,
                                accountId: accountToPayFrom?.id
                            })
                        }
                    }}
                >
                    <Stack vertical spacing={"s"}>
                        <Typography>
                            {t.depts.needsToCloseDept(dept.value - dept.valueCovered)}
                        </Typography>
                        <Input value={valueToPay} onChange={setValueToPay}/>
                        <Select
                            value={accountToPayFrom}
                            variants={accountsList ?? []}
                            renderVariants={(account) => <span>{account?.name} - {account?.value}</span>}
                            onChange={setAccountToPayFrom}
                        />
                        <Button
                            type={"submit"}

                            onClick={() => {
                                if (accountToPayFrom) {
                                    payDepth({
                                        value: Number(valueToPay),
                                        depthId: dept.id,
                                        accountId: accountToPayFrom?.id
                                    })
                                }
                            }}
                        >{t.actions.pay}</Button>
                    </Stack>
                </form>
            </Modal>
            <Button
                size={"xs"}
                variant={"outline"}
                color={"secondary"}
                onClick={() => setIsOpen(true)}
            >{t.actions.pay}</Button>
        </>
}

export default PayDepthModal
