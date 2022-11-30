<script lang="ts">

    import SingleOptionForm from "../bundle/singleOptionForm.svelte";
    import type { ISingleOptionProps} from "$lib/nextsalah_api/interfaces";

    const data: ISingleOptionProps = {
        source_name: "Vaktija.ba",
        source_logo_src: "https://play-lh.googleusercontent.com/0aH4KF0JYg_h7WX370EN-RrE2elixm2k3-sjx2Fbz7m-INvmXkbEkhUf4Hd0EIFnNw",
        source_link: "https://vaktija.ba/",
        end_point: "/vaktijaba",
        select_label: "Choose a city",
        selected_key: "location_id",
        option_by_index: true
    }

    
</script>

<SingleOptionForm  singleOptionProps={data} />