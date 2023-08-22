import {FC, Suspense} from "react";
import {AppHeader, Container, Stack} from "@components";
import {Navigate, Outlet} from "react-router-dom";
import {getAccessToken} from "@store/auth/auth.selector.ts";
import {ROUTES} from "@utils/router.ts";
import BottomNavigation from "@components/bottom-navigation";
import useAuthStore from "@store/auth/auth.slice.ts";
import NotificationContainer from "@components/notification/NotificationsContainer.tsx";
import {useDeviceType} from "@utils/responsive.ts";
import SideNavigation from "@components/side-navigation/SideNavigation.tsx";

export const Layout: FC = () => {
    const access_token = useAuthStore(getAccessToken)
    const device = useDeviceType()

    return access_token
        ? <Stack vertical={device.deviceType === "mobile"} className={"h-screen gap-y-3 sm:gap-y-5"}>
            {device.deviceType !== "mobile" && <SideNavigation/>}
            <div className={"flex-1 w-full sm:min-w-[360px]"}>
                <AppHeader/>
                <div className={"flex-1"}>
                    <Container>
                        <Suspense fallback={"Loading..."}>
                            <Outlet/>
                        </Suspense>
                        <NotificationContainer/>
                    </Container>
                </div>
            </div>

            {device.deviceType === "mobile" && <BottomNavigation/>}
        </Stack>
        : <Navigate to={ROUTES.auth.login.path}/>
}
