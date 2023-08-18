import {useCallback, useEffect, useMemo, useState} from "react";
import {match} from "ts-pattern";


const deviceBreakpoints = {
    mobile: 640,
    tablet: 1024,
    laptop: 1536,
    desktop: 1920
}

type Device = keyof typeof deviceBreakpoints
const getDeviceType = (innerWidth: number): Device => match(innerWidth)
    .when(a => a <= deviceBreakpoints.mobile, () => "mobile" as Device)
    // .when(a => a <= 640, () => "mobile")
    // .when(a => a <= 768, () => "tablet-s")
    .when(a => a <= 1024, () => "tablet" as Device)
    // .when(a => a <= 1280, () => "tablet-l")
    .when(a => a <= 1536, () => "laptop" as Device)
    .otherwise(() => "desktop" as Device)

export const useDeviceType = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    const getInnerWidth = useCallback(() => setInnerWidth(window.innerWidth), [])
    const deviceType = useMemo(() => getDeviceType(innerWidth), [innerWidth])

    useEffect(() => {
        window.addEventListener("resize", getInnerWidth)
        return () => window.removeEventListener("resize", getInnerWidth)
    }, [getInnerWidth])

    return deviceType
}
