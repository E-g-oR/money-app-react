import {Button, IconButton, Input, Modal, Stack} from "@/components";
import {FC, useCallback, useState} from "react";
import {useTranslation} from "@utils/hooks.tsx";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Api from "@api";

interface CreateDepthModal {
    deptTitle: string
    deptDescription: string,
    deptValue: string,
    deptCoveredValue: string
}

const AddDepthModal: FC = () => {
    const t = useTranslation()

    const {handleSubmit, reset, control} = useForm<CreateDepthModal>({
        defaultValues: {
            deptTitle: "",
            deptDescription: "",
            deptValue: "",
            deptCoveredValue: "",
        }
    })

    const [isOpen, setIsOpen] = useState(false)

    const onSubmit: SubmitHandler<CreateDepthModal> = useCallback((data) => {
        Api.createDepth({
            value: parseFloat(data.deptValue),
            title: data.deptTitle,
            description: data.deptDescription,
            valueCovered: data.deptCoveredValue.length > 0 ? parseFloat(data.deptCoveredValue) : 0,
            deadline: new Date().toISOString()
        }).then(() => {
            setIsOpen(false)
            reset()
        })
    }, [setIsOpen, reset])

    return <>
        <Modal
            onClose={() => setIsOpen(false)}
            isOpen={isOpen}
            title={t.depts.createDept}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack vertical spacing={"s"}>
                    <Controller control={control}
                                rules={{
                                    required: true
                                }}
                                render={({field, fieldState}) => <Input
                                    placeholder={t.common.title}
                                    isError={fieldState.invalid}
                                    {...field}
                                />}
                                name={"deptTitle"}
                    />
                    <Controller control={control}
                                render={({field}) => <Input
                                    placeholder={t.common.description}
                                    {...field}
                                />}
                                name={"deptDescription"}
                    />
                    <Stack spacing={"m"}>
                        <Controller control={control}
                                    rules={{
                                        required: true,
                                        min: 0.01
                                    }}
                                    render={({field}) => <Input
                                        placeholder={t.common.value}
                                        type={"number"}
                                        fullWidth
                                        {...field}
                                    />}
                                    name={"deptValue"}
                        />
                        <Controller control={control}
                                    render={({field}) => <Input
                                        placeholder={t.depts.coveredValue}
                                        type={"number"}
                                        fullWidth
                                        {...field}
                                    />}
                                    name={"deptCoveredValue"}
                        />
                    </Stack>


                    <Button
                        size={"m"}
                        type={"submit"}
                        onClick={handleSubmit(onSubmit)}
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
