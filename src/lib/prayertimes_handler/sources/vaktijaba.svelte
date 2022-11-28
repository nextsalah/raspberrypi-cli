<script lang="ts">

    import PrayerTimesHandler from "$lib/prayertimes_handler/handler";
    import { Spinner, Card, Select, Label } from 'flowbite-svelte';
	import { onMount } from "svelte";
    import type { VaktijaBALocations } from "$lib/prayertimes_handler/interfaces";
    

    class VaktijaBA extends PrayerTimesHandler<VaktijaBALocations> {
        
        constructor() {
            super("/vaktijaba");
            
        }
    }
    const vaktijaba = new VaktijaBA();
    let options: any[] = [];
    let done: boolean= false;
    let selected: any= undefined;
    // let locations: Awaited<ReturnType<typeof vaktijaba.locations>> | undefined;
    
    onMount(async () => {
        let locations = await vaktijaba.locations() as VaktijaBALocations;
        for ( const [index, location] of locations.entries() ) {
            options.push({ value: index, name: location });
        }
        done = true;
    });


</script>


<Card>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vaktija BA</h5>
    {#if done}
        <Label>Select an city
            <Select class="mt-2" items={options} bind:value={selected} />
        </Label>
    {:else}
        <Spinner color="purple" />
    {/if}
</Card>