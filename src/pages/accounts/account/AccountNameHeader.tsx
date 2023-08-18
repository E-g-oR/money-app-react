import {FC, useState} from "react";
import {IconButton, Input, Stack, Typography} from "@components";
import {useTranslation} from "@utils/hooks.tsx";
import {AccountDto} from "@/types/API/data-contracts.ts";

interface Props {
    account: AccountDto,
}

const AccountNameHeader: FC<Props> = ({account}) => {
    const t = useTranslation()
    const [isEdit, setIsEdit] = useState(false)
    const [newName, setNewName] = useState(account?.name)
    const [newDescription, setNewDescription] = useState(account?.description ?? "")


    return <Stack className={"items-start justify-between"}>
        <Stack vertical className={"gap-2"}>
            {isEdit
                ? <>
                    <Input
                        placeholder={t.common.name}
                        value={newName}
                        onChange={setNewName}
                    />
                    <Input
                        placeholder={t.common.description}
                        value={newDescription}
                        onChange={setNewDescription}
                    />
                </>
                : <>
                    <Typography as={"h3"}>{account.name}</Typography>
                    <Typography>{account.description}</Typography>
                </>}
        </Stack>

        <IconButton
            variant={"outline"}
            color={isEdit ? "success" : "primary"}
            onClick={() => setIsEdit(prev => !prev)}
            icon={isEdit ? "DoneIcon" : "Pencil"}
        />

    </Stack>
}

export default AccountNameHeader
