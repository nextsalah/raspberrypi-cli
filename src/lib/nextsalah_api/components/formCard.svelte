<script lang="ts">
    /*
    * This component is used to display the source information.
    * @param OptionProps
    */
    import type {  ISourceData } from "$lib/nextsalah_api/interfaces";
    import { Card, Avatar} from 'flowbite-svelte';
    export let SourceData : ISourceData;
</script>


<Card class="min-w-[25rem] max-w-[30rem] ">
    <div class="mb-5 flex items-center space-x-4">
        <Avatar src={SourceData.source_logo_src} alt="{SourceData.source_name} logo" class="flex-shrink-0"/>
            <div class="flex-1 min-w-0">
            <p class="text-xl font-normal text-gray-900 truncate dark:text-white">
                {SourceData.source_name}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                <a href={SourceData.source_link} target="_blank" rel="noreferrer" class="inline-flex items-center text-blue-400 hover:underline">
                    Link to source
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-1"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>           
            </p>
        </div>
    </div>
    <slot />
</Card>