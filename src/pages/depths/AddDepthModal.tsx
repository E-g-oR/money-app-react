import {Button, IconButton, Input, Modal, Stack} from "@/components";
import {FC, useState} from "react";

const AddDepthModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [depthName, setDepthName] = useState("")
    const [depthValue, setDepthValue] = useState("")
    const [depthValueCovered, setDepthValueCovered] = useState("")
    const [depthDescription, setDepthDescription] = useState("")
    const onClose = () => {
        setDepthName("")
        setDepthValue("")
        setDepthValueCovered("")
        setDepthDescription("")
        setIsOpen(false)
    }



    return <>
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            title={"Add Depth"}
        >
            <form >
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
                        onClick={()=> {}}
                    >Confirm</Button>
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
