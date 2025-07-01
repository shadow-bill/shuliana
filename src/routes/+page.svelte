<script lang="ts">
	import GameContainer from '$lib/components/GameContainer.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import Instructions from '$lib/components/Instructions.svelte';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('head.title')}</title>
	<meta name="description" content="{$_('head.title')}" />
</svelte:head>

<section>
	<Welcome />
	<Instructions />
	<GameContainer />
</section>