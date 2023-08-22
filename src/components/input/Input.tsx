import {forwardRef} from "react";
import {clsx} from "@utils/etc.ts";

type InputType = "text" | "password" | "email" | "number" | "search"

interface Props {
    type?: InputType
    label?: string,
    value: string | number,
    name?: string
    onChange: (value: string) => void,
    placeholder?: string
    isError?: boolean,
    fullWidth?: boolean
    autofocus?: boolean,
    className?: string
}

const Input = forwardRef<HTMLInputElement, Props>(({
                                                       type = "text",
                                                       value,
                                                       onChange,
                                                       label,
                                                       placeholder,
                                                       isError = false,
                                                       fullWidth,
                                                       autofocus,
                                                       name,
                                                       className,
                                                   }, ref) => {
    return <label className={fullWidth ? "flex-1" : ""}>
        {label}
        <input
            ref={ref}
            name={name}
            autoFocus={autofocus}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={clsx(
                "py-1 px-4 bg-transparent border focus:border-b-2 rounded outline-0 text-base transition",
                fullWidth ? "w-full" : "",
                isError ? "bg-error-500/20 text-error-500 border-error-500/50" : "focus:bg-primary-500/10 dark:border-background-700 focus:border-b-primary-500 dark:focus:border-b-primary-400",
                className
            )}
        />
    </label>
})

// const InputComponent = memo(Input)
export default Input
