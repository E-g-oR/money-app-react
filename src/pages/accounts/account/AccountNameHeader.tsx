import {FC, useCallback, useState} from "react";
import {IconButton, Input, Stack, Typography} from "@components";
import {useTranslation} from "@utils/hooks.tsx";
import {AccountDto} from "@/types/API/data-contracts.ts";
import {Controller, useForm} from "react-hook-form";

interface AccountEditForm {
    accountName: string,
    accountDescription: string
}

interface Props {
    account: AccountDto,
}

const AccountNameHeader: FC<Props> = ({account}) => {
    const t = useTranslation()
    const [isEdit, setIsEdit] = useState(false)

    const {control, reset, handleSubmit} = useForm<AccountEditForm>({
        defaultValues: {
            accountDescription: account.name,
            accountName: account.description
        }
    })

    const onSubmit = useCallback((accountEditForm: AccountEditForm) => {
        //     TODO: edit account
        reset()
    }, [reset]);



    return <Stack className={"items-start justify-between"}>
        <Stack vertical className={"gap-2"}>
            {isEdit
                ? <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2"}>
                    <Controller
                        control={control}
                        render={({field}) => <Input
                            placeholder={t.common.name}
                            {...field}
                        />}
                        name={"accountName"}
                    />
                    <Controller
                        control={control}
                        render={({field}) => <Input
                            placeholder={t.common.description}
                            {...field}
                        />}
                        name={"accountDescription"}
                    />
                </form>
                : <>
                    <Typography as={"h3"}>{account.name}</Typography>
                    <Typography>{account.description}</Typography>
                </>}
        </Stack>

        <IconButton
            variant={"outlined"}
            color={isEdit ? "success" : "primary"}
            onClick={() => setIsEdit(prev => !prev)}
            icon={isEdit ? "DoneIcon" : "Pencil"}
        />

    </Stack>
}

export default AccountNameHeader
