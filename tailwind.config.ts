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
        extend: {},
    },
    plugins: [],
}
export default config
