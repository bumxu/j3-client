<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>lapse</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<header>
		aqui ocurre la magia
	</header>

	<Counter />
</section>

<style>

</style>
