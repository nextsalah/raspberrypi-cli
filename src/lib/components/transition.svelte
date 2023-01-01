<script lang="ts">
    export let url: URL;
    import { Motion } from 'svelte-motion';
</script>

{#key url}
    <Motion
        animate={{ opacity: [0,1] }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1}}
        exit={{ opacity: 0 }}
        let:motion
        >
        <div use:motion>
            <slot />
        </div>
    </Motion>
{/key}