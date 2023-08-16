import {forwardRef} from "react";
import {assignInlineVars} from "@vanilla-extract/dynamic";
import {clsx} from "@utils/etc.ts";
import {colorScheme} from "@styles/colorScheme.css.ts";
import * as styles from "./input.css"

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
    autofocus?: boolean
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
                                                       name
                                                   }, ref) => {
    return <label
        className={styles.label({fullWidth})}
        style={assignInlineVars({
            [styles.bg]: isError ? colorScheme.error.lightTransparent : colorScheme.background.light,
            [styles.bgFocus]: isError ? colorScheme.error.darkTransparent : colorScheme.background.dark,
            [styles.text]: isError ? colorScheme.error.normal : colorScheme.text.normal,
            [styles.decoratorBg]: isError ? colorScheme.error.normal : colorScheme.primary.normal
        })}>
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
                styles.input,
            )}
        />
        <div className={styles.decorator}/>
    </label>
})

// const InputComponent = memo(Input)
export default Input
