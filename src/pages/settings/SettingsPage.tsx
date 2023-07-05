import {FC, useEffect, useState} from "react";
import {Select, Typography} from "@components";
import {useSelector} from "react-redux";
import {getLanguage} from "@store/settings/settings.selector.ts";
import {useActions} from "@utils/hooks.ts";
import {languageSelect, LanguageSelectItem} from "@utils/constants.ts";

const SettingsPage: FC = () => {
    const language = useSelector(getLanguage)
    const {setLanguage} = useActions()

    const [locale, setLocale] = useState<LanguageSelectItem>(languageSelect.find(item => item.value === language))

    useEffect(() => {
        setLanguage(locale.value)
    }, [locale, setLanguage])

    return <>
        <Typography as={"h2"}>Settings</Typography>
        <Select value={locale} variants={languageSelect} renderVariants={item => item.title} onChange={setLocale}/>
    </>
}

export default SettingsPage
