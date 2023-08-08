import {FC, Suspense} from "react";
import {AppHeader, Container, Stack} from "@components";
import {Navigate, Outlet} from "react-router-dom";
import {getAccessToken} from "@store/auth/auth.selector.ts";
import {ROUTES} from "@utils/router.ts";
import BottomNavigation from "@components/bottom-navigation";
import * as styles from "./layout.css.ts"
import useAuthStore from "@store/auth/auth.slice.ts";
import NotificationContainer from "@components/notification/NotificationsContainer.tsx";

export const Layout: FC = () => {
    const access_token = useAuthStore(getAccessToken)

    return access_token
        ? <Stack vertical className={styles.layout}>
            <AppHeader/>
            <div className={styles.layoutContent}>
                <Container>
                    <Suspense fallback={"Loading..."}>
                        <Outlet/>
                    </Suspense>
                    <NotificationContainer/>
                </Container>
            </div>
            <BottomNavigation/>
        </Stack>
        : <Navigate to={ROUTES.auth.login.path}/>
}
