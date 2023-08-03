import {getLanguage} from "@store/settings/settings.selector.ts";
import {DICTIONARY, Translation} from "@utils/translation";
import useSettingsStore from "@store/settings/settings.slice.ts";
import {useEffect, useState} from "react";
import {ChartFiltersDto} from "@/types/API/data-contracts.ts";


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
