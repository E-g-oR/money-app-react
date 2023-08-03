import {FC, useEffect, useState} from "react";
import {Select, Stack, Typography} from "@components";
import Api from "@api";
import {ChartDataDto, ChartFiltersDto} from "@/types/API/data-contracts.ts";
import {match} from "ts-pattern";
import {useChartFilters} from "@utils/hooks.ts";
import {ParentSize} from "@visx/responsive";
import LinearChart from "@pages/accounts/chart-view/LinearChart.tsx";

const maxHeight = 500

const views = ["month", "year"] as const

interface Props {
    accountId: number
}

const ChartView: FC<Props> = ({accountId}) => {

    const [chartFilters, setChartFilters] = useState<ChartFiltersDto>()

    const {
        selectedYear,
        selectedMonth,
        yearsFilter,
        setSelectedMonth,
        setSelectedYear,
        monthsFilter
    } = useChartFilters(chartFilters)

    const [chartData, setChartData] = useState<ChartDataDto>()

    // console.log("chartData", chartData)

    useEffect(() => {
        Api.getChartFilters(accountId).then(setChartFilters)
    }, [accountId])

    const [view, setView] = useState<typeof views[number]>(views[0])

    useEffect(() => {
        if (selectedYear && selectedMonth) {
            Api.getChartData(accountId, {year: selectedYear, month: selectedMonth, view}).then(setChartData)
        }
    }, [selectedYear, selectedMonth, view, accountId])


    return <>
        <Typography>Chart view</Typography>
        {chartFilters && <Stack spacing={"m"} alignItems={"center"} justifyContent={"flex-start"}>
            <Select value={view} variants={views} renderVariants={a => a} onChange={setView}/>
            {match(yearsFilter.length)
                .with(1, () => <Typography>{selectedYear}</Typography>)
                .when(len => len > 1, () => <Select
                    value={selectedYear}
                    onChange={setSelectedYear}
                    variants={yearsFilter}
                    renderVariants={a => a}
                />)
                .otherwise(() => null)}

            {match(monthsFilter?.length)
                .with(1, () => <Typography>{selectedMonth}</Typography>)
                .when(len => len && len > 1, () => <Select
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    variants={monthsFilter}
                    renderVariants={a => a}
                />)
                .otherwise(() => null)}
        </Stack>}
        <ParentSize debounceTime={0}>
            {({height, width}) => <LinearChart
                width={width}
                height={Math.min(height, maxHeight)}
                data={chartData ?? {incomes: [], expenses: []}}
            />}
        </ParentSize>
    </>
}

export default ChartView
