import {FC, useCallback, useState} from "react";
import {Button, IconButton, Input, Modal, Stack} from "@components";
import {useTranslation} from "@utils/hooks.tsx";
import Api from "@api";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

interface CreateAccountForm {
    accountName: string,
    accountDescription: string,
    accountValue: string
}

export const AddAccountModal: FC = () => {
    const t = useTranslation()

    const {handleSubmit, control, reset} = useForm<CreateAccountForm>({
        defaultValues: {
            accountName: "",
            accountDescription: "",
            accountValue: ""
        }
    })

    const [isOpen, setIsOpen] = useState(false)

    const onSubmit: SubmitHandler<CreateAccountForm> = useCallback((data) => {
        Api.createAccount({
            value: parseFloat(data.accountValue),
            name: data.accountName,
            description: data.accountDescription
        }).then(() => {
            setIsOpen(false)
            reset()
        })
    }, [setIsOpen, reset])

    return <>
        <Modal
            title={t.actions.create + " " + t.accounts.account}
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack vertical spacing={"s"}>
                    <Controller control={control}
                                rules={{
                                    required: true
                                }}
                                render={({field, fieldState}) => <Input
                                    placeholder={t.common.title}
                                    fullWidth
                                    isError={!!fieldState.error}
                                    {...field}
                                />}
                                name={"accountName"}
                    />
                    <Controller control={control}
                                render={({field}) => <Input
                                    placeholder={t.common.description}
                                    fullWidth
                                    {...field}
                                />}
                                name={"accountDescription"}
                    />
                    <Controller control={control}
                                render={({field}) => <Input
                                    placeholder={t.common.value}
                                    fullWidth
                                    type={"number"}
                                    {...field}
                                />}
                                name={"accountValue"}
                    />
                    <Button
                        type={"submit"}
                        onClick={handleSubmit(onSubmit)}
                    >{t.actions.create}</Button>
                </Stack>
            </form>


        </Modal>
        <IconButton
            onClick={() => setIsOpen(true)}
            icon={"Add"}
        />
    </>
}
