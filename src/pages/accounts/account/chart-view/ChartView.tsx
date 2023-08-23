import {FC, useEffect, useMemo, useState} from "react";
import {Select, Stack, Typography} from "@components";
import Api from "@api";
import {ChartDataDto} from "@/types/API/data-contracts.ts";
import {useChartFilters, useRequest} from "@utils/hooks.tsx";
import {ParentSize} from "@visx/responsive";
import LinearChart from "@pages/accounts/account/chart-view/LinearChart.tsx";
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
        YearsSelect,
        MonthsSelect
    } = useChartFilters(chartFilters)

    const [chartData, setChartData] = useState<ChartDataDto>()

    const [view, setView] = useState<typeof views[number]>(views[0])

    useEffect(() => {
        if (selectedYear && selectedMonth) {
            Api.getChartData(accountId ?? 0, {year: selectedYear, month: selectedMonth, view}).then(setChartData)
        }
    }, [selectedYear, selectedMonth, view, accountId])


    return <div className={"flex flex-col h-96"}>
        <Typography>Chart view</Typography>
        {chartFilters && <Stack
            spacing={"m"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            className={"items-center justify-start gap-4"}
        >
            <Select
                value={view}
                variants={views}
                renderVariants={a => a}
                onChange={setView}
            />
            {YearsSelect}
            {MonthsSelect}
        </Stack>}
        <ParentSize debounceTime={30} className={"h-1/3 flex-1"}>
            {({height, width,}) => <LinearChart
                size={{
                    width,
                    height: height
                }}
                data={chartData ?? {chartLines: []}}
                view={view}
            />
            }
        </ParentSize>
    </div>
}

export default ChartView
