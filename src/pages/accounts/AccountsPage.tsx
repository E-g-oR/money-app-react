import {FC} from "react";
import {Stack, Typography} from "@components";
import {Link} from "react-router-dom";
import {AccountsList} from "@pages/accounts/AccountsList.tsx";
import {AddAccountModal} from "@pages/accounts/AddAccountModal.tsx";
import {m} from "framer-motion"

const AccountsPage: FC = () =>
    <>
        <Stack vertical spacing={"m"}>
            <Link to={ROUTES.depths.path}>Depths</Link>
            <m.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Typography as={"h2"}>Your accounts</Typography>
                <AddAccountModal/>
            </m.div>
            <AccountsList accounts={accounts}/>
        </Stack>
    </>


export default AccountsPage;
