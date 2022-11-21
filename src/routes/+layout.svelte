<script lang="ts">
	import '../app.postcss';
	import { Navbar, NavBrand } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import logo from '$lib/assets/imgs/nextsalah.svg';
	
</script>


<Navbar color="form">
	<NavBrand href="/">
	  <img src={logo} class="mr-3 w-12 sm:w-16 " alt="NextSalah Logo"/>
	  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NextSalah</span>
	</NavBrand>
	<div class="flex items-center md:order-2">
		<DarkMode />
	</div>
</Navbar>
<div class="container md:mx-auto mt-10">
	<slot />
</div>




