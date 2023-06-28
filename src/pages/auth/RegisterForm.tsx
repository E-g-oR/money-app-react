import {Component, createSignal} from "solid-js";
import {A, useNavigate} from "@solidjs/router";
import {ROUTES} from "@/utils/router";
import {Button, Input, Stack, Typography} from "@/components";
import auth from "@/api/auth";
import authStore from "@/store/authStore";

const RegisterForm: Component = () => {
    const navigate = useNavigate()

    const [firstName, setFirstName] = createSignal("")
    const [lastName, setLastName] = createSignal("")
    const [email, setEmail] = createSignal("")
    const [password, setPassword] = createSignal("")
    const [confirmPassword, setConfirmPassword] = createSignal("")

    const registerFn = async () => {
        if (password() === confirmPassword()) {
            const tokens = await auth.register({
                password: password(),
                email: email(),
                firstName: firstName(),
                lastName: lastName(),
            })
            if (tokens.access_token) {
                authStore.setAuthStore(tokens)
                navigate(ROUTES.main.path)
            }
        }
    }

    return <Stack vertical spacing={"s"}>
        <Typography as={"h4"}>Register</Typography>
        <Input
            placeholder={"First name"}
            value={firstName}
            onChange={setFirstName}
        />
        <Input
            placeholder={"Last name"}
            value={lastName}
            onChange={setLastName}
        />
        <Input
            type={"email"}
            placeholder={"Email"}
            value={email}
            onChange={setEmail}
        />
        <Input
            type={"password"}
            placeholder={"Password"}
            value={password}
            onChange={setPassword}
        />
        <Input
            type={"password"}
            placeholder={"Confirm password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
        />
        <Button
            onClick={registerFn}
        >Register</Button>
        <Typography>Already got an account? <A href={ROUTES.auth.login.path}>Login</A></Typography>
    </Stack>
}

export default RegisterForm
