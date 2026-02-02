<script lang="ts">
	import { Button, Badge, Breadcrumb, BreadcrumbItem, Toast } from 'flowbite-svelte';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
	import type { PageData } from './$types';
	import { cart } from '$lib/stores/cart';

	let { data }: { data: PageData } = $props();
	let item = $derived(data.item);

	let selectedSize = $state('');
	let quantity = $state(1);
	let selectedImageIndex = $state(0);
	let showAddedToast = $state(false);

	$effect(() => {
		selectedSize = item.sizes?.[0] || '';
		selectedImageIndex = 0; // Reset to first image when item changes
	});

	function addToCart() {
		cart.addItem({
			id: item.id,
			name: item.name,
			slug: item.slug,
			price: item.price,
			size: selectedSize,
			image: item.images[0],
			quantity: quantity
		});

		// Show success toast
		showAddedToast = true;
		setTimeout(() => {
			showAddedToast = false;
		}, 3000);
	}
</script>

<svelte:head>
	<title>{item.name} | Wazzu Racing Shop</title>
	<meta name="description" content={item.description} />
</svelte:head>

<div class="py-12">
	<Breadcrumb>
		<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
		<BreadcrumbItem href="/shop">Shop</BreadcrumbItem>
		<BreadcrumbItem>{item.name}</BreadcrumbItem>
	</Breadcrumb>

	<!-- Product Details Grid -->
	<div class="grid gap-12 lg:grid-cols-2">
		<!-- Product Image Gallery -->
		<div class="flex flex-col gap-4">
			<!-- Main Image Display -->
			<div class="overflow-hidden rounded-lg bg-gray-100">
				<enhanced:img
					src={item.images[selectedImageIndex]}
					alt="{item.name} - Image {selectedImageIndex + 1}"
					class="h-auto w-full object-cover"
				/>
			</div>

			<!-- Thumbnail Navigation -->
			{#if item.images.length > 1}
				<div class="flex gap-3">
					{#each item.images as image, index (index)}
						<button
							type="button"
							onclick={() => (selectedImageIndex = index)}
							aria-label="View image {index + 1} of {item.images.length}"
							class="overflow-hidden rounded-md border-2 transition-all {selectedImageIndex ===
							index
								? 'border-red-700 ring-2 ring-red-700 ring-offset-2'
								: 'border-gray-300 hover:border-red-700'}"
						>
							<enhanced:img
								src={image}
								alt="{item.name} - Thumbnail {index + 1}"
								class="h-20 w-20 object-cover"
							/>
						</button>
					{/each}
				</div>
			{/if}
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
					onclick={addToCart}
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

	<!-- Success Toast -->
	{#if showAddedToast}
		<div class="fixed right-4 bottom-4 z-50">
			<Toast color="green" class="shadow-lg">
				<svelte:fragment slot="icon">
					<FontAwesomeIcon icon={faCheckCircle} class="h-5 w-5" />
				</svelte:fragment>
				<span class="font-semibold">Added to cart!</span>
				<span class="text-sm">
					{quantity}
					{quantity === 1 ? 'item' : 'items'} added
				</span>
			</Toast>
		</div>
	{/if}
</div>
