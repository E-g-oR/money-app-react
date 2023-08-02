import {FC, useEffect, useMemo, useState} from "react";
import {Select, Stack, Typography} from "@components";
import Api from "@api";
import {ChartFiltersDto} from "@/types/API/data-contracts.ts";
import {match} from "ts-pattern";

const maxHeight = 500

const views = ["month", "year"] as const

interface Props {
    accountId: number
}

const ChartView: FC<Props> = ({accountId}) => {

    const [chartFilters, setChartFilters] = useState<ChartFiltersDto>()

    // console.log(chartFilters)
    useEffect(() => {
        Api.getChartFilters(accountId).then(setChartFilters)
    }, [accountId])

    const yearsFilter: ReadonlyArray<number> = useMemo(() => chartFilters?.data ? Object.keys(chartFilters.data).map(parseInt) : [], [chartFilters?.data])
    //
    //
    const [selectedYear, setSelectedYear] = useState(yearsFilter?.[0])
    const monthsFilter = useMemo(() => chartFilters?.data && selectedYear ? chartFilters.data[selectedYear] : [], [selectedYear, chartFilters?.data])
    const [selectedMonth, setSelectedMonth] = useState(monthsFilter?.[0])

    console.log(yearsFilter, selectedMonth)

    useEffect(() => {
        setSelectedYear(yearsFilter?.[0])
        setSelectedMonth(monthsFilter?.[0])
    }, [yearsFilter, monthsFilter])

    const [view, setView] = useState<typeof views[number]>(views[0])


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
        {/*<ParentSize debounceTime={0}>*/}
        {/*    {({height, width}) => <LinearChart*/}
        {/*        width={width}*/}
        {/*        height={Math.min(height, maxHeight)}*/}
        {/*        data={chartData ?? {incomes: [], expenses: []}}*/}
        {/*    />}*/}
        {/*</ParentSize>*/}
    </>
}

export default ChartView
