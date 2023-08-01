import {FC, Suspense, useEffect} from "react";
import {AppHeader, Container, Stack} from "@components";
import {Outlet, useNavigate} from "react-router-dom";
import {getAccessToken} from "@store/auth/auth.selector.ts";
import {ROUTES} from "@utils/router.ts";
import BottomNavigation from "@components/bottom-navigation";
import * as styles from "./layout.css.ts"
import useAuthStore from "@store/auth/auth-zustand.slice.ts";

export const Layout: FC = () => {
    const navigate = useNavigate()
    const access_token = useAuthStore(getAccessToken)

    useEffect(() => {
        if (!access_token) {
            navigate(ROUTES.auth.login.path)
        }
    }, [access_token, navigate])

    return <Stack vertical className={styles.layout}>
        <AppHeader/>
        <div className={styles.layoutContent}>
            <Container>
                <Suspense fallback={"Loading..."}>
                    <Outlet/>
                </Suspense>
            </Container>
        </div>
        <BottomNavigation/>
    </Stack>
}
