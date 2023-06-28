import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "@pages/layout/Layout.tsx";
import {ROUTES} from "@utils/router.ts";
import AccountPage from "@pages/accounts/AccountPage.tsx";


const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [{
        path: ROUTES.accounts.account.relative,
        element: <AccountPage/>
    }]
}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
