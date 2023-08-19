import {clsx} from "@/utils/etc";
import {ButtonHTMLAttributes, FC} from "react";
import IconComponent, {icons} from "@icons";
import {buttonColor} from "@components/button/Button.tsx";

const iconButtonSize = {
    sm: "p-0.5",
    md: "p-1",
    xl: "p-2",
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void,
    variant?: keyof typeof buttonColor.primary,
    color?: keyof typeof buttonColor,
    isDisabled?: boolean,
    isLoading?: boolean,
    size?: keyof typeof iconButtonSize,
    className?: string,
    icon: keyof typeof icons
}

const Button: FC<Props> = ({
                               color = "primary",
                               variant = "outlined",
                               onClick,
                               isLoading,
                               isDisabled,
                               size = "md",
                               icon,
                               className,
                               ...props
                           }) => {

    return <button
        {...props}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        className={clsx(
            "border-2 rounded-md transition hover:shadow-md",
            buttonColor[color][variant],
            iconButtonSize[size],
            className
        )}
    >
        <IconComponent icon={icon}/>
    </button>
}

export default Button
