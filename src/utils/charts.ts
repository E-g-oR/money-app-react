import {coerceNumber, scaleLinear, scaleTime} from "@visx/scale";
import {extent} from "@visx/vendor/d3-array";
import {pipe} from "fp-ts/function";
import * as D from "fp-ts/Date";
import * as A from "fp-ts/ReadonlyArray";
import {ChartDataDto, ChartPointDto} from "@/types/API/data-contracts.ts";

export const getX = (d: ChartPoint) => d.date
export const getY = (d: ChartPoint) => d.value

// scales
/**
 * Scale X time for chart
 * @param allData
 */
export const getXScale = (allData: ReadonlyArray<ChartPoint>) => scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date],
    // nice: true,
})


const getYDomain = (allData: ReadonlyArray<ChartPoint>) => {
    const values = allData.map(i=>i.value),
        min = Math.min(...values),
        max = Math.max(...values)
    return [min, max]
}

/**
 * Scale Y value for chart
 * @param allData
 */
export const getYScale = (allData: ReadonlyArray<ChartPoint>) => scaleLinear<number>({
    domain: getYDomain(allData),
    nice: true,
})
export const getMinMax = (vals: (number | { valueOf(): number })[]) => {
    const numericVals = vals.map(coerceNumber);
    return [Math.min(...numericVals), Math.max(...numericVals)];
};
export const getAllData = (data: ChartDataDto): ReadonlyArray<ChartPointDto> =>
    data?.incomes && data?.expenses
        ? data.incomes.concat(data.expenses)
        : data?.expenses
            ? data?.expenses
            : data?.incomes
                ? data.incomes
                : []
export const getProcessedData = (data: ReadonlyArray<ChartPointDto>): Array<ChartPoint> => data?.map(point => ({
    ...point,
    date: new Date(point.date)
}))

export interface ChartPoint {
    date: Date,
    value: number
}

/**
 * Function to get date axis values from all chart data.
 * @param data
 * @return dates: ReadonlyArray<Date>
 */
export const getAxisTimeValues = (data: ReadonlyArray<ChartPoint>) => pipe(
    data,
    A.map(({date}) => date),
    A.uniq(D.Eq),
    A.toArray
)
export const lines = ["incomes", "expenses",] as const
