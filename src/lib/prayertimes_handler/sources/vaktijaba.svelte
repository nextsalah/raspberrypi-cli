<script lang="ts">
    import PrayerTimesHandler from "$lib/prayertimes_handler/handler";
    import { Spinner, Card, Select, Label } from 'flowbite-svelte';
    import type { VaktijaBALocations } from "$lib/prayertimes_handler/interfaces";
	import { onMount } from "svelte";
	import type { SelectOptionType } from "flowbite-svelte/types";
    

    class VaktijaBA extends PrayerTimesHandler<VaktijaBALocations> {        
        constructor() { super("/vaktijaba");}
    }

    const vaktijaba = new VaktijaBA();
    
    let options: SelectOptionType[] = [];
    let selected: string;
    let finished = false;
    
    onMount(async () => {
        let locations = await vaktijaba.locations() as Awaited<ReturnType<typeof vaktijaba.locations>>;
        for ( const [index, location] of locations.entries() ) {
            options.push({ value: index.toString(10), name: location });
        }
        finished = true;
    });

</script>


<Card>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vaktija BA</h5>
    {#if finished}
        <Label>Select an city
            <Select class="mt-2" items={options} bind:value={selected} />
        </Label>
    {:else}
        <Spinner color="purple" />
    {/if}
</Card>