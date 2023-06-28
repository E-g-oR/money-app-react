import {Component, createSignal} from "solid-js";
import {Button, IconButton, Input, Modal, Stack} from "@/components";
import {plus} from "solid-heroicons/outline";
import {DepthNew} from "@/types/depths";
import depths from "@/api/depths";

const AddDepthModal: Component = () => {
    const [isOpen, setIsOpen] = createSignal(false)
    const [depthName, setDepthName] = createSignal("")
    const [depthValue, setDepthValue] = createSignal("")
    const [depthValueCovered, setDepthValueCovered] = createSignal("")
    const [depthDescription, setDepthDescription] = createSignal("")
    const onClose = () => {
        setDepthName("")
        setDepthValue("")
        setDepthValueCovered("")
        setDepthDescription("")
        setIsOpen(false)
    }

    const onSubmit = async (e: Event & { submitter: HTMLElement } & {
        currentTarget: HTMLFormElement,
        target: Element
    }) => {
        e.preventDefault()

        const newDepth: DepthNew = {
            title: depthName(),
            value: Number(depthValue()),
            valueCovered: Number(depthValueCovered()),
            description: depthDescription(),
            deadline: new Date().toISOString()
        }

        await depths.createDepth(newDepth)
        onClose()
    }

    return <>
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            title={"Add Depth"}
        >
            <form onSubmit={onSubmit}>
                <Stack vertical spacing={"s"}>
                    <Input
                        placeholder={"Title"}
                        value={depthName}
                        onChange={setDepthName}
                    />
                    <Input
                        placeholder={"Value"}
                        type={"number"}
                        value={depthValue}
                        onChange={setDepthValue}
                    />
                    <Input
                        placeholder={"Covered value"}
                        type={"number"}
                        value={depthValueCovered}
                        onChange={setDepthValueCovered}
                    />
                    <Input
                        placeholder={"Description"}
                        value={depthDescription}
                        onChange={setDepthDescription}
                    />
                    <Button
                        type={"submit"}
                        onClick={onSubmit}
                    >Confirm</Button>
                </Stack>
            </form>

        </Modal>
        <IconButton
            onClick={() => {
                setIsOpen(true)
            }}
            icon={plus}
        />
    </>
}

export default AddDepthModal
