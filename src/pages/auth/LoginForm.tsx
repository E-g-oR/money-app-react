import {FC, useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "@utils/router.ts";
import {Button, Input, Stack, Typography} from "@components";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {AuthDto} from "@/types/api.ts";
import Api from "@/api";
import useAuthStore from "@store/auth/auth.slice.ts";


const LoginForm: FC = () => {
    const navigate = useNavigate()
    const setTokens = useAuthStore(store => store.setTokens)


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const sendLogin = useCallback(async (authDto: AuthDto) => {
        if (authDto.email && authDto.password) {
            Api
                .login(authDto)
                .then((tokens) => {
                    setTokens(tokens)
                    navigate("/")
                })
        }
    }, [setTokens, navigate])


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
                >Login</Button>
            </Stack>

        </form>

        <Typography>Dont have an account? <Link to={ROUTES.auth.register.path}>Register</Link> </Typography>
    </Stack>
}

export default LoginForm
