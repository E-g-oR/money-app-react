import * as styles from "./select.css"
import {sprinkles} from "@/styles/sprinkles.css";
import {Card} from "@/components/card";
import {Container} from "@/components/container";
import {Stack} from "@/components/stack";
import {ReactNode, useState} from "react";
import IconComponent from "@icons";

interface Props<T> {
    value: T;
    variants: ReadonlyArray<T>,
    renderVariants: (variant: T) => JSX.Element,
    onChange: (variant: T) => void,
}

function Select<T>({variants, renderVariants, value, onChange}: Props<T>): ReactNode {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return <div
        onClick={() => setIsOpen(prev => !prev)}
        className={styles.select}
    >
        <Card
            padding={"s"}
            className={sprinkles({cursor: "pointer"})}
            // variant={"outlined"}
        >
            <div
                className={sprinkles({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                })}>
                {renderVariants(value)}
                <IconComponent
                    icon={"ArrowDropdown"}
                    className={styles.chevron({isOpen})}
                />
            </div>
        </Card>
        {isOpen ? <Card padding={"s"} className={styles.list} variant={"outlined"}>
            <Stack vertical spacing={"xs"} alignItems={"stretch"}>
                {variants.map(item => <div onClick={() => onChange(item)} className={styles.item}>
                    <Container spacing={"xs"}>
                        {renderVariants(item)}
                    </Container>
                </div>)}
            </Stack>
        </Card> : null}
    </div>
}

export default Select
