<script lang="ts">
    import PrayerTimesHandler from "$lib/nextsalah_api/handler";
    import type { SingleOptionLocation, ISingleOptionProps } from "$lib/nextsalah_api/interfaces";
    import { Spinner , Select, Label, Button } from 'flowbite-svelte';
    import type {  SelectOptionType } from "flowbite-svelte/types";
    import { onMount } from "svelte";
	import FormCard from "./formCard.svelte";
        
    
    
    export let singleOptionProps: ISingleOptionProps;
    let options: SelectOptionType[] = [];
    let selected: string;
    let finished: boolean = false;
    let error: string = "";
    let button_disabled: boolean = false;

    const prayertime = new PrayerTimesHandler<SingleOptionLocation>(singleOptionProps.end_point);
    
    function handleSendData( selected: string  ): void {
        if ( !selected ) return;
        button_disabled = true;
        const key: string = singleOptionProps.selected_key;
        prayertime.save( { [key] : selected }).then( (data) => {
            console.log(data);
            button_disabled = false;
        });
    }
    
    onMount(async () => {
        let locations = await prayertime.locations() as Awaited<ReturnType<typeof prayertime.locations> | Error>;
        
        if ( locations instanceof Error ) {
            error = locations.message;
            finished = true;
            return;
        }

        for ( const [index, location] of locations.entries() ) {
            if ( singleOptionProps.option_by_index ) {
                options.push({ value: index.toString(10), name: location });
            } else {
                options.push({ value: location, name: location });
            }
        }

        finished = true;
    });

</script>


<FormCard OptionProps={singleOptionProps}>
    {#if finished && !error}
        <Label>{singleOptionProps.select_label}
            <Select class="mt-2" items={options} bind:value={selected} />
        </Label>
        <Button class="mt-5" disabled={button_disabled} on:click={() => handleSendData(selected)}>Save Prayer Times</Button>
    {:else if error}
        <p class="text-red-500">{error}</p>
    {:else}
        <Spinner color="purple" />
    {/if}
</FormCard>
