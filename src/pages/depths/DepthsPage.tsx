import {FC} from "react";
import AddDepthModal from "@pages/depths/AddDepthModal.tsx";
import List from "@components/list/List.tsx";
import DepthCard from "@pages/depths/DepthCard.tsx";
import {useRequest, useTranslation} from "@utils/hooks.tsx";
import Api from "@api";
import useDataStore from "@store/data/data.slice.ts";
import {getDeptsList} from "@store/data/data.selectors.ts";
import PageHeader from "@components/page-header/PageHeader.tsx";

const DepthsPage: FC = () => {
    useRequest(Api.getAccountsList, null)
    useRequest(Api.getDepthList, null)
    const t = useTranslation()

    const depthsList = useDataStore(getDeptsList)

    return <>
        <PageHeader
            header={t.depts.yourDepts}
            icon={<AddDepthModal/>}
        />
        <List
            data={depthsList}
            isLoading={false}
            renderItem={item => <DepthCard depth={item}/>}
            fallback={t.depts.noDepthsFallback}
            getKey={depth => depth.id}
        />
    </>
}

export default DepthsPage
