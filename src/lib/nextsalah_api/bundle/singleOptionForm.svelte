<script lang="ts">
    import PrayerTimesHandler from "$lib/nextsalah_api/handler";
	import FormCard from "./formCard.svelte";
    import FormHandler from "./formHandler.svelte";
    import type { SingleOptionLocation, ISingleOptionProps, IFormHandlerProps } from "../interfaces";
    import type {  SelectOptionType } from "flowbite-svelte/types";
    import {  Select, Label  } from 'flowbite-svelte';
    import { onMount } from "svelte";
        
    
    export let singleOptionProps: ISingleOptionProps;
    let options: SelectOptionType[] = [];
    let selected: string;
    const handleSendData = async (): Promise<boolean> => {
        if ( !selected ){
            FormHandlerProps.alert_message = "Please select a location";
            return false;
        }
        const key: string = singleOptionProps.selected_key;
        const response = await prayertime.save( { [key] : selected }) as Awaited<ReturnType<typeof prayertime.save>>;
        if ( response instanceof Error ) {return false;}
        return true;
    }
    
    let FormHandlerProps: IFormHandlerProps= {
        fetchFinished: false,
        error: "",
        alert_message: "",
        handleData: () => handleSendData()
    }
    
    const prayertime = new PrayerTimesHandler<SingleOptionLocation>(singleOptionProps.end_point);
    
    onMount(async () => {
        let locations = await prayertime.locations() as Awaited<ReturnType<typeof prayertime.locations> | Error>;
        
        if ( locations instanceof Error ) {
            FormHandlerProps.error = locations.message;
            FormHandlerProps.fetchFinished = true;
            return;
        }

        for ( const [index, location] of locations.entries() ) {
            if ( singleOptionProps.option_by_index ) {
                options.push({ value: index.toString(10), name: location });
            } else {
                options.push({ value: location, name: location });
            }
        }

        FormHandlerProps.fetchFinished = true;
    });

</script>


<FormCard OptionProps={singleOptionProps}>
    <FormHandler FormHandlerProps={FormHandlerProps}>
        <Label>
            {singleOptionProps.select_label}
            <Select class="mt-2" items={options} bind:value={selected} />
        </Label>
    </FormHandler>
</FormCard>
