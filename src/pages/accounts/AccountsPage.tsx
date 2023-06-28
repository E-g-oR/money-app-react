import {FC} from "react";
import {Stack, Typography} from "@components";
import {Link} from "react-router-dom";
import {AccountsList} from "@pages/accounts/AccountsList.tsx";
import {AddAccountModal} from "@pages/accounts/AddAccountModal.tsx";
import {motion} from "framer-motion"
import {ROUTES} from "@utils/router.ts";
import {account} from "@pages/accounts/AccountPage.tsx";

const accounts = [account]

const AccountsPage: FC = () =>
    <>
        <Stack vertical spacing={"m"}>
            <Link to={ROUTES.depths.path}>Depths</Link>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Stack justifyContent={"space-between"} alignItems={"center"}>
                    <Typography as={"h2"}>Your accounts</Typography>
                    <AddAccountModal/>
                </Stack>
            </motion.div>
            <AccountsList accounts={accounts}/>
        </Stack>
    </>


export default AccountsPage;
