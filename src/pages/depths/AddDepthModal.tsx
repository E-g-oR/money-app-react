import {Button, IconButton, Input, Modal, Stack} from "@/components";
import {FC, useCallback, useState} from "react";
import {useTranslation} from "@utils/hooks.ts";
import Api from "@api";
import {CreateDepthDto} from "@/types/API/data-contracts.ts";

const AddDepthModal: FC = () => {
    const t = useTranslation()
    // const [createDepth, {isLoading, isSuccess}] = useCreateDepthMutation()

    const [isOpen, setIsOpen] = useState(false)
    const [depthName, setDepthName] = useState("")
    const [depthValue, setDepthValue] = useState("")
    const [depthValueCovered, setDepthValueCovered] = useState("")
    const [depthDescription, setDepthDescription] = useState("")

    const onClose = useCallback(() => {
        setDepthName("")
        setDepthValue("")
        setDepthValueCovered("")
        setDepthDescription("")
        setIsOpen(false)
    }, [setDepthName, setDepthValue, setDepthDescription, setDepthValueCovered, setIsOpen])

    const createDepth = useCallback((body: CreateDepthDto) => {
        Api.createDepth(body).then(() => {
            onClose()
        })
    }, [onClose])

    return <>
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            title={t.depts.createDept}
        >
            <form onSubmit={(e) => {
                e.preventDefault()
                createDepth({
                    value: Number(depthValue),
                    title: depthName,
                    description: depthDescription,
                    valueCovered: Number(depthValueCovered),
                    deadline: new Date().toISOString()
                })
            }}>
                <Stack vertical spacing={"s"}>
                    <Input
                        placeholder={t.common.title}
                        value={depthName}
                        onChange={setDepthName}
                    />
                    <Input
                        placeholder={t.common.value}
                        type={"number"}
                        value={depthValue}
                        onChange={setDepthValue}
                    />
                    <Input
                        placeholder={t.depts.coveredValue}
                        type={"number"}
                        value={depthValueCovered}
                        onChange={setDepthValueCovered}
                    />
                    <Input
                        placeholder={t.common.description}
                        value={depthDescription}
                        onChange={setDepthDescription}
                    />
                    <Button
                        size={"m"}
                        type={"submit"}
                        onClick={() => {
                            createDepth({
                                value: Number(depthValue),
                                title: depthName,
                                description: depthDescription,
                                valueCovered: Number(depthValueCovered),
                                deadline: new Date().toISOString()
                            })
                        }}
                    >{t.actions.create}</Button>
                </Stack>
            </form>

        </Modal>
        <IconButton
            onClick={() => {
                setIsOpen(true)
            }}
            icon={"Add"}
        />
    </>
}

export default AddDepthModal
