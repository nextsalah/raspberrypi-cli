<script lang="ts">
    import { Spinner, Button } from 'flowbite-svelte';
	import type { IFormHandlerProps } from '../interfaces';
    export let FormHandlerProps: IFormHandlerProps;
    let button_disable: boolean = false;

    const sendData = async (): Promise<void> => {
        button_disable = true;
        const result = await FormHandlerProps.handleData() as Awaited<ReturnType<typeof FormHandlerProps.handleData>>;
        button_disable = false;
        if ( result){
            console.log("Success");
        }
        else{
            console.log("Error");
        }
    }
</script>


{#if FormHandlerProps.fetchFinished && !FormHandlerProps.error}
    <slot />
    <Button class="mt-5" disabled={button_disable} on:click={sendData}>Save Prayer Times</Button>
{:else if FormHandlerProps.error}
    <p class="text-red-500">{FormHandlerProps.error}</p>
{:else}
    <Spinner color="purple" />
{/if}
