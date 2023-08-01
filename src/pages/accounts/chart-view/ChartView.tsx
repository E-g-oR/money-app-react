import {FC, useEffect, useMemo, useState} from "react";
import {Select, Stack, Typography} from "@components";
import {useGetChartDataQuery, useGetChartFiltersQuery} from "@store/api.ts";
import {useParams} from "react-router-dom";
import {match} from "ts-pattern";
import LinearChart from "@pages/accounts/chart-view/LinearChart.tsx";
import {ParentSize} from "@visx/responsive";

const maxHeight = 500

const views = ["month", "year"] as const

const ChartView: FC = () => {
    const params = useParams<"accountId">()
    const {data: chartFilters} = useGetChartFiltersQuery(Number(params.accountId), {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })

    const yearsFilter: ReadonlyArray<string> = useMemo(() => chartFilters ? Object.keys(chartFilters) : [], [chartFilters])


    const [selectedYear, setSelectedYear] = useState(yearsFilter?.[0])
    const monthsFilter: ReadonlyArray<string> | undefined = useMemo(() => chartFilters?.[selectedYear], [selectedYear, chartFilters])
    const [selectedMonth, setSelectedMonth] = useState(monthsFilter?.[0])


    useEffect(() => {
        setSelectedYear(yearsFilter?.[0])
        setSelectedMonth(monthsFilter?.[0])
    }, [yearsFilter, monthsFilter])

    const [view, setView] = useState<typeof views[number]>(views[0])

    console.log(selectedYear, parseInt(selectedYear))
    console.log(selectedMonth, parseInt(selectedMonth))

    const {data: chartData} = useGetChartDataQuery({year: parseInt(selectedYear), month: parseInt(selectedMonth), view},{
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        skip: selectedMonth === undefined || selectedYear === undefined
    })

    return <>
        <Typography>Chart view</Typography>
        <Stack spacing={"m"} alignItems={"center"} justifyContent={"flex-start"}>
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
        </Stack>
         <ParentSize debounceTime={0} >
            {({height, width}) => <LinearChart
                width={width}
                height={Math.min(height, maxHeight)}
                data={chartData ?? {incomes: [], expenses: []}}
            />}
        </ParentSize>
    </>
}

export default ChartView
