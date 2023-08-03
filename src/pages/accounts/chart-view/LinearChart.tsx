import {FC, useMemo} from "react";
import {coerceNumber, scaleLinear, scaleTime, scaleUtc} from "@visx/scale";
import {extent} from "@visx/vendor/d3-array"
import {Group} from "@visx/group";
import {LinePath} from "@visx/shape";
import {curveLinear} from "@visx/curve";
import {pipe} from "fp-ts/function";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {ChartDataDto, ChartLine, ChartPointDto} from "@/types/API/data-contracts.ts";
import {Axis, Orientation} from '@visx/axis';
import * as A from "fp-ts/ReadonlyArray"
import * as D from "fp-ts/Date"
import {contramap} from "fp-ts/Eq";
import {timeFormat} from "@visx/vendor/d3-time-format"

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

const getMinMax = (vals: (number | { valueOf(): number })[]) => {
    const numericVals = vals.map(coerceNumber);
    return [Math.min(...numericVals), Math.max(...numericVals)];
};
// interface ChartData {
//     incomes?: ReadonlyArray<ChartPointRaw>,
//     expenses?: ReadonlyArray<ChartPointRaw>,
//
// }

const getAllData = (data: ChartDataDto): ReadonlyArray<ChartPointDto> =>
    data?.incomes && data?.expenses
        ? data.incomes.concat(data.expenses)
        : data?.expenses
            ? data?.expenses
            : data?.incomes
                ? data.incomes
                : []
const getProcessedData = (data: ReadonlyArray<ChartLine>): Array<ChartPoint> => data?.map(point => ({
    ...point,
    date: new Date(point.date)
}))


interface ChartPoint {
    date: Date,
    value: number
}

// type ChartLine = ReadonlyArray<ChartPointRaw>;

interface Props {
    width: number,
    height: number,
    margin?: { top: number, right: number, bottom: number, left: number },
    events?: boolean,
    data: ChartDataDto
}

const ChartPointEq = pipe(
    D.Eq,
    contramap((point: ChartPoint) => point.date)
)
const getAxisTimeValues = (data: ReadonlyArray<ChartPoint>) => pipe(
    data,
    A.uniq(ChartPointEq),
    A.map(({date}) => date)
)

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
            const processedData = getProcessedData(data?.[lineName] ?? [])
            // console.log("data?.[lineName]", data?.[lineName])
            // console.log("processedData", processedData)
            return processedData && <Group key={lineName} top={50} left={25}>
                {processedData?.map(point => <circle
                    key={getX(point).toISOString()}
                    r={3}
                    cx={xScale(getX(point))}
                    cy={yScale(getY(point))}
                    stroke={lineName === "incomes" ? colorScheme.success.normal : colorScheme.error.normal}
                    fill={lineName === "incomes" ? colorScheme.success.normal : colorScheme.error.normal}
                />)}
                <LinePath<ChartPoint>
                    curve={curveLinear}
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
        <Axis
            scale={scaleUtc({
                domain: getMinMax(getAxisTimeValues(allProcessedData)),
                range: [0, width - 50]
            })}
            left={20}
            orientation={Orientation.bottom}
            tickValues={getAxisTimeValues(allProcessedData)}
            tickFormat={(value) => timeFormat("%e.%m")(value)}
            stroke={colorScheme.text.normal}
            tickStroke={colorScheme.text.normal}
            top={height-50}
            tickLabelProps={{
                fill: colorScheme.text.normal
            }}
        />
    </svg>
}

export default LinearChart
