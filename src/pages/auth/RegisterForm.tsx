import {FC, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Input, Stack, Typography} from "@components";
import {ROUTES} from "@utils/router.ts";

const RegisterForm: FC = () => {
    // const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const registerFn = async () => {
        if (password === confirmPassword) {
            // const tokens = await auth.register({
            //     password: password,
            //     email: email,
            //     firstName: firstName,
            //     lastName: lastName,
            // })
            // if (tokens.access_token) {
            //     authStore.setAuthStore(tokens)
            //     navigate(ROUTES.main.path)
            // }
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
        <Typography>Already got an account? <Link to={ROUTES.auth.login.path}>Login</Link></Typography>
    </Stack>
}

export default RegisterForm
