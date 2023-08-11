import {pipe} from "fp-ts/function";
import {match} from "ts-pattern";

export const clsx = (...classNames: ReadonlyArray<string | undefined>) => classNames.filter(Boolean).join(" ")

export const sizeRelative = (px: number) => `${px / 16}rem`

export const oneOf = <T extends string>(value: T) =>
    (variants: ReadonlyArray<T>) =>
        variants.some(variant => variant === value)


const multiplyBy10pow = (power: number) => (value: number) => value * Math.pow(10, power)
const divideBy10pow = (power: number) => (value: number) => value / Math.pow(10, power)

export const decimalPlaces = (value: number, precision: number) => match(precision)
    .with(0, () => Math.round(value))
    .when(a => a < 0, () => pipe(
        value,
        divideBy10pow(precision),
        Math.round
    ))
    .otherwise(() => pipe(
        value,
        multiplyBy10pow(precision),
        Math.round,
        divideBy10pow(precision)
    ))
