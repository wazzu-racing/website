<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import { shopItems } from '$lib/data/shop-items';
</script>

<svelte:head>
	<title>Shop | Wazzu Racing</title>
	<meta name="description" content="Shop Wazzu Racing merchandise and apparel" />
</svelte:head>

<div class="py-12">
	<!-- Page Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-5xl font-bold text-gray-900">Shop</h1>
		<p class="text-xl text-gray-600">
			Support Wazzu Racing by purchasing our exclusive merchandise
		</p>
	</div>

	<!-- Product Grid -->
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each shopItems as item (item.id)}
			<Card class="group transition-all duration-300 hover:shadow-2xl">
				<a href="/shop/{item.slug}" class="block">
					<!-- Image Container -->
					<div class="overflow-hidden bg-gray-100">
						<enhanced:img
							src={item.img}
							alt={item.name}
							class="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</div>

					<!-- Content Container -->
					<div class="p-6">
						<!-- Product Name -->
						<h3 class="mb-3 text-2xl font-bold text-gray-900">
							{item.name}
						</h3>

						<!-- Product Description -->
						<p class="mb-4 text-gray-600">
							{item.description}
						</p>

						<!-- Price and Button Container -->
						<div class="flex items-center justify-between">
							<span class="text-3xl font-bold text-red-700">
								${item.price.toFixed(2)}
							</span>

							<Button color="red" class="bg-red-700 hover:bg-red-800">View Details</Button>
						</div>
					</div>
				</a>
			</Card>
		{/each}
	</div>

	<!-- Info Section -->
	<div class="mt-16 rounded-lg bg-gray-50 p-8 text-center">
		<h2 class="mb-4 text-2xl font-semibold text-gray-900">Questions about our merchandise?</h2>
		<p class="mb-6 text-gray-600">
			Contact us for bulk orders, sizing information, or custom designs.
		</p>
		<Button href="/contact" color="red" class="bg-red-700 hover:bg-red-800">Contact Us</Button>
	</div>
</div>
