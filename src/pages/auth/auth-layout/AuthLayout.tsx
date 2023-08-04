import * as styles from "./auth-layout.css"
import {FC} from "react";
import {Card, Stack} from "@components";
import {Navigate, Outlet} from "react-router-dom";
import {getAccessToken} from "@store/auth/auth.selector.ts";
import useAuthStore from "@store/auth/auth.slice.ts";
import {ROUTES} from "@utils/router.ts";


const AuthLayout: FC = () => {
    const accessToken = useAuthStore(getAccessToken)

    return !accessToken
        ? <div className={styles.layout}>
            <Card padding={"m"}>
                <Stack vertical>
                    <Outlet/>
                </Stack>
            </Card>
        </div>
        : <Navigate to={ROUTES.main.path}/>
}

export default AuthLayout
