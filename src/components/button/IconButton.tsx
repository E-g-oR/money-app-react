import {colorScheme} from "@/styles/colorScheme.css";
import * as styles from "./button.css"
import {assignInlineVars} from "@vanilla-extract/dynamic";
import {clsx} from "@/utils/etc";
import {Color} from "../card/Card";
import {sprinkles} from "@/styles/sprinkles.css";
import {FC} from "react";
import IconComponent, {icons} from "@icons";
import {motion} from "framer-motion"

interface Props {
    onClick: () => void,
    variant?: styles.ButtonVariant,
    color?: Color,
    isDisabled?: boolean,
    isLoading?: boolean,
    size?: styles.ButtonSize,
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
            styles.iconButton({variant}),
            sprinkles({
                padding: size,
                borderRadius: "s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }),
            className
        )}
        style={assignInlineVars({
            [styles.text]: colorScheme.background.normal,
            [styles.textHover]: colorScheme.background.light,
            [styles.textActive]: colorScheme.background.dark,

            [styles.bg]: colorScheme[color].normal,
            [styles.bgHover]: colorScheme[color].light,
            [styles.bgActive]: colorScheme[color].dark,
            [styles.bgTransparent]: colorScheme[color].normalTransparent,
            [styles.bgTransparentHover]: colorScheme[color].lightTransparent,
            [styles.bgTransparentActive]: colorScheme[color].darkTransparent,
        })}
    >
        <IconComponent icon={icon} />
    </motion.button>
}

export default Button
