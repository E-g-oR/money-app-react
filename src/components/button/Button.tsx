import {clsx} from "@/utils/etc";
import {ButtonHTMLAttributes, FC} from "react";

export const buttonColor = {
    primary: {
        solid: "border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400 text-background-200 dark:text-background-900",
        outlined: "border-primary-500 dark:border-primary-400 fill-primary-500 dark:fill-primary-400 bg-transparent text-primary-500 dark:text-background-200 hover:bg-primary-500/30",
        soft: "text-primary-500 dark:text-primary-400 fill-primary-500 dark:fill-primary-400 border-primary-400/10 bg-primary-500/30 hover:bg-primary-500/50 dark:bg-primary-400/30 dark:hover:bg-primary-400/50",
        clean: "text-primary-500 fill-primary-500 dark:text-primary-400 border-transparent bg-transparent text-primary-500 dark:text-background-200 hover:bg-primary-500"
    },
    secondary: {
        solid: "border-secondary-500 bg-secondary-500 dark:border-secondary-400 dark:bg-secondary-400 text-background-200 dark:text-background-900",
        outlined: "text-secondary-500 fill-secondary-500 dark:text-secondary-400 border-secondary-500 dark:border-secondary-400 bg-transparent text-secondary-500 dark:text-background-200 hover:bg-secondary-500 dark:hover:bg-secondary-400 hover:text-background-200 dark:hover:text-background-800",
        soft: "text-secondary-500 dark:text-secondary-400 fill-secondary-500 dark:fill-secondary-400 border-secondary-400/10 bg-secondary-500/30 hover:bg-secondary-500/50 dark:bg-secondary-400/30 dark:hover:bg-secondary-400/50 ",
        clean: "text-secondary-500 fill-secondary-500 dark:text-secondary-400 border-transparent bg-transparent text-secondary-500 dark:text-background-200 hover:bg-secondary-500/30 dark:hover:bg-secondary-400/30"
    },
    success: {
        solid: "border-success-500 bg-success-500 dark:border-success-400 dark:bg-success-400 text-background-200 dark:text-background-900",
        outlined: "text-success-500 fill-success-500 dark:text-success-400 border-success-500 dark:border-success-400 bg-transparent text-success-500 dark:text-background-200 hover:bg-success-500 dark:hover:bg-success-400 hover:text-background-200 dark:hover:text-background-800",
        soft: "text-success-500 dark:text-success-400 fill-success-500 dark:fill-success-400 border-success-400/10 bg-success-500/30 hover:bg-success-500/50 dark:bg-success-400/30 dark:hover:bg-success-400/50 ",
        clean: "text-success-500 fill-success-500 dark:text-success-400 border-transparent bg-transparent text-success-500 dark:text-background-200 hover:bg-success-500/30 dark:hover:bg-success-400/30"
    },
    error: {
        solid: "border-error-500 bg-error-500 dark:border-error-400 dark:bg-error-400 text-background-200 dark:text-background-900",
        outlined: "text-error-500 fill-error-500 dark:text-error-400 border-error-500 dark:border-error-400 bg-transparent text-error-500 dark:text-background-200 hover:bg-error-500 dark:hover:bg-error-400 hover:text-background-200 dark:hover:text-background-800",
        soft: "text-error-500 dark:text-error-400 fill-error-500 dark:fill-error-400 border-error-400/10 bg-error-500/30 hover:bg-error-500/50 dark:bg-error-400/30 dark:hover:bg-error-400/50 ",
        clean: "text-error-500 fill-error-500 dark:text-error-400 border-transparent bg-transparent text-error-500 dark:text-background-200 hover:bg-error-500/30 dark:hover:bg-error-400/30"
    },
    warning: {
        solid: "border-warning-500 bg-warning-500 dark:border-warning-400 dark:bg-warning-400 text-background-200 dark:text-background-900",
        outlined: "text-warning-500 fill-warning-500 dark:text-warning-400 border-warning-500 dark:border-warning-400 bg-transparent text-warning-500 dark:text-background-200 hover:bg-warning-500 dark:hover:bg-warning-400 hover:text-background-200 dark:hover:text-background-800",
        soft: "text-warning-500 dark:text-warning-400 fill-warning-500 dark:fill-warning-400 border-warning-400/10 bg-warning-500/30 hover:bg-warning-500/50 dark:bg-warning-400/30 dark:hover:bg-warning-400/50 ",
        clean: "text-warning-500 fill-warning-500 dark:text-warning-400 border-transparent bg-transparent text-warning-500 dark:text-background-200 hover:bg-warning-500/30 dark:hover:bg-warning-400/30"
    },
}

const buttonSize = {
    sm: "py-0.5 px-2",
    md: "py-1 px-6",
    xl: "py-2 px-9"
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string,
    onClick: () => void,
    isLoading?: boolean,
    color?: keyof typeof buttonColor,
    variant?: keyof typeof buttonColor["primary"],
    size?: keyof typeof buttonSize
}

const Button: FC<Props> = ({
                               onClick,
                               isLoading,
                               children,
                               className,
                               color = "primary",
                               variant = "solid",
                               size = "md",
                               ...props
                           }) => {
    return <button
        {...props}
        onClick={onClick}
        className={clsx(
            "uppercase transition border-2 rounded-md self-start hover:shadow-md active:shadow-none backdrop-blur-md",
            buttonColor[color][variant],
            buttonSize[size],
            className
        )}
    >{children}</button>
}

export default Button
