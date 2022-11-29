<script lang="ts">
    import PrayerTimesHandler from "$lib/nextsalah_api/handler";
    import { Spinner, Card, Select, Label, Button, Avatar} from 'flowbite-svelte';
    import type { VaktijaBALocations } from "$lib/nextsalah_api/interfaces";
	import { onMount } from "svelte";
	import type { SelectOptionType } from "flowbite-svelte/types";
    

    class VaktijaEU extends PrayerTimesHandler<VaktijaBALocations> {
        constructor() { 
            super("/vaktijaeu");
        }
    
        handleSendData( selected: string  ): void {
            if ( !selected ) return;
            button_disabled = true;
            this.save( {"location_slug": selected }).then( (data) => {
                console.log(data);
                button_disabled = false;
            });
        }

    }

    const vaktijaba = new VaktijaEU();
    
    let options: SelectOptionType[] = [];
    let selected: string;
    let finished: boolean = false;
    let button_disabled: boolean = false;
    
    onMount(async () => {
        let locations = await vaktijaba.locations() as Awaited<ReturnType<typeof vaktijaba.locations>>;
        for ( const [index, location] of locations.entries() ) {
            options.push({ value: index.toString(10), name: location });
        }
        finished = true;
    });

</script>


<Card>
    <div class="mb-5 flex items-center space-x-4">
        <Avatar src="https://play-lh.googleusercontent.com/aH03GTfZePcu6D3SSy-dYNQ-Nb0bxwyj98CjhIvjE39gTl7e8QWP5GNCxn7vnYzXJ3Q" alt="Vaktija.eu Logo" class="flex-shrink-0"/>
            <div class="flex-1 min-w-0">
            <p class="text-xl font-normal text-gray-900 truncate dark:text-white">
                Vaktija.eu
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                <a href="https://vaktija.eu/" target="_blank" rel="noreferrer" class="inline-flex items-center text-blue-400 hover:underline">
                    Link to source
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-1"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>           
            </p>
        </div>
    </div>
    {#if finished}
        <Label>Select an city
            <Select class="mt-2" items={options} bind:value={selected} />
        </Label>
        <Button class="mt-5" disabled={button_disabled} on:click={() => vaktijaba.handleSendData(selected)}>Save Prayer Times</Button>

    {:else}
        <Spinner color="purple" />
    {/if}
</Card>