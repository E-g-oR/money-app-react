import {Button, Input, Modal, Select, Stack, Typography} from "@components";
import {FC, useCallback, useEffect, useState} from "react";
import {useTranslation} from "@utils/hooks.ts";
import Api from "@api";
import useDataStore from "@store/data/data.slice.ts";
import {getAccountsList} from "@store/data/data.selectors.ts";
import {DeptDto, PayDepthDto} from "@/types/API/data-contracts.ts";

interface Props {
    dept: DeptDto
}

const getAmountToPay = (accountValue: number, depth: DeptDto): number => {
    const amountToPay = depth.value - depth.valueCovered
    return amountToPay > accountValue ? accountValue : amountToPay
}

const PayDepthModal: FC<Props> = ({dept}) => {
    const t = useTranslation()
    const accountsList = useDataStore(getAccountsList)


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
            // console.log("\nSuccessfully paid")
            onClose()
        })
    }, [onClose, dept.id, t])

    useEffect(() => {
        setAccountToPayFrom(accountsList?.[0])
        setValueToPay(getAmountToPay(accountToPayFrom?.value ?? 0, dept).toString())
    }, [setValueToPay, accountToPayFrom?.value, dept, accountsList])


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
                                accountId: accountToPayFrom?.id
                            })
                        }
                    }}
                >
                    <Stack vertical spacing={"s"}>
                        <Typography>
                            {t.depts.needsToCloseDept(dept.value - dept.valueCovered)}
                        </Typography>
                        <Select
                            value={accountToPayFrom}
                            variants={accountsList ?? []}
                            renderVariants={(account) => <span>{account?.name} - {account?.value}</span>}
                            onChange={setAccountToPayFrom}
                        />
                        <Input value={valueToPay} onChange={setValueToPay}/>
                        <Button
                            type={"submit"}

                            onClick={() => {
                                if (accountToPayFrom) {
                                    payDepth({
                                        value: Number(valueToPay),
                                        accountId: accountToPayFrom?.id
                                    })
                                }
                            }}
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
