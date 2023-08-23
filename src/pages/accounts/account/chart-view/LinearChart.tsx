import {Group} from "@visx/group";
import {curveLinear} from "@visx/curve";
import {Line, LinePath} from "@visx/shape";
import {GridColumns, GridRows} from "@visx/grid";
import {Axis, AxisLeft, Orientation} from '@visx/axis';
import {WithTooltipProvidedProps} from "@visx/tooltip/lib/enhancers/withTooltip";
import {TooltipWithBounds, withTooltip} from "@visx/tooltip";
import {ChartPoint, getProcessedData, getX, getY} from "@utils/charts.ts";
import {
    ChartMargin,
    ChartSize,
    defaultChartMargin,
    defaultChartSize,
    useLinearChart,
    useTranslation
} from "@utils/hooks.tsx";
import {ChartDataDto} from "@/types/API/data-contracts.ts";
import {Stack, Typography} from "@components";
import {clsx} from "@utils/etc.ts";
import colors from "tailwindcss/colors";
import useSettingsStore from "@store/settings/settings.slice.ts";
import {getColorScheme} from "@store/settings/settings.selector.ts";
import {useMemo} from "react";

interface Props {
    size: ChartSize,
    margin?: ChartMargin,
    data: ChartDataDto,
    view: "year" | "month"
}

interface TooltipData_ {
    lineKey: string,
    item: ChartPoint
}

export default withTooltip<Props, TooltipData_>(
    ({
         data,
         size = defaultChartSize,
         margin = defaultChartMargin,
         showTooltip,
         hideTooltip,
         tooltipData,
         tooltipLeft = 0,
         tooltipTop = 0,
         tooltipOpen,
         view = "month"
     }: Props & WithTooltipProvidedProps<TooltipData_>) => {

        const t = useTranslation()

        const {
            xScale,
            yScale,
            axisTimeScale,
            axisTimeValues,
            innerWidth,
            innerHeight,
        } = useLinearChart(data, size, margin)

        const colorScheme = useSettingsStore(getColorScheme)

        const axisStroke = useMemo(() => colorScheme === "light" ? colors.zinc["700"] : colors.zinc["300"], [colorScheme])
        const tooltipPointColor = useMemo(() => colorScheme === "light" ? colors.indigo[700] : colors.indigo[400], [colorScheme])
        return <div className={"chart"}>
            <svg width={size.width} height={size.height}>
                <GridRows
                    top={margin.top}
                    left={margin.left}
                    scale={yScale}
                    width={innerWidth}
                    stroke={axisStroke}
                    strokeOpacity={0.2}
                />
                <GridColumns
                    top={margin.top}
                    left={margin.left}
                    scale={axisTimeScale}
                    width={innerWidth}
                    height={innerHeight}
                    stroke={axisStroke}
                    strokeOpacity={0.2}
                />
                {data.chartLines.map(({lineKey, lineData}) => {
                    const processedData = getProcessedData(lineData ?? [])
                    return processedData && <Group
                        key={lineKey}
                        top={margin.top}
                        left={margin.left}
                    >
                        {processedData?.map(point => {
                                const xPosition = xScale(getX(point)),
                                    yPosition = yScale(getY(point));
                                return <Group key={getX(point).toISOString()}>
                                    <circle
                                        r={3}
                                        cx={xPosition}
                                        cy={yPosition}
                                        className={lineKey === "expenses"
                                            ? "fill-error-500 stroke-error-500"
                                            : "fill-success-500 stroke-success-500"}
                                    />
                                    <circle
                                        r={20}
                                        cx={xPosition}
                                        cy={yPosition}
                                        onMouseMove={() => {
                                            showTooltip({
                                                tooltipData: {
                                                    lineKey,
                                                    item: point
                                                },
                                                tooltipTop: yPosition,
                                                tooltipLeft: xPosition
                                            })
                                        }}
                                        className={
                                            clsx(
                                                "transition",
                                                lineKey === "expenses"
                                                    ? "fill-error-500/5 hover:fill-error-500/30"
                                                    : "fill-success-500/5 hover:fill-success-500/30"
                                            )}
                                        onMouseLeave={hideTooltip}
                                    />
                                </Group>
                            }
                        )}
                        <LinePath<ChartPoint>
                            pointerEvents={"none"}
                            curve={curveLinear}
                            data={processedData}
                            x={d => xScale(getX(d)) ?? 0}
                            y={d => yScale(getY(d)) ?? 0}
                            className={lineKey === "expenses"
                                ? "stroke-error-600 dark:stroke-error-400"
                                : "stroke-success-600 dark:stroke-success-400"}
                            strokeWidth={2}
                            strokeOpacity={0.6}
                            shapeRendering="geometricPrecision"
                        />
                    </Group>
                })}
                <AxisLeft
                    scale={yScale}
                    left={margin.left}
                    stroke={axisStroke}
                    tickStroke={axisStroke}
                    top={(margin.top ?? 0)}
                    tickLabelProps={{
                        fill: axisStroke,
                    }}
                />
                <Axis
                    scale={axisTimeScale}
                    left={margin.left}
                    orientation={Orientation.bottom}
                    tickValues={axisTimeValues}
                    tickFormat={view === "month" ? t.formatDate.chartAxisInMonthView : t.formatDate.chartAxisInYearView}
                    stroke={axisStroke}
                    tickStroke={axisStroke}
                    top={size.height - (margin.top ?? 0)}
                    tickLabelProps={{
                        fill: axisStroke
                    }}
                />
                {
                    tooltipData && (
                        <g>
                            <Line
                                from={{x: tooltipLeft + margin?.left, y: margin.top}}
                                to={{x: tooltipLeft + margin?.left, y: innerHeight + margin.top}}
                                stroke={tooltipPointColor}
                                strokeWidth={2}
                                pointerEvents="none"
                                strokeDasharray="10,10"
                            />
                            <Line
                                from={{x: margin?.left, y: tooltipTop + margin?.top}}
                                to={{x: innerWidth + margin?.left, y: tooltipTop + margin?.top}}
                                stroke={tooltipPointColor}
                                strokeWidth={2}
                                pointerEvents="none"
                                strokeDasharray="10,10"
                            />
                            <circle
                                cx={tooltipLeft + margin?.left}
                                cy={tooltipTop + margin?.top}
                                r={4}
                                fill={tooltipPointColor}
                                stroke="white"
                                strokeWidth={2}
                                pointerEvents="none"
                            />
                        </g>
                    )
                }
            </svg>
            {tooltipOpen && tooltipData && (
                <div>
                    <TooltipWithBounds
                        key={Math.random()}
                        top={tooltipTop - 30}
                        left={tooltipLeft + 35}
                        className={"bg-background-900"}
                    >
                        <Stack spacing={"s"} vertical>
                            <Typography>{view === "month" ? t.formatDate.chartDateInMonthView(tooltipData?.item.date) : t.formatDate.chartDateInYearView(tooltipData.item.date)}</Typography>
                            {<Typography><Typography
                                as={"i"}>{tooltipData?.lineKey}</Typography>: {tooltipData?.item.value} </Typography>}
                        </Stack>
                    </TooltipWithBounds>
                </div>
            )}
        </div>
    })

