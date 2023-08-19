import {Card} from "@/components/card";
import {Container} from "@/components/container";
import {Stack} from "@/components/stack";
import {forwardRef, ReactNode, useState} from "react";
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
        return <div className={"relative"}>
            <Card variant={"outlined"} className={"px-4"}>
                <div ref={ref} className={"flex items-center justify-between"}>
                    {renderVariants(value)}
                    <IconButton
                        variant={"clean"}
                        onClick={() => setIsOpen(prev => !prev)}
                        icon={"ArrowDropdown"}
                    />
                </div>
            </Card>
            {isOpen ?
                <Card className={" z-10 absolute top-full w-full bg-background-100 dark:bg-background-900 shadow-lg max-h-44 overflow-y-auto"}
                      variant={"outlined"}>
                    <Stack vertical className={"gap-2 items-stretch"}>
                        {variants.map((item, index) => <button
                            key={index}
                            onClick={() => {
                                onChange(item)
                                setIsOpen(false)
                            }}
                            className={"self-stretch text-left focus:bg-primary-500/30 hover:bg-primary-500/30 py-2"}
                        >
                            <Container spacing={"xs"}>
                                {renderVariants(item)}
                            </Container>
                        </button>)}
                    </Stack>
                </Card> : null}
        </div>
    }
)
export default SelectComponent
