import {Button, Input, Modal, Select, Stack, Typography} from "@components";
import {Depth} from "@/types/depths";
import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getAccounts} from "@store/accounts/accounts.selector.ts";

interface Props {
    depth: Depth
}

const getAmountToPay = (accountValue: number, depth: Depth): number => {
    const amountToPay = depth.value - depth.valueCovered
    return amountToPay > accountValue ? accountValue : amountToPay
}

const PayDepthModal: FC<Props> = ({depth}) => {
    const accountsList = useSelector(getAccounts)

    const [isOpen, setIsOpen] = useState(false)

    const [accountToPayFrom, setAccountToPayFrom] = useState(accountsList?.[0])
    const [valueToPay, setValueToPay] = useState(
        getAmountToPay(accountToPayFrom?.value ?? 0, depth).toString()
    )
    useEffect(() => {
        setValueToPay(getAmountToPay(accountToPayFrom?.value ?? 0, depth).toString())
    }, [setValueToPay, accountToPayFrom?.value, depth])
    return depth &&
        <>
            <Modal
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                title={`Pay for "${depth.title}"`}
            >
                <Stack vertical spacing={"s"}>
                    <Typography>
                        Needs
                        <Typography as={"span"} fontWeight={"700"}>
                            {depth.value - depth.valueCovered}
                        </Typography>
                        to close the depth.
                    </Typography>
                    <Input value={valueToPay} onChange={setValueToPay}/>
                    <Select
                        value={accountToPayFrom}
                        variants={accountsList ?? []}
                        renderVariants={(account) => <span>{account?.name} - {account?.value}</span>}
                        onChange={setAccountToPayFrom}
                    />
                </Stack>

            </Modal>
            <Button
                variant={"outline"}
                color={"secondary"}
                onClick={() => setIsOpen(true)}
            >Pay</Button>
        </>
}

export default PayDepthModal
