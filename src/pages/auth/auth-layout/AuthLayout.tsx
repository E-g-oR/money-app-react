import * as styles from "./auth-layout.css"
import {FC, useEffect} from "react";
import {Card, Stack} from "@components";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAccessToken} from "@store/auth/auth.selector.ts";
import {ROUTES} from "@utils/router.ts";


const AuthLayout: FC = () => {
    const navigate = useNavigate()
    const accessToken = useSelector(getAccessToken)

    useEffect(() => {
        if (accessToken) {
            navigate(ROUTES.main.path)
        }
    }, [accessToken, navigate])

    return <div className={styles.layout}>
        <Card padding={"m"}>
            <Stack vertical>
                <Outlet/>
            </Stack>
        </Card>
    </div>
}

export default AuthLayout
