import {colorScheme} from "@/styles/colorScheme.css";
import * as styles from "./button.css"
import {assignInlineVars} from "@vanilla-extract/dynamic";
import {clsx} from "@/utils/etc";
import {Color} from "../card/Card";
import {FC} from "react";

interface Props {
    children: string,
    onClick: () => void,
    variant?: styles.ButtonVariant,
    color?: Color,
    isDisabled?: boolean,
    isLoading?: boolean,
    size?: styles.ButtonSize,
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
                                      size = "xs",
                                      className,
                                      type = "button"
                                  }) => {

    return <button
        type={type}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        className={clsx(styles.button({variant, size}), className)}
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
    >{children}</button>
}

export default Button
