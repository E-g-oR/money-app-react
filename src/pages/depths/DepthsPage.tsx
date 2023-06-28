import {Component, createEffect, createSignal, For, onMount} from "solid-js";
import {Motion} from "@motionone/solid";
import {Button, Stack, Typography} from "@/components";
import DepthCard from "@/pages/depths/DepthCard";
import {sprinkles} from "@/styles/sprinkles.css";
import AddDepthModal from "@/pages/depths/AddDepthModal";
import depths from "@/api/depths";
import {Depth} from "@/types/depths";
import {depthsStore} from "@/store/depthsStore";
// import Depths from "@/api/depths";


const DepthsPage: Component = () => {
    onMount(() => {
        depths.getDepths()
    })

    const [a, setA] = createSignal<ReadonlyArray<Depth> | undefined>(undefined)

    createEffect(() => {
       setA(depthsStore.data)
    })
    return <>
        <Motion.div
            initial={{opacity: 0,}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <Stack spacing={"xs"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography as={"h2"}>
                    Your depths
                </Typography>
                <AddDepthModal/>
            </Stack>
        </Motion.div>
        <p>is Loading: {depthsStore.isLoading}</p>
        <Button onClick={depths.getDepths}>Set enabled</Button>
        <Stack
            spacing={"xs"}
            vertical
            className={sprinkles({marginTop: "m"})}
            alignItems={"stretch"}
        >
            {/*<Show when={!depthsStore.isLoading} fallback={"Loading..."}>*/}
            {a()?.map(item => item.title)}
            <For
                each={a()}
                fallback={<Typography as={"i"}>You dont have any depths. Congrats!</Typography>}
            >
                {(depth) => <DepthCard depth={depth}/>}
            </For>
            {/*</Show>*/}


            {/*<Switch>*/}
            {/*    <Match when={depthsResource.isLoading}>*/}
            {/*        <Typography as={"i"}>Loading...</Typography>*/}
            {/*    </Match>*/}
            {/*    <Match when={depthsResource.data}>*/}
            {/*        <For*/}
            {/*            each={depthsResource.data}*/}
            {/*            fallback={<Typography as={"i"}>You dont have any depths. Congrats!</Typography>}*/}
            {/*        >*/}
            {/*            {depth => <DepthCard depth={depth}/>}*/}
            {/*        </For>*/}
            {/*    </Match>*/}
            {/*</Switch>*/}
        </Stack>
    </>
}

export default DepthsPage
