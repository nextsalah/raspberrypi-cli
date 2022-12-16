<script lang="ts">
    /**
     * This component is used to handle the  prayertime api form to fetch the data from the api
     * @param FormHandlerProps
     * @returns
    */

    import { Spinner, Button } from 'flowbite-svelte';
	import type { IFormHandlerProps } from '../interfaces';
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
    
    export let FormHandlerProps: IFormHandlerProps;
    
    let button_disable: boolean = false;
    
    const sendData = async (): Promise<void> => {
        button_disable = true;
        const result = await FormHandlerProps.handleData() as Awaited<ReturnType<typeof FormHandlerProps.handleData>>;
        button_disable = false;
        if ( result){
            addNotification({
                text: "Successfully saved!",
                type: "success",
                position: 'bottom-center',
                removeAfter: 5000
            });
            return;
        }
        if ( FormHandlerProps.alert_message ){
            addNotification({
                text: FormHandlerProps.alert_message,
                type: "error",
                position: 'bottom-center',
                removeAfter: 5000
            });
            FormHandlerProps.alert_message = "";
            return;
        }
        
        addNotification({
            text: "An error occured while saving prayer times",
            type: "error",
            position: 'bottom-center',
            removeAfter: 5000
        });
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
