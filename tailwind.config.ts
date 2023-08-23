import {Config} from "tailwindcss";
import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        colors: {
            ...colors,
            primary: colors.indigo,
            secondary: colors.purple,
            success: colors.green,
            error: colors.red,
            warning: colors.orange,
            background: colors.zinc
        },
        extend: {
            gridTemplateRows: {
                desktop: "auto 1fr",
                mobile: "auto 1fr auto",
            },
            gridTemplateColumns: {
                desktop: "auto 1fr"
            }
        },
    },
    plugins: [],
}
export default config
