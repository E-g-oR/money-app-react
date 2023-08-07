import {IconButton, Input, Stack, Typography} from "@/components";
import {FC, useState} from "react";
import {Button} from "@components";
import useAuthStore from "@store/auth/auth.slice.ts";

const ProfilePage: FC = () => {
    const setToken = useAuthStore(store => store.setToken)
    const [firstName, setFirstName] = useState("John")
    const [secondName, setSecondName] = useState("Wick")
    const [email, setEmail] = useState("j.wick@gmail.com")

    return <Stack
        vertical
        spacing={"l"}
    >
        <Typography as={"h3"}>Profile</Typography>
        <ProfileField
            title={"First name"}
            value={firstName}
            onSave={setFirstName}
        />
        <ProfileField
            title={"Second name"}
            value={secondName}
            onSave={setSecondName}
        />
        <ProfileField
            title={"Email"}
            value={email}
            onSave={setEmail}
        />
        <Button onClick={() => setToken("access", null)}>Log out</Button>
    </Stack>
}

export default ProfilePage

interface ProfileFieldProps {
    value: string,
    onSave: (newValue: string) => void,
    title: string,
}

const ProfileField: FC<ProfileFieldProps> = ({value, onSave, title}) => {
    const [newValue, setNewValue] = useState(value)
    const [isEdit, setIsEdit] = useState(false)

    return <Stack vertical spacing={"xs"}>
        <Typography as={"h5"}>{title}</Typography>
        <Stack
            spacing={"m"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            {isEdit
                ? <>
                    <Input
                        fullWidth
                        value={newValue}
                        onChange={setNewValue}
                    />
                    <IconButton
                        variant={"outline"}
                        color={"success"}
                        onClick={() => {
                            onSave(newValue)
                            setIsEdit(false)
                        }}
                        icon={"DoneIcon"}
                    />
                </>
                : <>
                    <Typography><span>{newValue}</span></Typography>
                    <IconButton
                        variant={"soft"}
                        color={"secondary"}
                        onClick={() => setIsEdit(true)}
                        icon={"Pencil"}
                    />
                </>}
        </Stack>
    </Stack>
}
