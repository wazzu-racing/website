<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import { Button, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';

	let cartItems = $derived($cart.items);
	let itemCount = $derived(cart.getItemCount($cart));
	let total = $derived(cart.getTotal($cart));

	function updateQuantity(id: number, newQuantity: number, size?: string) {
		cart.updateQuantity(id, newQuantity, size);
	}

	function removeItem(id: number, size?: string) {
		cart.removeItem(id, size);
	}

	function clearAllItems() {
		if (confirm('Are you sure you want to clear your entire cart?')) {
			cart.clearCart();
		}
	}
</script>

<svelte:head>
	<title>Shopping Cart | Wazzu Racing</title>
	<meta name="description" content="Review your Wazzu Racing merchandise cart" />
</svelte:head>

<div class="py-12">
	<Breadcrumb>
		<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
		<BreadcrumbItem href="/shop">Shop</BreadcrumbItem>
		<BreadcrumbItem>Cart</BreadcrumbItem>
	</Breadcrumb>

	<!-- Page Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-4xl font-bold text-gray-900">Shopping Cart</h1>
		<p class="text-gray-600">
			{itemCount}
			{itemCount === 1 ? 'item' : 'items'} in your cart
		</p>
	</div>

	{#if cartItems.length === 0}
		<!-- Empty Cart State -->
		<div class="rounded-lg bg-gray-50 p-12 text-center">
			<div class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
				<svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
			</div>
			<h2 class="mb-2 text-2xl font-semibold text-gray-900">Your cart is empty</h2>
			<p class="mb-6 text-gray-600">Start shopping to add items to your cart!</p>
			<Button href="/shop" color="red" class="bg-red-700 hover:bg-red-800">Continue Shopping</Button
			>
		</div>
	{:else}
		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Cart Items -->
			<div class="lg:col-span-2">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-xl font-semibold text-gray-900">Cart Items</h2>
					<Button
						color="alternative"
						size="xs"
						onclick={clearAllItems}
						class="text-red-600 hover:text-red-700"
					>
						<FontAwesomeIcon icon={faTrash} class="me-2 h-4 w-4" />
						Clear Cart
					</Button>
				</div>

				<div class="space-y-4">
					{#each cartItems as item (item.id + (item.size || ''))}
						<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
							<div class="flex gap-4">
								<!-- Product Image -->
								<a href="/shop/{item.slug}" class="shrink-0">
									<enhanced:img
										src={item.image}
										alt={item.name}
										class="h-24 w-24 rounded-md object-cover"
									/>
								</a>

								<!-- Product Info -->
								<div class="flex flex-1 flex-col justify-between">
									<div>
										<a href="/shop/{item.slug}" class="hover:text-red-700">
											<h3 class="text-lg font-semibold text-gray-900">{item.name}</h3>
										</a>
										{#if item.size}
											<p class="text-sm text-gray-600">Size: {item.size}</p>
										{/if}
										<p class="mt-1 text-lg font-bold text-red-700">
											${item.price.toFixed(2)}
										</p>
									</div>

									<!-- Quantity and Remove Controls -->
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-2">
											<button
												type="button"
												onclick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
												class="rounded-md border border-gray-300 bg-white px-3 py-1 font-bold text-gray-900 transition-all hover:border-red-700 hover:text-red-700"
												disabled={item.quantity <= 1}
											>
												-
											</button>
											<input
												type="number"
												value={item.quantity}
												onchange={(e) =>
													updateQuantity(item.id, parseInt(e.currentTarget.value) || 1, item.size)}
												min="1"
												max="99"
												class="w-16 rounded-md border border-gray-300 px-2 py-1 text-center font-semibold"
											/>
											<button
												type="button"
												onclick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
												class="rounded-md border border-gray-300 bg-white px-3 py-1 font-bold text-gray-900 transition-all hover:border-red-700 hover:text-red-700"
												disabled={item.quantity >= 99}
											>
												+
											</button>
										</div>

										<button
											type="button"
											onclick={() => removeItem(item.id, item.size)}
											class="text-red-600 transition-colors hover:text-red-700"
											aria-label="Remove {item.name} from cart"
										>
											<FontAwesomeIcon icon={faTrash} class="h-5 w-5" />
										</button>
									</div>
								</div>

								<!-- Item Subtotal (hidden on mobile) -->
								<div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end sm:justify-between">
									<p class="text-sm font-medium text-gray-600">Subtotal</p>
									<p class="text-xl font-bold text-gray-900">
										${(item.price * item.quantity).toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-6">
					<Button href="/shop" color="alternative" class="w-full sm:w-auto">
						Continue Shopping
					</Button>
				</div>
			</div>

			<!-- Order Summary -->
			<div class="lg:col-span-1">
				<div class="sticky top-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h2 class="mb-4 text-xl font-semibold text-gray-900">Order Summary</h2>

					<div class="space-y-3 border-b border-gray-200 pb-4">
						<div class="flex justify-between text-gray-600">
							<span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
							<span class="font-semibold">${total.toFixed(2)}</span>
						</div>
						<div class="flex justify-between text-gray-600">
							<span>Shipping</span>
							<span class="font-semibold">Calculated at checkout</span>
						</div>
					</div>

					<div class="mt-4 flex justify-between border-b border-gray-200 pb-4">
						<span class="text-lg font-semibold text-gray-900">Total</span>
						<span class="text-2xl font-bold text-red-700">${total.toFixed(2)}</span>
					</div>

					<div class="mt-6 space-y-3">
						<Button color="red" class="w-full bg-red-700 hover:bg-red-800" size="lg">
							Proceed to Checkout
						</Button>
						<p class="text-center text-xs text-gray-500">Tax and shipping calculated at checkout</p>
					</div>

					<!-- Additional Info -->
					<div class="mt-6 rounded-lg bg-gray-50 p-4">
						<h3 class="mb-2 text-sm font-semibold text-gray-900">Need Help?</h3>
						<p class="mb-2 text-xs text-gray-600">Questions about your order or our products?</p>
						<a href="/contact" class="text-xs font-medium text-red-700 hover:underline">
							Contact Us →
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
