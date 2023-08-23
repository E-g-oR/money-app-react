import {FC, memo, useState} from "react";
import {IconButton, Modal, Stack, Typography} from "@components";
import {useTranslation} from "@utils/hooks.tsx";
import List from "@components/list";

const SavingInfoModal: FC = () => {
    const t = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    return <>
        <Modal
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
            title={t.savings.title}
        >
            <Stack vertical spacing={"m"}>
                <Typography>{t.savings.description}</Typography>
                <List
                    data={t.savings.bestPractices}
                    isLoading={false}
                    renderItem={a => a}
                    fallback={""}
                    getKey={a => a}
                />
            </Stack>

        </Modal>
        <IconButton
            color={"secondary"}
            variant={"clean"}
            onClick={() => setIsOpen(true)}
            icon={"Add"}
        />
    </>
}

const SaveInfoModalComponent = memo(SavingInfoModal)

export default SaveInfoModalComponent
