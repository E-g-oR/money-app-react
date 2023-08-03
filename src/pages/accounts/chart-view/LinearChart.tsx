import {FC} from "react";
import {Group} from "@visx/group";
import {LinePath} from "@visx/shape";
import {curveLinear} from "@visx/curve";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {ChartDataDto} from "@/types/API/data-contracts.ts";
import {Axis, AxisLeft, Orientation} from '@visx/axis';
import {timeFormat} from "@visx/vendor/d3-time-format"
import {ChartPoint, getProcessedData, getX, getY, lines} from "@utils/charts.ts";
import {ChartMargin, ChartSize, defaultChartMargin, defaultChartSize, useLinearChart} from "@utils/hooks.ts";
import {chart} from "@pages/accounts/chart-view/chart.css.ts";
import {GridColumns, GridRows} from "@visx/grid";

interface Props {
    size: ChartSize,
    margin?: ChartMargin,
    data: ChartDataDto
}

const LinearChart: FC<Props> = ({
                                    data,
                                    size = defaultChartSize,
                                    margin = defaultChartMargin,
                                }) => {
    console.log(size)
    const {
        xScale,
        yScale,
        axisTimeScale,
        axisTimeValues
    } = useLinearChart(data, size, margin)


    return <div className={chart}>
        <svg width={size.width} height={size.height}>
            <GridRows
                top={margin.top}
                left={margin.left}
                scale={yScale}
                width={size.width - margin.left - margin.right}
                stroke={colorScheme.text.normal}
                strokeWidth={0.5}
                strokeOpacity={0.3}
            />
            <GridColumns
                top={margin.top}
                left={margin.left + 3}
                scale={xScale}
                width={size.width - margin.left - margin.right}
                height={size.height - margin.top - margin.bottom}
                stroke={colorScheme.text.normal}
                strokeOpacity={0.5}
                strokeWidth={0.3}
            />
            {lines.map(lineName => {
                const processedData = getProcessedData(data?.[lineName] ?? [])
                return processedData && <Group
                    key={lineName}
                    top={margin.top}
                    left={margin.left}
                >
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
                        stroke={lineName === "incomes" ? colorScheme.success.normal : colorScheme.error.normal}
                        strokeWidth={2}
                        strokeOpacity={0.6}
                        shapeRendering="geometricPrecision"
                    />
                </Group>
            })}
            <AxisLeft
                scale={yScale}
                left={margin.left}
                stroke={colorScheme.text.normal}
                tickStroke={colorScheme.text.normal}
                top={(margin.top ?? 0)}
                tickLabelProps={{
                    fill: colorScheme.text.normal,
                }}
            />
            <Axis
                scale={axisTimeScale}
                left={margin.left}
                orientation={Orientation.bottom}
                tickValues={axisTimeValues}
                tickFormat={timeFormat("%e")}
                stroke={colorScheme.text.normal}
                tickStroke={colorScheme.text.normal}
                top={size.height - (margin.top ?? 0)}
                tickLabelProps={{
                    fill: colorScheme.text.normal
                }}
            />
        </svg>
    </div>
}

export default LinearChart
