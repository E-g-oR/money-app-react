import {Group} from "@visx/group";
import {curveLinear} from "@visx/curve";
import {Line, LinePath} from "@visx/shape";
import {GridColumns, GridRows} from "@visx/grid";
import {Axis, AxisLeft, Orientation} from '@visx/axis';
import {WithTooltipProvidedProps} from "@visx/tooltip/lib/enhancers/withTooltip";
import {defaultStyles, TooltipWithBounds, withTooltip} from "@visx/tooltip";
import {chart} from "@pages/accounts/chart-view/chart.css.ts";
import {ChartPoint, getProcessedData, getX, getY} from "@utils/charts.ts";
import {
    ChartMargin,
    ChartSize,
    defaultChartMargin,
    defaultChartSize,
    useLinearChart,
    useTranslation
} from "@utils/hooks.tsx";
import {colorScheme} from "@styles/colorScheme.css.ts";
import {ChartDataDto} from "@/types/API/data-contracts.ts";
import {Stack, Typography} from "@components";
import {theme} from "@styles/theme.css.ts";

// export const background = "#3b6978";

const tooltipStyles = {
    ...defaultStyles,
    padding: `${theme.spacing.s} ${theme.spacing.m}`,
    background: colorScheme.background.light,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colorScheme.background.dark,
    borderRadius: theme.borderRadius.s
    // color: "white"
};


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


        return <div className={chart}>
            <svg width={size.width} height={size.height}>
                <GridRows
                    top={margin.top}
                    left={margin.left}
                    scale={yScale}
                    width={innerWidth}
                    stroke={colorScheme.text.normal}
                    strokeWidth={0.5}
                    strokeOpacity={0.3}
                />
                <GridColumns
                    top={margin.top}
                    left={margin.left}
                    scale={axisTimeScale}
                    width={innerWidth}
                    height={innerHeight}
                    stroke={colorScheme.text.normal}
                    strokeOpacity={0.5}
                    strokeWidth={0.3}
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
                                        stroke={lineKey === "incomes" ? colorScheme.success.normal : colorScheme.error.normal}
                                        fill={lineKey === "incomes" ? colorScheme.success.normal : colorScheme.error.normal}
                                    />
                                    <circle
                                        r={30}
                                        cx={xPosition}
                                        cy={yPosition}
                                        stroke={lineKey === "incomes" ? colorScheme.success.normalTransparent : colorScheme.error.normalTransparent}
                                        fill={lineKey === "incomes" ? colorScheme.success.normalTransparent : colorScheme.error.normalTransparent}
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
                                        fillOpacity={0}
                                        strokeOpacity={0}
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
                            stroke={lineKey === "incomes" ? colorScheme.success.normal : colorScheme.error.normal}
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
                    tickFormat={view === "month" ? t.formatDate.chartAxisInMonthView : t.formatDate.chartAxisInYearView}
                    stroke={colorScheme.text.normal}
                    tickStroke={colorScheme.text.normal}
                    top={size.height - (margin.top ?? 0)}
                    tickLabelProps={{
                        fill: colorScheme.text.normal
                    }}
                />
                {
                    tooltipData && (
                        <g>
                            <Line
                                from={{x: tooltipLeft + margin?.left, y: margin.top}}
                                to={{x: tooltipLeft + margin?.left, y: innerHeight + margin.top}}
                                stroke={colorScheme.primary.normal}
                                strokeWidth={2}
                                pointerEvents="none"
                                strokeDasharray="10,10"
                            />
                            <Line
                                from={{x: margin?.left, y: tooltipTop + margin?.top}}
                                to={{x: innerWidth + margin?.left, y: tooltipTop + margin?.top}}
                                stroke={colorScheme.primary.normal}
                                strokeWidth={2}
                                pointerEvents="none"
                                strokeDasharray="10,10"
                            />
                            <circle
                                cx={tooltipLeft + margin?.left}
                                cy={tooltipTop + margin?.top}
                                r={4}
                                fill={colorScheme.primary.light}
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
                        style={tooltipStyles}
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

