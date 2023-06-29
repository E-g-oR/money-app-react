import {FC, useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "@utils/router.ts";
import {Button, Input, Stack, Typography} from "@components";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {useLoginMutation} from "@store/api.ts";
import {AuthDto} from "@/types/api.ts";


const LoginForm: FC = () => {
    // const navigate = useNavigate()

    const [loginMutation, {isLoading}] = useLoginMutation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const sendLogin = useCallback((authDto: AuthDto) => {
        if (authDto.email && authDto.password) {
            loginMutation(authDto)
        }
    }, [loginMutation])

    return <Stack vertical spacing={"s"}>
        <Typography as={"h4"}>Login</Typography>
        <form onSubmit={(e) => {
            e.preventDefault()
            sendLogin({email, password})
        }}>
            <Stack vertical spacing={"s"}>
                <Input placeholder={"example@email.com"} value={email} onChange={setEmail}/>
                <Input placeholder={"Your password"} type={"password"} value={password}
                       onChange={setPassword}/>
                <Button
                    type={"submit"}
                    onClick={() => sendLogin({
                        email,
                        password
                    })}
                    className={sprinkles({alignSelf: "flex-end"})}
                    isLoading={isLoading}
                >Login</Button>
            </Stack>

        </form>

        <Typography>Dont have an account? <Link to={ROUTES.auth.register.path}>Register</Link> </Typography>
    </Stack>
}

export default LoginForm
