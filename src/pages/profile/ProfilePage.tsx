import {Component, createSignal, Show} from "solid-js";
import {IconButton, Input, Stack, Typography} from "@/components";
import {checkCircle, pencil} from "solid-heroicons/outline"

const ProfilePage: Component = () => {
    const [firstName, setFirstName] = createSignal("John")
    const [secondName, setSecondName] = createSignal("Wick")
    const [email, setEmail] = createSignal("j.wick@gmail.com")

    return <Stack
        vertical
        spacing={"l"}
    >
        <Typography as={"h3"}>Profile</Typography>
        <ProfileField
            title={"First name"}
            value={firstName()}
            onSave={setFirstName}
        />
        <ProfileField
            title={"Second name"}
            value={secondName()}
            onSave={setSecondName}
        />
        <ProfileField
            title={"Email"}
            value={email()}
            onSave={setEmail}
        />
    </Stack>
}

export default ProfilePage

interface ProfileFieldProps {
    value: string,
    onSave: (newValue: string) => void,
    title: string,
}

const ProfileField: Component<ProfileFieldProps> = ({value, onSave, title}) => {
    const [newValue, setNewValue] = createSignal(value)
    const [isEdit, setIsEdit] = createSignal(false)

    return <Stack vertical spacing={"xs"}>
        <Typography as={"h5"}>{title}</Typography>
        <Stack
            spacing={"m"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <Show
                when={isEdit()}
                fallback={<>
                    <Typography><span>{newValue()}</span></Typography>
                    <IconButton onClick={() => setIsEdit(true)} icon={pencil}/>
                </>}
            >
                <Input
                    fullWidth
                    value={newValue}
                    onChange={setNewValue}
                />
                <IconButton
                    onClick={() => {
                        onSave(newValue())
                        setIsEdit(false)
                    }}
                    icon={checkCircle}
                />
            </Show>
        </Stack>
    </Stack>
}
