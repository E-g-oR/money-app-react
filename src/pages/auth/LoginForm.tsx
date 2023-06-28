import {Component, createSignal} from "solid-js";
import {A, useNavigate} from "@solidjs/router";
import {ROUTES} from "@/utils/router";
import {sprinkles} from "@/styles/sprinkles.css";
import auth from "@/api/auth";
import authStore from "@/store/authStore";
import {Button, Input, Stack, Typography} from "@/components";


const LoginForm: Component = () => {
    const navigate = useNavigate()
    const [email, setEmail] = createSignal("")
    const [password, setPassword] = createSignal("")

    const sendLogin = async () => {
        const tokens = await auth.login({email: email(), password: password()})
        if (tokens.access_token) {
            authStore.setAuthStore(() => tokens)
            navigate(ROUTES.main.path)
        }
    }

    return <Stack vertical spacing={"s"}>
        <Typography as={"h4"}>Login</Typography>
        <Input placeholder={"example@email.com"} value={email} onChange={setEmail}/>
        <Input placeholder={"Your password"} type={"password"} value={password}
               onChange={setPassword}/>
        <Button
            onClick={() => sendLogin()}
            className={sprinkles({alignSelf: "flex-end"})}
        >Login</Button>
        <Typography>Dont have an account? <A href={ROUTES.auth.register.path}>Register</A> </Typography>
    </Stack>
}

export default LoginForm
