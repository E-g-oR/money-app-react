import {FC, Suspense} from "react";
import {AppHeader, Container} from "@components";
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
        ? <div className={"h-screen gap-y-3 sm:gap-y-5 grid grid-cols-1 sm:grid-cols-desktop grid-rows-mobile sm:grid-rows-desktop"}>
            {device.deviceType !== "mobile" && <SideNavigation/>}
            <AppHeader/>
            <div className={"flex-1 w-full sm:min-w-[360px]"}>

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


        </div>
        : <Navigate to={ROUTES.auth.login.path}/>
}
