import {clsx} from "@/utils/etc";
import {FC} from "react";
import {motion} from "framer-motion"

interface Props {
    children: string,
    onClick: () => void,
    variant?: string,
    color?: string,
    isDisabled?: boolean,
    isLoading?: boolean,
    size?: string,
    className?: string
    type?: "submit" | "reset" | "button"
}

const Button: FC<Props> = ({
                               color = "primary",
                               variant,
                               onClick,
                               isLoading,
                               isDisabled,
                               children,
                               size = "m",
                               className,
                               type = "button"
                           }) => {

    return <motion.button
        whileTap={{
            scale: 0.95
        }}
        type={type}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        className={clsx("styles.button({variant, size})", className)}
    >{children}</motion.button>
}

export default Button
