import {FC, useState} from "react";
import {IconButton, Input, Stack, Typography} from "@components";
import {Account} from "@/types/accounts.ts";

interface Props {
    account: Account,
}

const AccountNameHeader: FC<Props> = ({account}) => {

    const [isEdit, setIsEdit] = useState(false)
    const [newName, setNewName] = useState(account?.name)
    const [newDescription, setNewDescription] = useState(account?.description ?? "")


    return <Stack alignItems={"flex-start"} justifyContent={"space-between"}>
        <Stack vertical spacing={"s"}>
            {isEdit
                ? <>
                    <Input value={newName} onChange={setNewName}/>
                    <Input value={newDescription} onChange={setNewDescription}/>
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
            icon={isEdit ? "DoneIcon" : "UserIcon"}
        />

    </Stack>
}

export default AccountNameHeader
