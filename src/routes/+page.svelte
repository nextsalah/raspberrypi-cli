<script lang="ts">
  	import { Card } from "flowbite-svelte";
	import type { PageData } from './$types';
	export let data: PageData;
</script>



<div class="flex flex-col gap-4 sm:flex-row ">
	{#each data.navigation.items as nav_item}
		<Card href="/{nav_item.slug}" class="flex items-center w-full mx-auto py-8"  >
				<img alt="{nav_item.title}" src={nav_item.icon}  class="w-20 sm:w-16  "/>
				<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{nav_item.title}</h5>
				<p class="mb-3 font-normal text-gray-500 text-center dark:text-gray-400">{nav_item.descrtiption}</p>
		</Card>
	{/each}
</div>