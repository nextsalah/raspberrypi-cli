<script lang="ts">

    import SingleOption from "../template/default.svelte";
    import type { ISingleOptionProps} from "$lib/nextsalah_api/interfaces";

    const data: ISingleOptionProps = {
        source_name: "Islamiska Förbundet",
        source_logo_src: "https://www.islamiskaforbundet.se/wp-content/uploads/2015/07/IF_Fyrkantig-e1488561982527.jpg",
        source_link: "https://www.islamiskaforbundet.se/",
        end_point: "/islamiska-forbundet",
        select_label: "Choose a city",
        selected_key: "city",
        option_by_index: false
    }

</script>

<SingleOption  singleOptionProps={data} />