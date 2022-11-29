<script lang="ts">

	import '../app.postcss';
	import { Navbar, NavBrand } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import logo from '$lib/assets/imgs/nextsalah.svg';
	import { page } from '$app/stores';
	import Notifications from 'svelte-notifications';
	
	// Change the page title when the page changes
	let page_title: string = 'NextSalah';
	page.subscribe((value) => {
		page_title = value.data.title != undefined ? `NextSalah - ${value.data.title}` : "NextSalah"
	})

</script>

<!-- Head tag -->
<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<!-- Navbar -->
<Navbar color="dark" class="border-b">
	<NavBrand href="/">
	  <img src={logo} class="mr-3 w-12 sm:w-16 " alt="NextSalah Logo"/>
	  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{page_title}</span>
	</NavBrand>
	<div class="flex items-center md:order-2">
		<DarkMode />
	</div>
</Navbar>

<!-- Main Content -->
<main class="container md:mx-auto mt-10">
	<Notifications>
		<slot />
	</Notifications>
</main>

<!-- Footer -->





