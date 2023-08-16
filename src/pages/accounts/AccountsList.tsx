import {FC} from "react";
import {motion} from "framer-motion"
import {Stack} from "@components";
import {AccountCard} from "@pages/accounts/account/account-card/AccountCard.tsx";
import {AccountDto} from "@/types/API/data-contracts.ts";


interface Props {
    accounts: ReadonlyArray<AccountDto> | undefined
}

export const AccountsList: FC<Props> = ({accounts}) =>
    <Stack
        spacing={"s"}
        vertical
        alignItems={"stretch"}
    >
        {accounts?.map((account, index) => <motion.div
            initial={{opacity: 0, scale: 0.8, filter: "blur(5px)"}}
            animate={{opacity: 1, scale: 1, filter: "none"}}
            transition={{delay: index * 0.1}}
            key={account.id}
        >
            <AccountCard account={account}/>
        </motion.div>)}
    </Stack>
