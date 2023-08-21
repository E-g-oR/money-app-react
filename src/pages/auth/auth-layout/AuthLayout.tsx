// import * as styles from "./auth-layout.css"
import {FC} from "react";
import {Card, Stack} from "@components";
import {Navigate, Outlet} from "react-router-dom";
import {getAccessToken} from "@store/auth/auth.selector.ts";
import useAuthStore from "@store/auth/auth.slice.ts";
import {ROUTES} from "@utils/router.ts";


const AuthLayout: FC = () => {
    const accessToken = useAuthStore(getAccessToken)

    return !accessToken
        ? <div className={"w-screen h-screen flex items-center justify-center"}>
            <Card className={"p-4"}>
                <Stack vertical className={"gap-2"}>
                    <Outlet/>
                </Stack>
            </Card>
        </div>
        : <Navigate to={ROUTES.main.path}/>
}

export default AuthLayout
