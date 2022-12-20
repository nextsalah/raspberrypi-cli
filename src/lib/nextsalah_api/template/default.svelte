<script lang="ts">
    /*
    * This component is used for all the single option forms.
    * It is used to get the options from the api and display them in a select.
    * @param singleOptionProps
    */
    import NextSalahAPI from "$lib/nextsalah_api/handler";
	import FormCard from "../components/formCard.svelte";
    import FormHandler from "../components/formHandler.svelte";
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
        const response = await prayertime.saveLocation( { [key] : selected }) as Awaited<ReturnType<typeof prayertime.saveLocation>>;
        if ( response instanceof Error ) {return false;}
        return true;
    }
    
    let FormHandlerProps: IFormHandlerProps= {
        fetchFinished: false,
        error: "",
        alert_message: "",
        handleData: () => handleSendData()
    }
    
    const prayertime = new NextSalahAPI<SingleOptionLocation>(singleOptionProps.end_point);
    
    onMount(async () => {

        // Get all locations
        let locations = await prayertime.getAllLocations() as Awaited<ReturnType<typeof prayertime.getAllLocations> | Error>;

        // If there is an error, set the error message and return
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


<FormCard SourceData={singleOptionProps}>
    <FormHandler FormHandlerProps={FormHandlerProps}>
        <Label>
            {singleOptionProps.select_label}
            <Select class="mt-2" items={options} bind:value={selected} />
        </Label>
    </FormHandler>
</FormCard>
