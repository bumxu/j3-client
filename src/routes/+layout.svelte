<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<style global lang="scss">
	@import '$scss/main';
</style>

<div class="app">
	<!--Header /-->

	<main>
		<slot />
	</main>
</div>

<!--style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 16px;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}
</style-->
