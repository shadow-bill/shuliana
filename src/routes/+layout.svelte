<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import '../lib/i18n.js';
	import { isLoading } from 'svelte-i18n';

	let { children } = $props();
</script>

<div class="app">
	{#if $isLoading}
		<p>Loading...</p>
	{:else}
		<Header />

		<main>
			{@render children()}
		</main>
	{/if}
</div>

<style>
	.app {
		overflow: hidden;
	}
</style>
