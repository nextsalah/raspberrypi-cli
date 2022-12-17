<script lang="ts">
    import { onMount } from "svelte";
    
    import NextSalahAPI from "../handler";
    import FormCard from "../components/formCard.svelte";
    import FormHandler from "../components/formHandler.svelte";
    import type { IFormHandlerProps, ISourceData, VaktijaEULocations } from "../interfaces";
	import { A, Label, Select, } from "flowbite-svelte";
    import { Country } from "../country_list";
	import type { SelectOptionType } from "flowbite-svelte/types";
    const VaktijaEU = new NextSalahAPI<VaktijaEULocations>("/vaktijaeu");

    let country_selected: string | undefined;
    let city_selected: string | undefined;

    let all_cities: {[key: string]: SelectOptionType[]} = {};
    let all_countries: SelectOptionType[] = [];

    const handleSendData = async (): Promise<boolean> => {
        if ( !country_selected ){
            FormHandlerProps.alert_message = "Please select a country";
            return false;
        }
        else if ( !city_selected ){
            FormHandlerProps.alert_message = "Please select a city";
            return false;
        }
        const response = await VaktijaEU.save_location( { location_slug : city_selected }) as Awaited<ReturnType<typeof VaktijaEU.save_location>>;
        if (response instanceof Error) {
            return false;
        } 
        return true;
    }
    const SourceData: ISourceData = {
        source_name: "Vaktija.eu",
        source_logo_src: "data:image/jpeg;base64,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",
        source_link: "https://vaktija.eu/",
        end_point: "/vaktijaeu"
    } 
    
    let FormHandlerProps: IFormHandlerProps= {
        fetchFinished: false,
        error: "",
        alert_message: "",
        handleData: () => handleSendData()
    }

    onMount(async () => {
        // Get all locations
        let locations = await VaktijaEU.get_all_locations() as Awaited<ReturnType<typeof VaktijaEU.get_all_locations> | Error>;
            // If there is an error, set the error message and return
            if ( locations instanceof Error ) {
            FormHandlerProps.error = locations.message;
            FormHandlerProps.fetchFinished = true;
            return;
        }
        
        // Get all countries
        for (let location of locations.data) {
            all_cities[location.country.short_code] = all_cities[location.country.short_code] || [];
            all_cities[location.country.short_code].push({
                name: location.name,
                value: location.slug
            });
            
            // Get the country name from the country list
            let country_name =   Object.keys(Country)[(Object.values(Country) as string[]).indexOf(location.country.short_code)];

            // Dont push if the country is already in the array
            if ( all_countries.find(country => country.value === location.country.short_code) ) continue;
            
            // Sort the countries by name
            all_countries.sort((a, b) => a.name.localeCompare(b.name));

            all_countries.push({
                name: country_name,
                value: location.country.short_code
            });
        }


        FormHandlerProps.fetchFinished = true;
    });


</script>


<FormCard SourceData={SourceData}>
    <FormHandler FormHandlerProps={FormHandlerProps}>
        <Label>
            Choose a country
            <Select class="mt-2" bind:value={country_selected} items={all_countries} itemValue="short_code" itemText="name" />
        </Label>
        {#if country_selected}
            <Label class="mt-2">
                Choose a city
                <Select bind:value={city_selected} items={all_cities[country_selected]} itemValue="short_code" itemText="name" />
            </Label>
        {/if}
    </FormHandler>
</FormCard>
