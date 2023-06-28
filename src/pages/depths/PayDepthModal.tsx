import {Component, createEffect, createSignal, Show} from "solid-js";
import {Button, Input, Modal, Select, Stack, Typography} from "@/components";
import {Depth} from "@/types/depths";
import accountsStore from "@/store/accountsStore";

interface Props {
    depth: Depth
}

const getAmountToPay = (accountValue: number, depth: Depth): number => {
    const amountToPay = depth.value - depth.valueCovered
    return amountToPay > accountValue ? accountValue : amountToPay
}

const PayDepthModal: Component<Props> = ({depth}) => {
    const [isOpen, setIsOpen] = createSignal(false)

    const [accountToPayFrom, setAccountToPayFrom] = createSignal(accountsStore.accountsStore.accountsList[0])
    const [valueToPay, setValueToPay] = createSignal(
        getAmountToPay(accountToPayFrom()?.value ?? 0, depth).toString()
    )
    createEffect(()=>{
        setValueToPay(getAmountToPay(accountToPayFrom()?.value ?? 0, depth).toString())
    })
    return <Show when={depth}>
        <Modal
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
            title={`Pay for ${depth.title}`}
        >
            <Stack vertical spacing={"s"}>

            <Typography>{`Needs ${depth.value - depth.valueCovered} to close the depth.`}</Typography>
            <Input value={valueToPay} onChange={setValueToPay}/>
            <Select
                value={accountToPayFrom}
                variants={accountsStore.accountsStore.accountsList}
                renderVariants={(account) => <span>{account.name} - {account.value}</span>}
                onChange={setAccountToPayFrom}
            />
            </Stack>

        </Modal>
        <Button onClick={() => setIsOpen(true)}>Pay</Button>
    </Show>
}

export default PayDepthModal
