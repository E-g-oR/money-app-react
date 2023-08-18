import {clsx} from "@/utils/etc";
import {FC} from "react";
import IconComponent, {icons} from "@icons";
import {motion} from "framer-motion"

interface Props {
    onClick: () => void,
    variant?: string,
    color?: string,
    isDisabled?: boolean,
    isLoading?: boolean,
    size?: string,
    className?: string,
    icon: keyof typeof icons
}

const Button: FC<Props> = ({
                                      color = "primary",
                                      variant,
                                      onClick,
                                      isLoading,
                                      isDisabled,
                                      size = "xxs",
                                      icon,
                                      className
                                  }) => {

    return <motion.button
        whileTap={{
            scale: 0.95
        }}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        className={clsx(
            "styles.iconButton({variant})",
            className
        )}

    >
        <IconComponent icon={icon} />
    </motion.button>
}

export default Button
