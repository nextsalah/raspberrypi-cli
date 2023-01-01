<script lang="ts">
    /*
    * This component is used for all the single option forms.
    * It is used to get the options from the api and display them in a select.
    * @param singleOptionProps
    */
	import Form from "../components/Form.svelte";
    import type { SingleOptionLocation, ISingleOptionProps, IFormData } from "../interfaces";
    import type {  SelectOptionType } from "flowbite-svelte/types";
    import {  Select, Label  } from 'flowbite-svelte';
        
    
    export let SingleFormData: ISingleOptionProps;
    const FormData = {
        ...SingleFormData,
        handleData: ( locations ) => handleFetchData(locations as SingleOptionLocation),
    } as IFormData & ISingleOptionProps;

    let options: SelectOptionType[] = [];
    let selected: string;
    
    const handleFetchData = (locations : SingleOptionLocation) => {
        for ( const [index, location] of locations.entries() ) {
            if ( FormData.option_by_index ) {
                options.push({ value: index.toString(10), name: location });
            } else {
                options.push({ value: location, name: location });
            }
        }
    }

</script>


<Form {FormData}>
    <Label>
        {FormData.select_label}
        <Select 
            class="mt-2" 
            items={options} 
            bind:value={selected} 
            name={FormData.selected_key}
            required={true}
        />
    </Label>
</Form>
