import * as styles from "./app-header.css"
import {IconButton} from "@/components/button";
import {Container} from "@/components/container";
import {sprinkles} from "@/styles/sprinkles.css";
import {FC} from "react";
import {useNavigate} from "react-router-dom";

export const AppHeader: FC = () => {
    const navigate = useNavigate()

    return <div className={styles.header}>
        <Container>
            <div className={sprinkles({display: "flex", alignItems: "center", justifyContent: "space-between"})}>
                <IconButton
                    onClick={() => setIsDarkScheme(prev => !prev)}
                    icon={cog_6Tooth}
                    variant={"outline"}
                />
                <IconButton
                    onClick={() => navigate(ROUTES.profile.path)}
                    icon={user}
                    variant={"outline"}
                />
            </div>
        </Container>
    </div>
}
