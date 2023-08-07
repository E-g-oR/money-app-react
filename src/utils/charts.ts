import {coerceNumber, scaleLinear, scaleTime} from "@visx/scale";
import {ScaleTime} from "@visx/vendor/d3-scale"
import {bisector, extent} from "@visx/vendor/d3-array";
import {flow, pipe} from "fp-ts/function";
import * as D from "fp-ts/Date";
import * as N from "fp-ts/number";
import * as A from "fp-ts/ReadonlyArray";
import {ChartDataDto, ChartLineDto, ChartPointDto} from "@/types/API/data-contracts.ts";


export const getX = (d: ChartPoint) => d.date
export const getY = (d: ChartPoint) => d.value

export const bisectDate = bisector<ChartPointDto, Date>((d) => new Date(d.date)).left;
export const getTooltipDataItems = (chartData: ChartDataDto, x0: Date, xScale: ScaleTime<unknown, number>): ReadonlyArray<{
    title: string,
    value: number,
    xPosition: number,
}> => pipe(
    chartData.chartLines,
    A.map(chartLine => {
        const index = bisectDate(chartLine.lineData ?? [], x0, 1)
        const item = chartLine.lineData?.[index - 1] as ChartPointDto
        const a: ChartPoint = {
            value: item.value,
            date: new Date(item.date)
        }
        const xPosition = xScale(getX(a))
        return {
            xPosition,
            title: chartLine.lineKey,
            value: item?.value ?? 0
        }
    }),
    A.filter(item => item.value !== 0 || item.xPosition < 30),
    // A.map(({xPosition, ...rest}) => rest)
)


// scales
/**
 * Scale X time for chart
 * @param allData
 */
export const getXScale = (allData: ReadonlyArray<ChartPoint>) => scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date],
    nice: true,
    // round: true
    // interpolate:""
})

const getSortedValues = flow(
    A.map(getY),
    A.sort(N.Ord),
)

const getYDomain = (allData: ReadonlyArray<ChartPoint>) => {
    const sortedValues = getSortedValues(allData),
        min = sortedValues[0],
        max = sortedValues[sortedValues.length - 1]
    // console.log(sortedValues, min, max)
    return [min, max]
}

/**
 * Scale Y value for chart
 * @param allData
 */
export const getYScale = (allData: ReadonlyArray<ChartPoint>) => scaleLinear<number>({
    domain: getYDomain(allData),
    nice: true,
    zero: true
})
export const getMinMax = (vals: (number | { valueOf(): number })[]) => {
    const numericVals = vals.map(coerceNumber);
    return [Math.min(...numericVals), Math.max(...numericVals)];
};

/**
 * Accumulate all lines data.
 * HELPER FUNCTION
 * @param acc
 * @param line
 */
const accumulateAllLinesData = (
    acc: ReadonlyArray<ChartPointDto>,
    line: ChartLineDto
): ReadonlyArray<ChartPointDto> =>
    pipe(acc, A.concat(line?.lineData ?? []))

export const getAllData = (data: ChartDataDto): ReadonlyArray<ChartPointDto> => pipe(
    data.chartLines,
    A.reduce([], accumulateAllLinesData)
)


export const getProcessedData = (data: ReadonlyArray<ChartPointDto>): Array<ChartPoint> => pipe(
    data,
    A.map(point => ({
        value: point.value,
        date: new Date(point.date)
    })),
    A.toArray
)

// export const get

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

// export const lines = ["incomes", "expenses",] as const
