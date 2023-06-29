import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "@pages/layout/Layout.tsx";
import {ROUTES} from "@utils/router.ts";
import AccountPage from "@pages/accounts/AccountPage.tsx";
import {Provider} from "react-redux";
import {persistor, store} from "@/store";
import ThemeProvider from "@components/theme-provider/ThemeProvider.tsx";
import AccountsPage from "@pages/accounts/AccountsPage.tsx";
import {PersistGate} from "redux-persist/es/integration/react"
import AuthLayout from "@pages/auth/auth-layout/AuthLayout.tsx";
import LoginForm from "@pages/auth/LoginForm.tsx";
import RegisterForm from "@pages/auth/RegisterForm.tsx";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [{
        index: true,
        element: <AccountsPage/>,
    }, {
        path: ROUTES.accounts.account.relative,
        element: <AccountPage/>,
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
                    <RouterProvider router={router}/>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
