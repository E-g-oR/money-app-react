import {FC, useEffect} from "react";
import {AppHeader, Container} from "@components";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getTokens} from "@store/auth/auth.selector.ts";
import {useRefreshQuery} from "@store/auth/auth.api.ts";
import {ROUTES} from "@utils/router.ts";

export const Layout: FC = () => {
    const navigate = useNavigate()
    const tokens = useSelector(getTokens)
    useRefreshQuery(tokens.refresh_token, {
        pollingInterval: 1000 * 60 * 10
    })
    useEffect(() => {
        if (!tokens.access_token) {
            navigate(ROUTES.auth.login.path)
        }
    }, [tokens.access_token, navigate])

    return <div>
        <AppHeader/>
        <Container>
            <div className={sprinkles({paddingTop: "xxl"})}>
                <Outlet/>
            </div>
        </Container>
    </div>
}
