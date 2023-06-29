import {FC, Suspense, useEffect} from "react";
import {AppHeader, Container, Stack} from "@components";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getTokens} from "@store/auth/auth.selector.ts";
import {useRefreshQuery} from "@store/auth/auth.api.ts";
import {ROUTES} from "@utils/router.ts";
import BottomNavigation from "@components/bottom-navigation";
import * as styles from "./layout.css.ts"

export const Layout: FC = () => {
    const navigate = useNavigate()
    const tokens = useSelector(getTokens)
    useRefreshQuery(tokens.refresh_token, {
        pollingInterval: 1000 * 60 * 10
    })
    useEffect(() => {
        if (!tokens.access_token) {
            navigate(ROUTES.auth.login.path)
        }
    }, [tokens.access_token, navigate])

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
