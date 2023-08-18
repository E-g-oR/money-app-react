// import {sprinkles} from "@/styles/sprinkles.css";
import {Card} from "@/components/card";
// import * as styles from "./modal.css"
import {Stack} from "@/components/stack";
import {Typography} from "@/components/typography";
import {IconButton} from "@/components/button";
import {FC, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {clsx} from "@utils/etc.ts";

interface Props {
    onClose: () => void;
    children: ReactNode,
    isOpen: boolean,
    title?: string
}


const Modal: FC<Props> = ({onClose, children, isOpen, title}) => {
    return <AnimatePresence>
        {isOpen && <motion.div
            // key={"modal"}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            // className={styles.overlay}
            onClick={(e) => {
                e.preventDefault()
                if (e.target === e.currentTarget) {
                    onClose()
                }
            }}>
            <motion.div
                // className={clsx(styles.shadow, styles.modal)}
                initial={{transform: "translateY(100%)", opacity: 0}}
                animate={{transform: "translateY(0)", opacity: 1}}
                exit={{transform: "translateY(100%)", opacity: 0}}
            >
                <Card padding={"l"} variant={"outlined"}>
                    <Stack
                        // className={sprinkles({marginBottom: "l"})}
                        spacing={"m"}
                    >
                        {title && <Typography as={"h4"}>{title}</Typography>}

                        <IconButton
                            variant={"outline"}
                            onClick={onClose}
                            icon={"CloseIcon"}
                            // className={styles.closeBtn}
                        />
                    </Stack>
                    {children}
                </Card>
            </motion.div>
        </motion.div>}
    </AnimatePresence>

}

export default Modal;
