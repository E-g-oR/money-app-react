import {FC} from "react";
import {AppHeader, Container} from "@components";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {Outlet} from "react-router-dom";

export const Layout: FC = () => <div>
    <AppHeader/>
    <Container>
        <div className={sprinkles({paddingTop: "xxl"})}>
            <Outlet/>
        </div>
    </Container>
</div>
