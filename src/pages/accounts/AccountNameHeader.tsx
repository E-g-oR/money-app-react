import {FC, useState} from "react";
import {IconButton, Input, Stack, Typography} from "@components";
import {Account} from "@/types/accounts.ts";
import {useTranslation} from "@utils/hooks.ts";

interface Props {
    account: Account,
}

const AccountNameHeader: FC<Props> = ({account}) => {
    const t = useTranslation()
    const [isEdit, setIsEdit] = useState(false)
    const [newName, setNewName] = useState(account?.name)
    const [newDescription, setNewDescription] = useState(account?.description ?? "")


    return <Stack alignItems={"flex-start"} justifyContent={"space-between"}>
        <Stack vertical spacing={"s"}>
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
