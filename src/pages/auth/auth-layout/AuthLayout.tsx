import * as styles from "./auth-layout.css"
import {FC} from "react";
import {Card, Stack} from "@components";
import {Outlet} from "react-router-dom";


const AuthLayout: FC = () =>
    <div className={styles.layout}>
        <Card padding={"m"}>
            <Stack vertical>
                <Outlet/>
            </Stack>
        </Card>
    </div>

export default AuthLayout
