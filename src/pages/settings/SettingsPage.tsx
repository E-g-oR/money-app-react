import {FC, useEffect, useState} from "react";
import {Select} from "@components";
import {languageSelect, LanguageSelectItem} from "@utils/constants.ts";
import useSettingsStore from "@store/settings/settings.slice.ts";
import {getLanguage, getSetLanguage} from "@store/settings/settings.selector.ts";
import PageHeader from "@components/page-header/PageHeader.tsx";

const SettingsPage: FC = () => {
    const setLanguage = useSettingsStore(getSetLanguage)
    const language = useSettingsStore(getLanguage)

    const [locale, setLocale] = useState<LanguageSelectItem>(languageSelect.find(item => item.value === language) ?? languageSelect[0])

    useEffect(() => {
        setLanguage(locale.value)
    }, [locale, setLanguage])

    return <>
        <PageHeader header={"Settings"}/>
        <Select value={locale} variants={languageSelect} renderVariants={item => item.title} onChange={setLocale}/>
    </>
}

export default SettingsPage
