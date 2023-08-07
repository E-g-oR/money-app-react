import {getLanguage} from "@store/settings/settings.selector.ts";
import {DICTIONARY, Translation} from "@utils/translation";
import useSettingsStore from "@store/settings/settings.slice.ts";
import {useEffect, useMemo, useState} from "react";
import {ChartDataDto, ChartFiltersDto} from "@/types/API/data-contracts.ts";
import {pipe} from "fp-ts/function";
import {getAllData, getAxisTimeValues, getMinMax, getProcessedData, getXScale, getYScale} from "@utils/charts.ts";
import {scaleTime} from "@visx/scale";


/**
 * Hook to get dictionary of selected language for interface
 */
export const useTranslation = (): Translation => {
    const lang = useSettingsStore(getLanguage)
    return DICTIONARY[lang] ?? DICTIONARY.en
}

const today = new Date()
const defaultChartFilter: ChartFiltersDto = {
    data: {
        [today.getFullYear()]: [today.getMonth()]
    }
}
export const useChartFilters = (chartData: ChartFiltersDto = defaultChartFilter) => {
    // console.log("\nchartData", chartData)
    const [yearsFilter, setYearsFilter] = useState<ReadonlyArray<number>>([])
    const [monthsFilter, setMonthsFilter] = useState<ReadonlyArray<number>>([])

    const [selectedYear, setSelectedYear] = useState<number>()
    const [selectedMonth, setSelectedMonth] = useState<number>()

    /**
     * Update yearsFilter for selected year from chartFilter.
     */
    useEffect(() => {
        console.log("chart data changed", chartData)
        if (chartData) {
            setYearsFilter(Object.keys(chartData.data).map(parseInt))
        }
    }, [chartData])

    /**
     * Update monthsFilter for selected year from chartFilter.
     */
    useEffect(() => {
        if (chartData.data) {
            // console.log("\nnew monthsFilter", chartData, selectedYear, chartData.data[selectedYear])
            setMonthsFilter(chartData.data[selectedYear])
        }
    }, [selectedYear, chartData])

    /**
     * Update selectedYear when chartData changed.
     * Select the last year (will be closest to current date).
     */
    useEffect(() => {
        if (chartData.data) {
            const allYears = Object.keys(chartData.data).map(parseInt)
            const tail = allYears.reduceRight((_, last) => last, 0)
            setSelectedYear(tail)
        }
    }, [chartData])

    /**
     * Update selectedMonth when monthsFilter changed.
     * Select the last month (will be closest to current date).
     */
    useEffect(() => {
        // console.log("month filter changed", monthsFilter)
        if (monthsFilter?.length > 0) {
            const lastMonth = monthsFilter.reduceRight((_, last) => last, 0)
            setSelectedMonth(lastMonth)
        }
    }, [monthsFilter])

    return {
        yearsFilter,
        monthsFilter,
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth
    }
}

export interface ChartSize {
    width: number,
    height: number
}

export interface ChartMargin {
    top: number
    right: number
    bottom: number
    left: number,
}

export const defaultChartSize: ChartSize = {
    width: 500,
    height: 500,
}

export const defaultChartMargin: ChartMargin = {
    top: 40,
    right: 10,
    bottom: 30,
    left: 35,
}

export const useLinearChart = (chartData: ChartDataDto, size = defaultChartSize, margin = defaultChartMargin) => {
    const allProcessedData = useMemo(() => pipe(chartData, getAllData, getProcessedData), [chartData])
    const xScale = useMemo(() => getXScale(allProcessedData), [allProcessedData])
    const yScale = useMemo(() => getYScale(allProcessedData), [allProcessedData])

    const marginX = useMemo(() => (margin.left ?? 0) + (margin.right ?? 0), [margin.right, margin.left])
    const marginY = useMemo(() => (margin.top ?? 0) + (margin.bottom ?? 0), [margin.top, margin.bottom])

    const innerWidth = useMemo(() => size.width - marginX, [size.width, marginX])
    const innerHeight = useMemo(() => size.height - marginY, [size.height, marginY])


    xScale.range([0, size.width - marginX])
    yScale.range([size.height - marginY - 10, 0])

    const axisTimeValues = useMemo(() => getAxisTimeValues(allProcessedData), [allProcessedData])
    const barWidth = useMemo(() => innerWidth / axisTimeValues.length, [innerWidth, axisTimeValues.length])

    const axisTimeScale = useMemo(() => scaleTime({
        domain: getMinMax(axisTimeValues),
        range: [0, innerWidth],
        nice: true,
        // round: true,
        // clamp: true
    }), [innerWidth, axisTimeValues])

    return {
        xScale: axisTimeScale,
        yScale,
        axisTimeValues,
        axisTimeScale,
        innerWidth,
        innerHeight,
        barWidth
    }
}


export function useRequest<T, D = {}>(request: (params: D) => Promise<T>, params?: D) {
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState<T | undefined>()

    useEffect(() => {
        setLoading(true)
        request(params).then(data => {
            setData(data)
            setLoading(false)
        })
    }, [params, request])

    return {
        data,
        isLoading
    }
}


