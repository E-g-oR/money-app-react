import {Component} from "solid-js";
import AccountsPage from "@/pages/accounts/AccountsPage";
import {Tab} from "@/components/tabs/Tabs";
// import {AccountsPage} from "@/pages/accounts/AccountsPage";

const tabs: ReadonlyArray<Tab> = [{
    value: "accounts",
    label: "Accounts"
}, {
    value: "depts",
    label: "Depths"
}]

const Main: Component = () => {
    return <AccountsPage/>
}

export default Main
