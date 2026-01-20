<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		goto('/members/current', { replaceState: true });
	});
</script>

<main class="members-page">
	<header class="page-header">
		<h1>Team Members</h1>
		<p class="lede">Redirecting to current members...</p>
	</header>
</main>

<style>
	.members-page {
		max-width: 1100px;
		margin: 2.5rem auto;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	.page-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	h1 {
		margin: 0;
		color: #0f172a;
	}

	.lede {
		margin-top: 0.4rem;
		color: #6b7280;
		font-size: 0.98rem;
	}
</style>
