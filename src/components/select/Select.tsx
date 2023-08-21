import {forwardRef, ReactNode, useRef, useState} from "react";
import {Popover} from "react-tiny-popover";
import {IconButton} from "@components";

interface Props<T> {
    value: T;
    variants: ReadonlyArray<T>,
    renderVariants: (variant: T) => ReactNode,
    onChange: (variant: T) => void,
}

const SelectComponent = forwardRef(function Select<T>({
                                                          variants,
                                                          renderVariants,
                                                          value,
                                                          onChange
                                                      }: Props<T>, ref): ReactNode {
        const [isOpen, setIsOpen] = useState<boolean>(false)

    const parentReef = useRef<HTMLDivElement>(null)

        return <Popover
            isOpen={isOpen}
            align={"center"}
            positions={["bottom", "top"]}
            containerStyle={{
                zIndex: "99",
                position: "absolute",
            }}
            content={({childRect}) => <div
                className={"z-50 bg-background-50 dark:bg-background-900 border border-background-200 dark:border-background-700 flex flex-col shadow-xl rounded-md py-2 transition max-h-44 overflow-y-auto"}
                style={{
                    width: childRect.width
                }}
            >
                {variants.map((item) => <button
                    onClick={()=> {
                        onChange(item)
                        setIsOpen(false)
                    }}
                    className={"text-left py-2 px-4 hover:bg-primary-500/30 transition text-background-900 dark:text-background-100"}>{renderVariants(item)}</button>)}
            </div>}
            onClickOutside={() => setIsOpen(false)}
        >
            <div
                ref={parentReef}
                className={"border border-background-200 dark:border-background-700 rounded-md pl-4 flex items-center justify-between"}
            >
                {renderVariants(value)}
                <IconButton
                    variant={"clean"}
                    color={"secondary"}
                    onClick={() => setIsOpen(prev => !prev)}
                    icon={"ArrowDropdown"}
                />
            </div>
        </Popover>
    }
)
export default SelectComponent
