<script>
	import { Heading, P, Button, List, Li, Card } from 'flowbite-svelte';

	const contactEmail = 'wazzu.racing@wsu.edu';

	const foundationDonateUrl =
		'https://foundation.wsu.edu/give/?fund=99981d7c-3c77-4fed-a76b-1267a2069cae&utm_source=sae-formula&utm_medium=wsu-link&utm_campaign=voiland-college-of-engineering-and-architecture';
	const touchnetUrl =
		'https://secure.touchnet.net/C20607_ustores/web/store_cat.jsp?STOREID=105&CATID=195';
	const cougstarterUrl = 'https://cougstarter.wsu.edu/project/49106';

	import shirtFront from '$lib/assets/shirt-front.png';
	import shirtBack from '$lib/assets/shirt-back.png';
	import sweatshirt from '$lib/assets/sweatshirt.jpg';
	import hat from '$lib/assets/hat.png';

	import sponsorPacket from '$lib/assets/Wazzu_Racing_Sponsorship_Packet.pdf';
</script>

<svelte:head>
	<title>Donate — Wazzu Racing</title>
	<meta
		name="description"
		content="Support Wazzu Racing — Washington State University's Formula SAE team. Learn how to donate, sponsor, or give in-kind to support student engineers."
	/>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero Section -->
	<div class="mb-12">
		<Heading tag="h1" class="mb-4 text-4xl font-bold text-gray-900">Support Wazzu Racing</Heading>
		<P class="text-lg text-gray-700">
			Our student-led Formula SAE program depends on donations from alumni, industry partners, and
			friends to design, build, and compete each season. Your support funds parts, materials,
			travel, and hands-on learning opportunities for future engineers.
		</P>
	</div>

	<section class="mb-12">
		<div class="rounded-lg p-6">
			<Heading tag="h2" class="mb-4 text-2xl font-bold text-gray-900">Buy our Merch</Heading>
			<P class="mb-6 text-gray-700">Help support us by buying our merch!</P>
			<div class="flex flex-col gap-3 sm:flex-row">
				<a href={touchnetUrl} target="_blank" rel="noopener noreferrer">
					<Button size="lg" color="red" class="w-full sm:w-auto">Buy our Merch</Button>
				</a>
			</div>
			<!-- IMAGES HERE -->
			<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<div class="overflow-hidden rounded-lg bg-white shadow-md">
					<a
						href="https://secure.touchnet.net/C20607_ustores/web/product_detail.jsp?PRODUCTID=3758"
					>
						<img
							src={shirtFront}
							alt="Wazzu Racing T-shirt Front"
							class="h-64 w-full object-contain p-4"
						/>
					</a>
				</div>
				<div class="overflow-hidden rounded-lg bg-white shadow-md">
					<a
						href="https://secure.touchnet.net/C20607_ustores/web/product_detail.jsp?PRODUCTID=3780"
					>
						<img
							src={sweatshirt}
							alt="Wazzu Racing T-shirt Back"
							class="h-64 w-full object-contain p-4"
						/>
					</a>
				</div>
				<div class="overflow-hidden rounded-lg bg-white shadow-md">
					<a
						href="https://secure.touchnet.net/C20607_ustores/web/product_detail.jsp?PRODUCTID=3781"
					>
						<img src={hat} alt="Wazzu Racing Hat" class="h-64 w-full object-contain p-4" />
					</a>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<div class="rounded-lg p-6">
			<Heading tag="h2" class="mb-4 text-2xl font-bold text-gray-900"
				>Check out our Cougstarter</Heading
			>
			<P class="mb-6 text-gray-700">Help support us by donating on our Cougstarter page.</P>
			<div class="flex flex-col gap-3 sm:flex-row">
				<a href={cougstarterUrl} target="_blank" rel="noopener noreferrer">
					<Button size="lg" color="red" class="w-full sm:w-auto">Donate on Cougstarter</Button>
				</a>
			</div>
		</div>
	</section>

	<!-- Direct Donation Section -->
	<section class="mb-12">
		<div class="rounded-lg p-6">
			<Heading tag="h2" class="mb-4 text-2xl font-bold text-gray-900">Give Directly</Heading>
			<P class="mb-6 text-gray-700">
				You can make a secure online gift through the Washington State University Foundation. Select
				"Other" and note "Wazzu Racing" in the designation, or contact us for a direct link.
			</P>
			<div class="flex flex-col gap-3 sm:flex-row">
				<a href={foundationDonateUrl} target="_blank" rel="noopener noreferrer">
					<Button size="lg" color="red" class="w-full sm:w-auto">Donate via WSU Foundation</Button>
				</a>
				<a href={'mailto:' + contactEmail}>
					<Button size="lg" color="alternative" class="w-full sm:w-auto">
						Email: {contactEmail}
					</Button>
				</a>
			</div>
		</div>
	</section>

	<!-- Corporate Sponsorship Section -->
	<section class="mb-12">
		<div class="rounded-lg p-6">
			<Heading tag="h2" class="mb-4 text-2xl font-bold text-gray-900">
				Corporate Sponsorship & Partnerships
			</Heading>
			<P class="mb-8 text-gray-700">
				Industry partners provide critical funding, mentorship, and in-kind support. Sponsorships
				help cover manufacturing, testing, and travel costs while creating recruiting pipelines for
				students.
			</P>

			<!-- Sponsor Packages Grid -->
			<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				<!-- Crimson Package -->
				<Card class="border-2 border-red-700 bg-red-50">
					<Heading tag="h3" class="mb-2 text-xl font-bold text-red-700">Crimson Package</Heading>
					<P class="mb-4 text-sm font-semibold text-gray-800">
						($4000+ or equivalent in products or services)
					</P>
					<List tag="ul" class="space-y-1 text-sm text-gray-700">
						<Li>Logos of your choice on this year's car and/or apparel</Li>
						<Li>Personal shop tour</Li>
						<Li>Product display at competition with banner</Li>
						<Li>Other benefits upon request</Li>
						<Li>All items from lower tiers</Li>
					</List>
				</Card>

				<!-- Gold Package -->
				<Card class="border-2 border-yellow-500 bg-yellow-50">
					<Heading tag="h3" class="mb-2 text-xl font-bold text-yellow-700">Gold Package</Heading>
					<P class="mb-4 text-sm font-semibold text-gray-800">
						($2500 or equivalent in products or services)
					</P>
					<List tag="ul" class="space-y-1 text-sm text-gray-700">
						<Li>Featured on team media with special recognition</Li>
						<Li>Large logo on this year's car</Li>
						<Li>Wazzu Racing banner</Li>
						<Li>All items from lower tiers</Li>
					</List>
				</Card>

				<!-- Silver Package -->
				<Card class="border-2 border-gray-400 bg-gray-50">
					<Heading tag="h3" class="mb-2 text-xl font-bold text-gray-600">Silver Package</Heading>
					<P class="mb-4 text-sm font-semibold text-gray-800">
						($1500 or equivalent in products or services)
					</P>
					<List tag="ul" class="space-y-1 text-sm text-gray-700">
						<Li>Specific social media post about your company</Li>
						<Li>Medium logo on this year's car</Li>
						<Li>3D-printed model of this year's car</Li>
						<Li>All items from lower tiers</Li>
					</List>
				</Card>

				<!-- Bronze Package -->
				<Card class="border-2 border-orange-700 bg-orange-50">
					<Heading tag="h3" class="mb-2 text-xl font-bold text-orange-700">Bronze Package</Heading>
					<P class="mb-4 text-sm font-semibold text-gray-800">
						($1000 or equivalent in products or services)
					</P>
					<List tag="ul" class="space-y-1 text-sm text-gray-700">
						<Li>Small logo or name on this year's car</Li>
						<Li>Wazzu Racing hat and T-shirt</Li>
						<Li>All items from personal donation tier</Li>
					</List>
				</Card>
			</div>

			<!-- Sponsorship Packet Download -->
			<div class="rounded-lg bg-gray-50 p-6">
				<P class="mb-4 text-gray-700">
					Want to see sponsorship options and benefits in detail? Download our sponsorship packet
					(PDF) for the 2025–2026 season.
				</P>
				<a href={sponsorPacket} target="_blank" rel="noopener noreferrer" download>
					<Button size="lg" color="red">Download Sponsorship Packet (PDF)</Button>
				</a>
			</div>
		</div>
	</section>
</main>
