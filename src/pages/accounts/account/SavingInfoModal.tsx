import {FC, memo, useState} from "react";
import {IconButton, Modal, Typography} from "@components";

const SavingInfoModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    return <>
        <Modal
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
            title={"Saving best practices"}
        >
            <Typography>Основываясь на книге "Самый богатый человек в Вавилоне" мы предлагаем вам добавить к аккаунту
                своеобразную копилку, куда будут перечисляться:</Typography>
            <ul>
                <li><Typography>10% с каждой операции доходов</Typography></li>
                <li><Typography>остаток от округления в большую сторону с каждой операции расходов</Typography></li>
            </ul>
        </Modal>
        <IconButton
            color={"secondary"}
            variant={"clear"}
            onClick={() => setIsOpen(true)}
            icon={"Add"}
        />
    </>
}

const SaveInfoModalComponent = memo(SavingInfoModal)

export default SaveInfoModalComponent
