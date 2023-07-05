import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {PersistGate} from "redux-persist/es/integration/react"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "@pages/layout/Layout.tsx";
import {ROUTES} from "@utils/router.ts";
import {Provider} from "react-redux";
import {persistor, store} from "@/store";
import ThemeProvider from "@components/theme-provider/ThemeProvider.tsx";
import {Typography} from "@components";
import ProfilePage from "@pages/profile/ProfilePage.tsx";

const
    LoginForm = lazy(() => import("@pages/auth/LoginForm.tsx")),
    RegisterForm = lazy(() => import( "@pages/auth/RegisterForm.tsx")),
    AccountPage = lazy(() => import("@pages/accounts/AccountPage.tsx")),
    AccountsPage = lazy(() => import("@pages/accounts/AccountsPage.tsx")),
    AuthLayout = lazy(() => import("@pages/auth/auth-layout/AuthLayout.tsx")),
    DepthsPage = lazy(() => import("@pages/depths/DepthsPage.tsx")),
    SettingsPage = lazy(()=> import("@pages/settings"))

const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [{
        index: true,
        element: <AccountsPage/>,
    }, {
        path: ROUTES.accounts.account.relative,
        element: <AccountPage/>,
    }, {
        path: ROUTES.depths.relative,
        element: <DepthsPage/>
    },{
        path: ROUTES.settings.relative,
        element: <SettingsPage/>
    },{
        path: ROUTES.profile.relative,
        element: <ProfilePage/>
    }]
},
    {
        path: ROUTES.auth.index.path,
        element: <AuthLayout/>,
        children: [{
            path: ROUTES.auth.login.relative,
            element: <LoginForm/>,
        }, {
            path: ROUTES.auth.register.relative,
            element: <RegisterForm/>
        }]
    }])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <Suspense fallback={<Typography as={"i"}>Loading...</Typography>}>
                        <RouterProvider router={router}/>
                    </Suspense>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
