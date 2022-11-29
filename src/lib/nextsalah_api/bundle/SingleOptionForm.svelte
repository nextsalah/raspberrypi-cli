<script lang="ts">
    import PrayerTimesHandler from "$lib/nextsalah_api/handler";
    import type { SingleOptionLocation, ISingleOptionProps} from "$lib/nextsalah_api/interfaces";
    import { Spinner, Card, Select, Label, Button, Avatar} from 'flowbite-svelte';
	import type { SelectOptionType } from "flowbite-svelte/types";
	import { onMount } from "svelte";

    
    let options: SelectOptionType[] = [];
    let selected: string;
    let finished: boolean = false;
    let error: string = "";
    let button_disabled: boolean = false;
    export let singleOptionProps: ISingleOptionProps;
    

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


<Card>
    <div class="mb-5 flex items-center space-x-4">
        <Avatar src={singleOptionProps.source_logo_src} alt="{singleOptionProps.source_name} logo" class="flex-shrink-0"/>
            <div class="flex-1 min-w-0">
            <p class="text-xl font-normal text-gray-900 truncate dark:text-white">
                {singleOptionProps.source_name}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                <a href={singleOptionProps.source_link} target="_blank" rel="noreferrer" class="inline-flex items-center text-blue-400 hover:underline">
                    Link to source
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-1"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>           
            </p>
        </div>
    </div>
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
</Card>