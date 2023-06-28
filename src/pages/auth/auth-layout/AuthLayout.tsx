import {Component, JSX} from "solid-js";
import * as styles from "./auth-layout.css"
import {Outlet} from "@solidjs/router";
import {Stack, Card} from "@/components";

interface Props {
    children: JSX.Element | JSX.Element[]
}

const AuthLayout: Component = () => <div class={styles.layout}>
    <Card padding={"m"}>
        <Stack vertical>
            <Outlet/>
        </Stack>
    </Card>
</div>

export default AuthLayout
