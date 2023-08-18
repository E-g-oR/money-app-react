import {Card} from "@/components/card";
import {Container} from "@/components/container";
import {Stack} from "@/components/stack";
import {forwardRef, ReactNode, useState} from "react";
import IconComponent from "@icons";

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
        return <div
            onClick={() => setIsOpen(prev => !prev)}
        >
            <Card
                padding={"s"}
                variant={"outlined"}
            >
                <div

                    ref={ref}
                >
                    {renderVariants(value)}
                    <IconComponent
                        icon={"ArrowDropdown"}
                    />
                </div>
            </Card>
            {isOpen ? <Card padding={"s"} className={styles.list} variant={"outlined"}>
                <Stack vertical spacing={"xs"} alignItems={"stretch"}>
                    {variants.map((item, index) => <div
                        key={index}
                        onClick={() => onChange(item)}
                        className={styles.item}
                    >
                        <Container spacing={"xs"}>
                            {renderVariants(item)}
                        </Container>
                    </div>)}
                </Stack>
            </Card> : null}
        </div>
    }
)
export default SelectComponent
