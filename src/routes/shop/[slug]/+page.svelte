<script lang="ts">
	import { Button, Badge } from 'flowbite-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let item = $derived(data.item);

	let selectedSize = $state('');
	let quantity = $state(1);

	$effect(() => {
		selectedSize = item.sizes?.[0] || '';
	});
</script>

<svelte:head>
	<title>{item.name} | Wazzu Racing Shop</title>
	<meta name="description" content={item.description} />
</svelte:head>

<div class="py-12">
	<!-- Breadcrumb Navigation -->
	<nav class="mb-8 text-sm">
		<ol class="flex items-center space-x-2 text-gray-600">
			<li><a href="/" class="hover:text-red-700">Home</a></li>
			<li>/</li>
			<li><a href="/shop" class="hover:text-red-700">Shop</a></li>
			<li>/</li>
			<li class="text-gray-900">{item.name}</li>
		</ol>
	</nav>

	<!-- Product Details Grid -->
	<div class="grid gap-12 lg:grid-cols-2">
		<!-- Product Image -->
		<div class="overflow-hidden rounded-lg bg-gray-100">
			<enhanced:img src={item.img} alt={item.name} class="h-auto w-full object-cover" />
		</div>

		<!-- Product Information -->
		<div class="flex flex-col">
			<!-- Product Name and Stock Status -->
			<div class="mb-4">
				<h1 class="mb-2 text-4xl font-bold text-gray-900">{item.name}</h1>
				{#if item.inStock}
					<Badge color="green" class="w-fit">In Stock</Badge>
				{:else}
					<Badge color="red" class="w-fit">Out of Stock</Badge>
				{/if}
			</div>

			<!-- Price -->
			<div class="mb-6">
				<span class="text-4xl font-bold text-red-700">${item.price.toFixed(2)}</span>
			</div>

			<!-- Short Description -->
			<p class="mb-6 text-lg text-gray-700">{item.description}</p>

			<!-- Detailed Description -->
			{#if item.details}
				<div class="mb-6">
					<h2 class="mb-2 text-xl font-semibold text-gray-900">Product Details</h2>
					<p class="text-gray-600">{item.details}</p>
				</div>
			{/if}

			<!-- Size Selection -->
			{#if item.sizes && item.sizes.length > 0}
				<div class="mb-6">
					<div class="mb-3 block text-sm font-semibold text-gray-900">Size</div>
					<div class="flex flex-wrap gap-3">
						{#each item.sizes as size (size)}
							<button
								type="button"
								onclick={() => (selectedSize = size)}
								class="rounded-md border-2 px-6 py-2 font-medium transition-all {selectedSize ===
								size
									? 'border-red-700 bg-red-700 text-white'
									: 'border-gray-300 bg-white text-gray-900 hover:border-red-700'}"
							>
								{size}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Quantity Selection -->
			<div class="mb-8">
				<label for="quantity" class="mb-3 block text-sm font-semibold text-gray-900">Quantity</label
				>
				<div class="flex items-center gap-3">
					<button
						type="button"
						onclick={() => quantity > 1 && quantity--}
						class="rounded-md border-2 border-gray-300 bg-white px-4 py-2 font-bold text-gray-900 transition-all hover:border-red-700 hover:text-red-700 disabled:opacity-50"
						disabled={quantity <= 1}
					>
						-
					</button>
					<input
						type="number"
						id="quantity"
						bind:value={quantity}
						min="1"
						max="99"
						class="w-20 rounded-md border-2 border-gray-300 px-4 py-2 text-center font-semibold"
					/>
					<button
						type="button"
						onclick={() => quantity < 99 && quantity++}
						class="rounded-md border-2 border-gray-300 bg-white px-4 py-2 font-bold text-gray-900 transition-all hover:border-red-700 hover:text-red-700 disabled:opacity-50"
						disabled={quantity >= 99}
					>
						+
					</button>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col gap-4 sm:flex-row">
				<Button
					color="red"
					size="xl"
					class="flex-1 bg-red-700 hover:bg-red-800"
					disabled={!item.inStock}
				>
					Add to Cart
				</Button>
				<Button href="/shop" color="alternative" size="xl" class="flex-1">Continue Shopping</Button>
			</div>

			<!-- Additional Info -->
			<div class="mt-8 rounded-lg bg-gray-50 p-6">
				<h3 class="mb-3 font-semibold text-gray-900">Need Help?</h3>
				<p class="mb-3 text-sm text-gray-600">
					Questions about sizing, bulk orders, or custom designs?
				</p>
				<a href="/contact" class="text-sm font-medium text-red-700 hover:underline">
					Contact Us →
				</a>
			</div>
		</div>
	</div>
</div>
