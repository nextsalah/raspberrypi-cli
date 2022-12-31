<script lang="ts">
    import type {  IFormData, IFormHandlerProps } from "$lib/nextsalah_api/interfaces";
    import FormHandler from "./FormHandler.svelte";
    import { Card, Avatar} from 'flowbite-svelte';
	import { onMount } from "svelte";
	import NextSalahAPI from "../handler";

    export let FormData : IFormData;
    let FormHandlerProps = FormData as IFormHandlerProps;

    const prayertimes = new NextSalahAPI(FormData.end_point);

    onMount(async () => {

        // Get all locations
        let locations = await prayertimes.getAllLocations() as Awaited<ReturnType<typeof prayertimes.getAllLocations> | Error>;

        // If there is an error, set the error message and return
        if ( locations instanceof Error ) {
            FormHandlerProps.error = locations.message;
            FormHandlerProps.fetchFinished = true;
            return;
        }

        // If there is no error, handle the data
        FormData.handleData(locations);

        // Set fetchFinished to true
        FormHandlerProps.fetchFinished = true;
    });


</script>


<Card class="min-w-[25rem] max-w-[30rem] ">
    <div class="mb-5 flex items-center space-x-4">
        <Avatar src={FormData.source_logo_src} alt="{FormData.source_name} logo" class="flex-shrink-0"/>
            <div class="flex-1 min-w-0">
            <p class="text-xl font-normal text-gray-900 truncate dark:text-white">
                {FormData.source_name}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                <a href={FormData.source_link} target="_blank" rel="noreferrer" class="inline-flex items-center text-blue-400 hover:underline">
                    Link to source
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-1"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>           
            </p>
        </div>
    </div>
    <!-- Extract IFormHandlerProps from FormData -->
    <FormHandler {FormHandlerProps}>
        <input type="hidden" name="source" value={FormData.end_point} />
        <slot />
    </FormHandler>
</Card>