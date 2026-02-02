<script lang="ts">
	import CartButton from '$lib/components/CartButton.svelte';

	let { children } = $props();
</script>

<!-- Floating Cart Button - Fixed position on the right side, below navbar -->
<div class="fixed right-8 top-24 z-40">
	<CartButton />
</div>

<!-- Shop content -->
{@render children?.()}
