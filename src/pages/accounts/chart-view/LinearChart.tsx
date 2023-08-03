import {FC, useMemo} from "react";
import {scaleLinear, scaleTime} from "@visx/scale";
import {extent} from "@visx/vendor/d3-array"
import {Group} from "@visx/group";
import {LinePath} from "@visx/shape";
import {curveNatural} from "@visx/curve";
import {pipe} from "fp-ts/function";
import {colorScheme} from "@styles/colorScheme.css.ts";


const getX = (d: ChartPoint) => d.date
const getY = (d: ChartPoint) => d.value

// scales
/**
 * Scale X time for chart
 * @param allData
 */
const getXScale = (allData: ReadonlyArray<ChartPoint>) => scaleTime<number>({
    domain: extent(allData, getX) as [Date, Date]
})
/**
 * Scale Y value for chart
 * @param allData
 */
const getYScale = (allData: ReadonlyArray<ChartPoint>) => scaleLinear<number>({
    domain: extent(allData, getY) as [number, number]
})

interface ChartData {
    incomes?: ReadonlyArray<ChartPointRaw>,
    expenses?: ReadonlyArray<ChartPointRaw>,

}

const getAllData = (data: ChartData): ReadonlyArray<ChartPointRaw> =>
    data?.incomes && data?.expenses
        ? data.incomes.concat(data.expenses)
        : data?.expenses
            ? data?.expenses
            : data?.incomes
                ? data.incomes
                : []
const getProcessedData = (data: ReadonlyArray<ChartPointRaw>): Array<ChartPoint> => data?.map(point => ({
    ...point,
    date: new Date(point.date)
}))

interface ChartPointRaw {
    date: string,
    value: number
}

interface ChartPoint {
    date: Date,
    value: number
}

type ChartLine = ReadonlyArray<ChartPointRaw>;

interface Props {
    width: number,
    height: number,
    margin?: { top: number, right: number, bottom: number, left: number },
    events?: boolean,
    data: ChartData
}

const lines = ["incomes", "expenses",] as const
const LinearChart: FC<Props> = ({
                                    data,
                                    width = 500,
                                    height = 500,
                                    margin = {top: 0, right: 0, bottom: 0, left: 0},
                                    events = false,
                                }) => {
    const allProcessedData = useMemo(() => pipe(data, getAllData, getProcessedData), [data])
    const xScale = useMemo(() => getXScale(allProcessedData), [allProcessedData])
    const yScale = useMemo(() => getYScale(allProcessedData), [allProcessedData])

    xScale.range([0, width - 50])
    yScale.range([50, 0])


    return <svg width={width} height={height}>
        <rect
            width={width}
            height={height}
            fill={colorScheme.background.lightTransparent}
            rx={14}
            ry={14}
        />
        {lines.map(lineName => {
            const processedData = getProcessedData(data?.[lineName])
            return processedData && <Group key={lineName} top={50} left={25}>
                {processedData?.map(point => <circle
                    key={getX(point).toISOString()}
                    r={3}
                    cx={xScale(getX(point))}
                    cy={yScale(getY(point))}
                    stroke={lineName === "incomes" ? colorScheme.success.normalTransparent : colorScheme.error.normalTransparent}
                    fill={lineName === "incomes" ? colorScheme.success.normalTransparent : colorScheme.error.normalTransparent}
                />)}
                <LinePath<ChartPoint>
                    curve={curveNatural}
                    data={processedData}
                    x={d => xScale(getX(d)) ?? 0}
                    y={d => yScale(getY(d)) ?? 0}
                    stroke={lineName === "incomes" ? colorScheme.success.normalTransparent : colorScheme.error.normalTransparent}
                    strokeWidth={2}
                    strokeOpacity={0.6}
                    shapeRendering="geometricPrecision"
                />
            </Group>
        })}
    </svg>
}

export default LinearChart
