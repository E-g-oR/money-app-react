import {FC, useEffect, useMemo, useState} from "react";
import {Select, Stack, Typography} from "@components";
import Api from "@api";
import {ChartDataDto} from "@/types/API/data-contracts.ts";
import {match} from "ts-pattern";
import {useChartFilters, useRequest} from "@utils/hooks.ts";
import {ParentSize} from "@visx/responsive";
import LinearChart from "@pages/accounts/chart-view/LinearChart.tsx";
import useDataStore from "@store/data/data.slice.ts";
import {getActiveAccountId, getChartFiltersByAccountId} from "@store/data/data.selectors.ts";

const views = ["month", "year"] as const

interface Props {
    accountId: number
}

const ChartView: FC<Props> = () => {
    const accountId = useDataStore(getActiveAccountId)
    useRequest(Api.getChartFilters, accountId ?? 0)

    const chartFiltersByAccountId = useDataStore(getChartFiltersByAccountId)
    const chartFilters = useMemo(() => chartFiltersByAccountId[accountId ?? 0], [accountId, chartFiltersByAccountId])

    const {
        selectedYear,
        selectedMonth,
        yearsFilter,
        setSelectedMonth,
        setSelectedYear,
        monthsFilter
    } = useChartFilters(chartFilters)

    const [chartData, setChartData] = useState<ChartDataDto>()

    const [view, setView] = useState<typeof views[number]>(views[0])

    useEffect(() => {
        if (selectedYear && selectedMonth) {
            Api.getChartData(accountId ?? 0, {year: selectedYear, month: selectedMonth, view}).then(setChartData)
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
        <ParentSize debounceTime={30} style={{flexGrow: 0}}>
            {({height, width,}) => <LinearChart
                size={{
                    width,
                    height: height
                }}
                data={chartData ?? {chartLines: []}}
            />}
        </ParentSize>
    </>
}

export default ChartView
