<script lang="ts">
    /**
     * This component is used to handle the  prayertime api form to fetch the data from the api
     * @param FormHandlerProps
     * @returns
    */

    import { Spinner, Button } from 'flowbite-svelte';
	import type { IFormHandlerProps } from '../interfaces';
    import { getNotificationsContext } from 'svelte-notifications';
    import { Motion } from 'svelte-motion';
    import AnimatePresence from 'svelte-motion/src/components/AnimatePresence/AnimatePresence.svelte';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
    const { addNotification } = getNotificationsContext();

    export let FormHandlerProps: IFormHandlerProps;
    let isLoading : boolean = false;
    
    const handleSubmit = async ( form: HTMLFormElement ) => {        
        // Change button to spinner
        isLoading = true;

        // Get form
        const data = new FormData(form);

        // Send Form
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
        });

        // Get result
        const result = deserialize(await response.text());

        if ( result.type === 'success' ) {
            await invalidateAll();
            // TODO add success notification
            addNotification( {
                text: 'Succesfully saved!',
                position: 'bottom-center',
                type: 'success',
                removeAfter: 4000,
            })
            
        }
        else if (result.type == "error" ){
            addNotification({
                text: result.error.message,
                position: 'bottom-center',
                type: 'error',
                removeAfter: 4000,
            })
        } 

        isLoading = false;
        
    };
</script>


{#if FormHandlerProps.fetchFinished && !FormHandlerProps.error}
    <Motion
        let:motion
        animate={{ originX: 0, originY: 0, scaleX: 1, scaleY: 1 }}
        initial={{ originX: 0, originY: 0, scaleX: 0, scaleY: 0 }}
        transition={{ duration: 0.3 }}
    >
        <form 
            method="POST"
            use:motion
            on:submit|preventDefault={ (event) =>  {
                const form = event.target;
                if ( form instanceof HTMLFormElement ) {
                    handleSubmit(form);
                }
            } } >
            <slot />
            <div class="mt-5">
                {#if isLoading}
                    <Motion let:motion={save} animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }} >
                        <div use:save>
                        <Spinner color="blue" />
                        </div>
                    </Motion>
                {:else}
                    <Motion let:motion={save} animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                        <div use:save>
                            <Button type="submit">Save</Button>
                        </div>
                    </Motion>
                {/if}
            </div>
        </form>
    </Motion>
{:else if FormHandlerProps.error}
    <p class="text-red-500">{FormHandlerProps.error}</p>
{:else}
    <Spinner color="blue" />
{/if}


