<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import { Badge } from 'flowbite-svelte';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

	let itemCount = $derived(cart.getItemCount($cart));
</script>

<a
	href="/cart"
	class="relative inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all hover:border-red-700 hover:bg-gray-50"
	aria-label="Shopping cart with {itemCount} items"
>
	<FontAwesomeIcon icon={faShoppingCart} class="h-5 w-5" />
	<span class="hidden sm:inline">Cart</span>
	{#if itemCount > 0}
		<Badge color="red" rounded class="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold">
			{itemCount}
		</Badge>
	{/if}
</a>
