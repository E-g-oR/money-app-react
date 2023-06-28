import {FC} from "react";
import {Link} from "react-router-dom";
import * as styles from "./account-card.css"
import {AccountInList} from "@/types/accounts.ts";
import {Card, Container, Divider, Stack, Typography} from "@components";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {ROUTES} from "@utils/router.ts";


interface Props {
    account: AccountInList
}

export const AccountCard: FC<Props> = ({account}) =>
    <Link
        to={ROUTES.accounts.account.builder(account.id.toString())}
    >
        <Card>
            <Stack>
                <Container className={styles.accountMain}>
                    <Stack vertical>
                        <Typography>{account.name}</Typography>
                        <Typography as={"h3"}>{account.value}</Typography>
                    </Stack>
                </Container>
                <Divider vertical/>
                <Stack
                    vertical
                    spacing={"xxs"}
                    className={sprinkles({justifyContent: "space-between", alignSelf: "center"})}
                >
                    <Typography
                        className={sprinkles({marginX: "m"})}
                    >
                        Income: <Typography as={"span"} color={"success"}><span>{account.income}</span></Typography>
                    </Typography>
                    <Divider spacing={"xs"}/>
                    <Typography
                        className={sprinkles({marginX: "m"})}
                    >
                        Expense: <Typography as={"span"} color={"error"}><span>{account.expenses}</span></Typography>
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    </Link>
