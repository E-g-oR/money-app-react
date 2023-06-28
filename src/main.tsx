import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "@pages/layout/Layout.tsx";
import {ROUTES} from "@utils/router.ts";
import AccountPage from "@pages/accounts/AccountPage.tsx";
import {Provider} from "react-redux";
import {store} from "@/store";
import ThemeProvider from "@components/theme-provider/ThemeProvider.tsx";
import AccountsPage from "@pages/accounts/AccountsPage.tsx";


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
}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)
