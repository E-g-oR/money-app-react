import {Card} from "@/components/card";
import {Stack} from "@/components/stack";
import {Typography} from "@/components/typography";
import {IconButton} from "@/components/button";
import {FC, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";

interface Props {
    onClose: () => void;
    children: ReactNode,
    isOpen: boolean,
    title?: string
}


const Modal: FC<Props> = ({onClose, children, isOpen, title}) => {
    return <AnimatePresence>
        {isOpen && <motion.div
            className={"fixed top-0 left-0 backdrop-blur-md w-full h-full z-10 flex items-end sm:items-center justify-center"}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={(e) => {
                e.preventDefault()
                if (e.target === e.currentTarget) {
                    onClose()
                }
            }}>
            <motion.div
                className={"sm:max-w-lg w-full flex-1"}
                initial={{transform: "translateY(100%)", opacity: 0}}
                animate={{transform: "translateY(0)", opacity: 1}}
                exit={{transform: "translateY(100%)", opacity: 0}}
            >
                <Card variant={"outlined"} className={"shadow-2xl"}>
                    <Stack className={"gap-3 justify-between"}>
                        {title && <Typography as={"h4"}>{title}</Typography>}
                        <IconButton
                            variant={"outline"}
                            onClick={onClose}
                            icon={"CloseIcon"}
                        />
                    </Stack>
                    {children}
                </Card>
            </motion.div>
        </motion.div>}
    </AnimatePresence>
}

export default Modal;
