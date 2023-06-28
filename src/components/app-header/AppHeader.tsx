import * as styles from "./app-header.css"
import {IconButton} from "@/components/button";
import {Container} from "@/components/container";
import {sprinkles} from "@/styles/sprinkles.css";
import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@utils/router.ts";

export const AppHeader: FC = () => {
    const navigate = useNavigate()

    return <div className={styles.header}>
        <Container>
            <div className={sprinkles({display: "flex", alignItems: "center", justifyContent: "space-between"})}>
                <IconButton
                    onClick={() => setIsDarkScheme(prev => !prev)}
                    icon={"SettingsIcon"}
                    variant={"outline"}
                />
                <IconButton
                    onClick={() => navigate(ROUTES.profile.path)}
                    icon={"UserIcon"}
                    variant={"outline"}
                />
            </div>
        </Container>
    </div>
}
