import {FC} from "react";
import {Link} from "react-router-dom";
import * as styles from "./account-card.css"
import {Card, Container, Divider, Stack, Typography} from "@components";
import {sprinkles} from "@styles/sprinkles.css.ts";
import {ROUTES} from "@utils/router.ts";
import {useTranslation} from "@utils/hooks.ts";
import {AccountDto} from "@/types/API/data-contracts.ts";


interface Props {
    account: AccountDto
}

export const AccountCard: FC<Props> = ({account}) => {
    const t = useTranslation()
    return <Link
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
                    className={styles.rightSide}
                >
                    <Typography
                        className={sprinkles({marginX: "m"})}
                    >
                        {t.common.incomes}: <Typography as={"span"} color={"success"}>{account.income}</Typography>
                    </Typography>
                    <Divider spacing={"xs"}/>
                    <Typography
                        className={sprinkles({marginX: "m"})}
                    >
                        {t.common.expenses}: <Typography as={"span"} color={"error"}>{account.expenses}</Typography>
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    </Link>
}
